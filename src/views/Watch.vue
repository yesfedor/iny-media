<template>
  <!-- Watch::Container -->
  <div class="watch">
    <div class="watch__primary">
      <div class="watch__choice-player">
      </div>
      <div class="watch__player-wrapper">
        <iframe class="watch__player" src="//" frameborder="0"></iframe>
      </div>
      <div class="watch__title-wrapper">
        <h1 class="watch__title">
          <span class="watch__title-name"></span>
          <span class="watch__title-year"></span>
        </h1>
      </div>
      <div class="watch__actions">
        <div class="watch__actions-item"></div>
        <div class="watch__actions-item"></div>
      </div>
      <watch-info></watch-info>
      <watch-reviews></watch-reviews>
    </div>
    <div class="watch__secondary">
      <watch-card></watch-card>
    </div>
  </div>
</template>

<script>
// import Api from '../api'
import toastr from '../mixins/Toastr'
import WatchInfo from '../components/WatchInfo.vue'
import WatchReviews from '../components/WatchReviews.vue'
import WatchCard from '../components/WatchCard.vue'

export default {
  name: 'Main',
  components: {
    WatchInfo,
    WatchReviews,
    WatchCard
  },
  data () {
    return {
      kpid: 0
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      this.checkAuth()
      this.kpid = this.$route.params.kpid
    },
    getWatchDataByKpid () {},
    getRecommendationsDataByKpid () {},
    getUserRecord () {},
    getPlayerSrc () {},
    /** @param {String} playerAlias */
    setPlayerSrc (playerAlias) {},
    subscribeManager () {},
    checkAuth () {
      if (!this.isAuth) {
        this.$router.push('/auth')
        toastr.error('Авторизуйтесь для просмотра')
      }
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.IS_AUTH
    },
    user () {
      return this.$store.getters.USER
    }
  },
  watch: {
    '$route.params' () {
      this.kpid = this.$route.params.kpid
    },
    isAuth () {
      this.checkAuth()
    }
  }
}
</script>

<style scoped>
/* Watch::Wrapper */
.watch {
}

/* Watch::Primary */
.watch__primary {
}
.watch__choice-player {
}
.watch__player-wrapper {
}
.watch__player {
}
.watch__title-wrapper {
}
.watch__title {
}
.watch__title-name {
}
.watch__title-year {
}
.watch__actions {
}
.watch__actions-item {
}

/* Watch::Secondary */
.watch__secondary {
}
/* Dekstop */
@media (min-width: 992px) {
  /* Watch::Wrapper */
  .watch {
  }

  /* Watch::Primary */
  .watch__primary {
  }
  .watch__choice-player {
  }
  .watch__player-wrapper {
  }
  .watch__player {
  }
  .watch__title-wrapper {
  }
  .watch__title {
  }
  .watch__title-name {
  }
  .watch__title-year {
  }
  .watch__actions {
  }
  .watch__actions-item {
  }

  /* Watch::Secondary */
  .watch__secondary {
  }
}
</style>
