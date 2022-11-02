<template>
  <div class="wrapper">
    <the-aside :class="'wrapper__aside_' + asideState" class="wrapper__aside theme-none"></the-aside>
    <main :class="'wrapper__content_' + asideState" class="wrapper__content">
      <router-view v-slot="{ Component }">
        <transition
          name="scale"
          mode="out-in"
          @enter="routerEnter"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <the-compact-player></the-compact-player>
  </div>
</template>

<script>
import TheAside from './TheAside.vue'
import TheCompactPlayer from './TheCompactPlayer.vue'
export default {
  components: {
    TheAside,
    TheCompactPlayer
  },
  name: 'TheWrapper',
  data () {
    return {
      asideState: 'main'
    }
  },
  mounted () {
    this.initRoute()

    const asideStateHandler = () => {
      this.asideStateHandler()
    }
    window.addEventListener('asideState', asideStateHandler)
    asideStateHandler()
  },
  methods: {
    asideStateHandler () {
      this.asideState = localStorage.getItem('asideState') || 'main'
    },
    initRoute () {
      document.title = 'INY Media - онлайн кинотеатр'
    },
    routerEnter () {
      setTimeout(() => {
        this.checkMetaRoute()
        this.dispatchScroll()
      }, 100)
    },
    checkMetaRoute () {
      // requiresAuth
      const requiresAuthErrorRouteName = 'Auth'
      if (this.$route.name === 'Trailer' && this.isAuth) {
        this.$router.push('/watch' + this.$route.params.kpid)
        return true
      }
      if (this.$route.name === 'Watch' && !this.isAuth) {
        this.$router.push('/trailer' + this.$route.params.kpid)
        return true
      }
      if (this.$route.meta.requiresAuth && !this.isAuth) {
        this.$router.push({ name: requiresAuthErrorRouteName })
        return true
      }
    },
    dispatchScroll () {
      const event = new Event('scroll')
      window.dispatchEvent(event)
    },
    asideStateRoute () {
      this.asideStateHandler()
      if (this.$route.name === 'Trailer') {
        this.asideState = 'none'
      }
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.IS_AUTH
    }
  },
  watch: {
    '$route.name' () {
      this.checkMetaRoute()
      this.dispatchScroll()
      this.asideStateRoute()
    },
    isAuth () {
      this.checkMetaRoute()
      this.dispatchScroll()
      this.asideStateRoute()
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: block;
}
.wrapper__aside {
  transition: all 0s;
  transition: color, background var(--theme-duration);
}
.wrapper__content {
  display: block;
  height: calc(100vh - var(--h-header, 0px));
  overflow-y: scroll;
  transition: all 0s;
  transition: color, background var(--theme-duration);
}
@media (min-width: 992px) {
  .wrapper {
    display: flex;
    height: calc(100vh - var(--h-header, 0px));
  }
  .wrapper__aside {
    width: 231px;
    height: calc(100vh - var(--h-header, 0px));
    flex: 0 1 auto;
  }
  .wrapper__aside_zip {
    width: 75px;
    height: calc(100vh - var(--h-header, 0px));
    flex: 0 1 auto;
  }
  .wrapper__content {
    display: block;
    width: calc(100vw - 201px);
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 0 1 auto;
  }
  .wrapper__content_zip {
    display: block;
    width: calc(100vw - 75px);
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 0 1 auto;
  }
}
.wrapper__aside_none {
  display: none;
  width: 0px;
}
.wrapper__content_none {
  display: block;
  width: 100vw;
}
.wrapper__content::-webkit-scrollbar {
  width: 4px;
  height: 10px;
}
.wrapper__content::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: var(--base-strong-darker);
}
.wrapper__content::-webkit-scrollbar-thumb:hover {
  background: var(--base-strong-darker);
}
.wrapper__content::-webkit-scrollbar-track {
  background: var(--base-back);
  border-radius: 0px;
  box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
}
</style>
