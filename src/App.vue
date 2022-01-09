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
import setAppVar from './mixins/SetAppVar'

export default {
  name: 'App',
  components: {
    ThePreloader,
    TheHeader,
    TheWrapper,
    TheFooter
  },
  data () {
    return {
      isPreloader: true,
      appVarInterval: 0
    }
  },
  mounted () {
    this.initAuth()

    this.isPreloader = false

    window.addEventListener('resize', setAppVar)
    setAppVar()
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
        if (event.key === 'asideState') {
          const asideStateEvent = new CustomEvent('asideState')
          window.dispatchEvent(asideStateEvent)
        }
      })

      const jwt = localStorage.getItem('jwt')
      if (jwt && jwt !== 'LOGOUT') {
        this.$store.commit('LOGIN', jwt)
      }
    }
  }
}
</script>
