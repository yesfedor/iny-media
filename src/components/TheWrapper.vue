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
          console.log('Redirect because auth false')
          this.$router.push({ name: requiresAuthErrorRouteName })
        }
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
    },
    isAuth () {
      this.checkMetaRoute()
    }
  }
}
</script>
