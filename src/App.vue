<template>
  <div class="app__ui-system app__module_toastr"></div>
  <div class="app__ui-menu"></div>
  <div class="app__ui-player-init"></div>
  <app-player></app-player>
  <the-preloader v-show="isPreloader" class="the_preloader"></the-preloader>
  <the-header v-show="!isPreloader" class="the_header"></the-header>
  <the-wrapper v-show="!isPreloader" class="the_wrapper"></the-wrapper>
  <the-footer v-show="!isPreloader" class="the_footer"></the-footer>
  <top-button></top-button>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { inject, onMounted } from '@vue/runtime-core'
import Api from './api'
import setAppVar from './mixins/SetAppVar'
import TheFooter from './components/TheFooter.vue'
import TheWrapper from './components/TheWrapper.vue'
import TheHeader from './components/TheHeader.vue'
import ThePreloader from './components/ThePreloader.vue'
import TopButton from './components/TopButton.vue'
import AppPlayer from './components/AppPlayer.vue'

export default {
  name: 'App',
  components: {
    ThePreloader,
    TheHeader,
    TheWrapper,
    TheFooter,
    TopButton,
    AppPlayer
  },
  setup (props, context) {
    // init simple loader
    const isPreloader = ref(true)

    // setAppVar
    onMounted(() => {
      window.addEventListener('resize', setAppVar)
      setAppVar()
      isPreloader.value = false
    })

    // initAuth
    const store = useStore()
    const theme = inject('theme')

    Api.init({ $store: store })

    window.addEventListener('storage', (event) => {
      if (event.key === 'jwt') {
        if (event.newValue === 'LOGOUT' || event.newValue === '') store.commit('LOGOUT')
        else store.commit('LOGIN', event.newValue)
      }
      if (event.key === 'Theme') {
        if (event.newValue === '') return false
        if (theme.name === event.newValue) return false
        theme.change(event.newValue)
      }
      if (event.key === 'asideState') {
        const asideStateEvent = new CustomEvent('asideState')
        window.dispatchEvent(asideStateEvent)
      }
    })

    const jwt = localStorage.getItem('jwt')
    if (jwt && jwt !== 'LOGOUT') {
      store.commit('LOGIN', jwt)
    }

    return {
      isPreloader
    }
  }
}
</script>
