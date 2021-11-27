<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
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
