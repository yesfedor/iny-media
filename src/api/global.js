import axios from 'axios'
import API_PATH_METHOD from './config'

const iconDeviceObject = {
  Android: 'fab fa-android',
  iPhone: 'fab fa-apple',
  iPad: 'fab fa-apple',
  Symbian: 'fas fa-mobile',
  'Windows Phone': 'fas fa-mobile',
  'Tablet OS': 'fas fa-mobile',
  Linux: 'fab fa-linux',
  Windows: 'fab fa-microsoft',
  Macintosh: 'fab fa-apple',
  Undefined: 'fas fa-globe'
}

const userDeviceArray = [
  { device: 'Android', platform: /Android/ },
  { device: 'iPhone', platform: /iPhone/ },
  { device: 'iPad', platform: /iPad/ },
  { device: 'Symbian', platform: /Symbian/ },
  { device: 'Windows Phone', platform: /Windows Phone/ },
  { device: 'Tablet OS', platform: /Tablet OS/ },
  { device: 'Linux', platform: /Linux/ },
  { device: 'Windows', platform: /Windows NT/ },
  { device: 'Macintosh', platform: /Macintosh/ }
]

const platform = navigator.userAgent

function getPlatform () {
  for (var i in userDeviceArray) {
    if (userDeviceArray[i].platform.test(platform)) {
      return userDeviceArray[i].device
    }
  }
  return 'Неизвестная платформа!' + platform
}

function ApiMiddleware (res) {
  if (res.data.status === 419) {
    // eslint-disable-next-line
    toastr.error('Fatal Error #1')
    Api.setClientId(() => {
      setTimeout(() => {
        // eslint-disable-next-line
        toastr.error('await..')
      }, 500)
    }, () => {
      setTimeout(() => {
        // eslint-disable-next-line
        document.location.reload()
      }, 500)
    })
  } else {
    return res.data
  }
}

function UserAuthRedirectMiddleware (vm, res) {
  if (res?.jwt) {
    if (vm.$route.query?.app_redirect) {
      switch (vm.$route.query?.app_redirect) {
        case 'media':
          window.open(`https://iny.su/?auth=${res.jwt}&_origin=iny.su`)
          break
      }
    }

    // simple app auth widget
    if (vm.$route.query?.app_id) {
      Api.getAppById(vm.$route.query?.app_id).then(app => {
        const redirectUrl = `//${app.domain}${app.redirect_uri}?auth=${res?.jwt}&_origin=iny.su`
        window.open(redirectUrl)
        vm.$router.push({ name: 'Main' })
      })
    }
  }
  return res
}

// Api
const Api = {
  host: API_PATH_METHOD,
  init (vm = {}) {
    const clientId = localStorage.getItem('client_id')
    if (!clientId) this.setClientId()

    this.refreshJwt(vm)
    window.userChecker = setInterval(() => {
      this.refreshJwt(vm)
    }, 15 * 1000)
  },
  setClientId (callbackStart = () => {}, callbackEnd = () => {}) {
    const appId = 1
    const platform = getPlatform()
    callbackStart()
    axios
      .get(this.host + `device.getClientId?v=1.0&app_id=${appId}&platform=${platform}`)
      .then((res) => {
        ApiMiddleware(res)
        const clientId = res.data.clientId
        localStorage.setItem('client_id', clientId)
        callbackEnd()
      })
  },
  async getAppById (id) {
    const res = await axios.get(this.host + 'app.widgetAuth?app_id=' + id + '&v=1.0')
    return ApiMiddleware(res)
  },
  async refreshJwt (vm) {
    const isAuth = vm.$store.getters.IS_AUTH
    const clientId = localStorage.getItem('client_id')
    const jwt = localStorage.getItem('jwt')

    if ('navigator' in window) {
      const isOnLine = window.navigator.onLine
      if (!isOnLine) {
        return true
      }
    }

    if (isAuth) {
      const res = await axios.get(this.host + `user.refreshJwt?v=1.0&jwt=${jwt}&client_id=${clientId}`)
        .catch(() => {
          // this.logout(vm)
        })
      const user = ApiMiddleware(res)

      if (typeof user !== 'object') return true

      if (user.jwt !== jwt) {
        if (user.jwt === 'LOGOUT') this.logout(vm)
        else vm.$store.commit('LOGIN', user.jwt)
      }
      if (user.permission === 'deny' || user?.status === 400) {
        this.logout(vm)
      }
    }
  },
  async changeUserStatus (status) {
    const jwt = localStorage.getItem('jwt')
    const res = await axios.get(this.host + `user.changeStatus?v=1.0&status=${status}&jwt=${jwt}`)
    ApiMiddleware(res)
  },
  getPlatformIcon (platform) {
    return iconDeviceObject[platform]
  },
  isOnline (dateVisit) {
    const gap = 300000
    const currentTime = Date.now()
    const visitTime = +dateVisit * 1000

    if (visitTime + gap > currentTime) return true
    else return false
  },
  async login (vm, username, password) {
    const clientId = localStorage.getItem('client_id')
    const res = await axios.get(this.host + `user.login?v=1.0&email=${username}&password=${password}&client_id=${clientId}`)
    return UserAuthRedirectMiddleware(vm, ApiMiddleware(res))
  },
  async register (vm, name, surname, email, gender, password) {
    const clientId = localStorage.getItem('client_id')
    const res = await axios.get(this.host + `user.register?v=1.0&client_id=${clientId}&name=${name}&surname=${surname}&email=${email}&gender=${gender}&password=${password}`)
    return UserAuthRedirectMiddleware(vm, ApiMiddleware(res))
  },
  logout (vm) {
    this.addFastLogin(vm)
    vm.$store.commit('LOGOUT')
    if (vm.$route.meta.requiresAuth) vm.$router.push({ name: 'Main' })
  },
  async getUserPrivateInfo (uid = 0, domain = '') {
    const jwt = localStorage.getItem('jwt')
    let res
    if (uid !== 0) res = await axios.get(this.host + `user.getPrivateInfo?v=1.0&uid=${uid}&jwt=${jwt}`)
    if (domain !== '') res = await axios.get(this.host + `user.getPrivateInfo?v=1.0&domain=${domain}&jwt=${jwt}`)
    return ApiMiddleware(res)
  },
  async getUserPublicInfo (uid = 0, domain = '') {
    let res
    if (uid !== 0) res = await axios.get(this.host + `user.getPublicInfo?v=1.0&uid=${uid}`)
    if (domain !== '') res = await axios.get(this.host + `user.getPublicInfo?v=1.0&domain=${domain}`)
    return ApiMiddleware(res)
  },
  async userEditSave ({ name, surname, birthday, gender }) {
    const jwt = localStorage.getItem('jwt')
    const res = await axios.get(this.host + `user.editSave?v=1.0&jwt=${jwt}${(name ? '&name=' + name : '')}${(surname ? '&surname=' + surname : '')}${(birthday ? '&birthday=' + birthday : '')}${(gender ? '&gender=' + gender : '')}`)
    return ApiMiddleware(res)
  },
  getFastLogin () {
    const fastLogin = JSON.parse(localStorage.getItem('fastLogin'))
    if (!fastLogin) return []
    return fastLogin
  },
  addFastLogin (vm) {
    const user = vm.$store.getters.USER
    const currentData = {
      uid: user.uid,
      name: user.name,
      surname: user.surname,
      email: user.email,
      gender: user.gender
    }
    if (!user.auth) return false
    const fastLogin = this.getFastLogin()
    if (!fastLogin.find(item => item.uid === user.uid)) {
      fastLogin.push(currentData)
      const fastLoginJson = JSON.stringify(fastLogin)
      localStorage.setItem('fastLogin', fastLoginJson)
    } else return false
  },
  deleteFastLogin (uid) {
    const fastLogin = this.getFastLogin()
    fastLogin.find((user, idx) => {
      if (user.uid === uid) {
        fastLogin.splice(idx, 1)
        const fastLoginJson = JSON.stringify(fastLogin)
        localStorage.setItem('fastLogin', fastLoginJson)
      }
    })
    return fastLogin
  },
  async sessionsShow () {
    const jwt = localStorage.getItem('jwt')
    const clientId = localStorage.getItem('client_id')
    const res = await axios.get(this.host + `user.sessionsShow?v=1.0&jwt=${jwt}&client_id=${clientId}`)

    return ApiMiddleware(res)
  },
  async sessionDelete (specifiedClientId = '') {
    const jwt = localStorage.getItem('jwt')
    const clientId = localStorage.getItem('client_id')
    const res = await axios.get(this.host + `user.sessionsLogout?v=1.0&jwt=${jwt}&client_id=${clientId}${(specifiedClientId ? `&specified_client_id=${specifiedClientId}` : '')}`)

    return ApiMiddleware(res)
  },
  async getCrypt () {
    const jwt = localStorage.getItem('jwt')
    const res = await axios.get(this.host + `telegram.getCrypt?v=1.0&jwt=${jwt}`)

    return ApiMiddleware(res)
  }
}

export default Api
