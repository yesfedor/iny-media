import { createStore } from 'vuex'
import '../interfaces/User'
import '../interfaces/Devices'

export default createStore({
  state: {
    /** @type {Boolean} */
    isAuth: false,
    /** @type {String} */
    jwt: '',
    /** @type {User} */
    user: {
      uid: 0,
      domain: '',
      name: '',
      surname: '',
      email: '',
      gender: ''
    },
    /** @type {Devices} */
    device: {
      client_id: ''
    }
  },
  getters: {
    IS_AUTH: state => {
      return state.isAuth
    },
    USER: state => {
      return state.user
    },
    JWT: state => {
      return state.jwt
    }
  },
  mutations: {
    /**
     * @param {String} jwt
     */
    LOGIN: (state, jwt) => {
      /** @type {User} */
      const user = JSON.parse(atob(jwt.split('.')[1]))
      state.isAuth = true
      state.user = {
        uid: user.uid,
        domain: user.domain,
        name: user.name,
        surname: user.surname,
        email: '',
        gender: ''
      }
      state.jwt = jwt
      localStorage.setItem('jwt', jwt)
    },
    LOGOUT: state => {
      state.isAuth = false
      state.user = {
        uid: 0,
        domain: '',
        name: '',
        surname: '',
        email: '',
        gender: ''
      }
      state.jwt = ''
      localStorage.setItem('jwt', 'LOGOUT')
    }
  },
  actions: {
  }
})
