<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <transition
        name="scale"
        mode="out-in"
        @enter="routerEnter"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'TheWrapper',
  mounted () {
    this.initRoute()
  },
  methods: {
    initRoute () {
      document.title = 'INY Media (Aplha)'
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
      if (this.$route.meta.requiresAuth) {
        if (!this.isAuth) {
          this.$router.push({ name: requiresAuthErrorRouteName })
        }
      }
    },
    dispatchScroll () {
      const event = new Event('scroll')
      window.dispatchEvent(event)
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
    },
    isAuth () {
      this.checkMetaRoute()
      this.dispatchScroll()
    }
  }
}
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0.3;
  transform: scale(0.9);
}
</style>
