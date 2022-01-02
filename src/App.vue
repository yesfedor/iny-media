<i18n lang="yaml" locale="ru">
  pageTitle: "Purple X: Загрузка"
</i18n>

<i18n lang="yaml" locale="en">
  pageTitle: "Purple X: Loading"
</i18n>

<template>
  <div class="app__ui-system"></div>
  <div class="app__ui-menu"></div>
  <the-preloader v-show="isPreloader" class="the_preloader"></the-preloader>
  <the-header v-show="!isPreloader" class="the_header"></the-header>
  <the-wrapper v-show="!isPreloader" class="the_wrapper"></the-wrapper>
  <the-footer v-show="!isPreloader" class="the_footer"></the-footer>
</template>

<script>
import Api from './api'
import TheFooter from './components/TheFooter.vue'
import TheWrapper from './components/TheWrapper.vue'
import TheHeader from './components/TheHeader.vue'
import ThePreloader from './components/ThePreloader.vue'

export default {
  name: 'App',
  components: { ThePreloader, TheHeader, TheWrapper, TheFooter },
  data () {
    return {
      isPreloader: true,
      appVarInterval: null,
      storeAppVar: {
        w_app: null,
        h_app: null,
        w_preloader: null,
        h_preloader: null,
        w_header: null,
        h_header: null,
        w_wrapper: null,
        h_wrapper: null,
        w_footer: null,
        h_footer: null
      }
    }
  },
  mounted () {
    document.title = this.$t('pageTitle')
    this.initAuth()
    this.initFeedSilent()
    window.addEventListener('resize', this.initSetAppVarEvent)
  },
  unmounted () {
    clearInterval(this.appVarInterval)
  },
  computed: {
    IS_AUTH () {
      return this.$store.getters.IS_AUTH
    },
    JWT () {
      return this.$store.getters.JWT
    }
  },
  methods: {
    initFeedSilent () {
      this.isPreloader = true
      if (!this.IS_AUTH) {
        this.isPreloader = false
        return false
      }
      const cliendId = localStorage.getItem('client_id')
      Api.watchGetFeed(this.JWT, cliendId, 1).then(() => {
        setTimeout(() => {
          this.isPreloader = false
          this.setAppVar()
        }, 0)
        setTimeout(() => {
          const eventScroll = new Event('scroll')
          window.dispatchEvent(eventScroll)
        }, 100)
      })

      return true
    },
    initSetAppVarEvent () {
      this.setAppVar()
    },
    initAuth () {
      Api.init(this)

      window.addEventListener('storage', (event) => {
        if (event.key === 'jwt') {
          if (event.newValue === 'LOGOUT' || event.newValue === '') this.$store.commit('LOGOUT')
          else this.$store.commit('LOGIN', event.newValue)
        }
        if (event.key === 'Theme') {
          if (event.newValue === '') return false
          if (this.$theme.name === event.newValue) return false
          this.$theme.change(event.newValue)
        }
      })

      const jwt = localStorage.getItem('jwt')
      if (jwt && jwt !== 'LOGOUT') this.$store.commit('LOGIN', jwt)
    },
    setAppVar () {
      // init elements
      const $app = document.querySelector('.app')
      const $thePreloader = document.querySelector('.the_preloader')
      const $theHeader = document.querySelector('.the_header')
      const $theWrapper = document.querySelector('.the_wrapper')
      const $theFooter = document.querySelector('.the_footer')

      // app
      if ($app.offsetWidth !== this.storeAppVar.w_app) {
        this.storeAppVar.w_app = $app.offsetWidth
        document.documentElement.style.setProperty('--w-app', $app.offsetWidth + 'px')
      }
      if ($app.offsetHeight !== this.storeAppVar.h_app) {
        this.storeAppVar.h_app = $app.offsetHeight
        document.documentElement.style.setProperty('--h-app', $app.offsetHeight + 'px')
      }

      // the_preloader
      if ($thePreloader.offsetWidth !== this.storeAppVar.w_preloader) {
        this.storeAppVar.w_preloader = $thePreloader.offsetWidth
        document.documentElement.style.setProperty('--w-preloader', $thePreloader.offsetWidth + 'px')
      }
      if ($thePreloader.offsetHeight !== this.storeAppVar.h_preloader) {
        this.storeAppVar.h_preloader = $thePreloader.offsetHeight
        document.documentElement.style.setProperty('--h-preloader', $thePreloader.offsetHeight + 'px')
      }

      // the_header
      if ($theHeader.offsetWidth !== this.storeAppVar.w_header) {
        this.storeAppVar.w_header = $theHeader.offsetWidth
        document.documentElement.style.setProperty('--w-header', $theHeader.offsetWidth + 'px')
      }
      if ($theHeader.offsetHeight !== this.storeAppVar.h_header) {
        this.storeAppVar.h_header = $theHeader.offsetHeight
        document.documentElement.style.setProperty('--h-header', $theHeader.offsetHeight + 'px')
      }

      // the_wrapper
      if ($theWrapper.offsetWidth !== this.storeAppVar.w_wrapper) {
        this.storeAppVar.w_wrapper = $theWrapper.offsetWidth
        document.documentElement.style.setProperty('--w-wrapper', $theWrapper.offsetWidth + 'px')
      }
      if ($theWrapper.offsetHeight !== this.storeAppVar.h_wrapper) {
        this.storeAppVar.h_wrapper = $theWrapper.offsetHeight
        document.documentElement.style.setProperty('--h-wrapper', $theWrapper.offsetHeight + 'px')
      }

      // the_footer
      if ($theFooter.offsetWidth !== this.storeAppVar.w_footer) {
        this.storeAppVar.w_footer = $theFooter.offsetWidth
        document.documentElement.style.setProperty('--w-footer', $theFooter.offsetWidth + 'px')
      }
      if ($theFooter.offsetHeight !== this.storeAppVar.h_footer) {
        this.storeAppVar.h_footer = $theFooter.offsetHeight
        document.documentElement.style.setProperty('--h-footer', $theFooter.offsetHeight + 'px')
      }
    }
  }
}
</script>
