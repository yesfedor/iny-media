import { createStore } from 'vuex'
import '../interfaces/User'
import '../interfaces/Devices'

export default createStore({
  state: {
    preloader: {
      duration: 1500,
      offset: 1500
    },
    /** @type {Boolean} */
    isAuth: false,
    /** @type {String} */
    jwt: '',
    /** @type {User} */
    user: {
      uid: 0,
      domain: '',
      telegram: null,
      uid_crypt: null,
      name: '',
      surname: '',
      email: '',
      gender: ''
    },
    /** @type {Devices} */
    device: {
      client_id: ''
    },

    compactPlayer: false
  },
  getters: {
    PRELOADER_DURATION: state => {
      return state.preloader.duration
    },
    PRELOADER_OFFSET: state => {
      return state.preloader.offset
    },
    IS_AUTH: state => {
      return state.isAuth
    },
    USER: state => {
      return {
        ...state.user,
        auth: state.isAuth
      }
    },
    JWT: state => {
      return state.jwt
    },
    COMPACT_PLAYER: state => {
      return state.compactPlayer
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
        telegram: user.telegram || false,
        uid_crypt: user.uid_crypt || false,
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
        telegram: null,
        uid_crypt: null,
        name: '',
        surname: '',
        email: '',
        gender: ''
      }
      state.jwt = ''
      localStorage.setItem('jwt', 'LOGOUT')
    },

    SET_COMPACT_PLAYER: (state, payload) => {
      state.compactPlayer = payload
    }
  },
  actions: {
  }
})
