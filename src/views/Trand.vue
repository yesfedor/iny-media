<template>
  <div class="container">
    <app-loader :height="'calc(100vh - var(--h-header))'" :code="loader">
      <div class="trand">
        <div class="trand__title-wrapper">
          <h1 class="trand__title">В тренде</h1>
        </div>
        <div v-if="trandData.length > 0" class="trand__content-exists">
          <watch-card
            v-for="item in trandData"
            :key="item.kinopoiskId + '_' + item.id"
            :id="item.id"
            :kinopoiskId="item.kinopoiskId"
            :nameRu="item.nameRu"
            :ratingAgeLimits="item.ratingAgeLimits"
            :ratingKinopoisk="item.ratingKinopoisk"
            :posterUrl="item.posterUrl"
            :type="item.type"
            :year="item.year"
          ></watch-card>
        </div>
        <div v-else class="trand__content-empty">
          <h3 class="trand__empty-title">Тренды пустуют</h3>
        </div>
      </div>
    </app-loader>
  </div>
</template>

<script>
import Api from '../api'
import WatchCard from '../components/WatchCard.vue'
import toastr from '../mixins/Toastr'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'Trand',
  components: {
    WatchCard,
    AppLoader
  },
  data () {
    return {
      loader: 'loader',
      trandData: []
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      document.title = 'Мои подписки'
      this.loadtrand()
    },
    loadtrand () {
      const clientId = localStorage.getItem('client_id')
      Api.watchGetTrand(this.JWT, clientId).then(({ data }) => {
        this.loader = 'data'
        if (data?.code === 200) {
          this.trandData = data?.content
        } else {
          /** @todo что тут делать ??? */
        }
      })
    },
    checkAuth () {
      if (!this.$store.getters.IS_AUTH) {
        this.$router.push('/auth')
        toastr.error('Авторизуйтесь для просмотра подписок')
      }
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.IS_AUTH
    },
    user () {
      return this.$store.getters.USER
    },
    JWT () {
      return this.$store.getters.JWT
    }
  },
  watch: {
    isAuth () {
      this.checkAuth()
    }
  }
}
</script>

<style scoped>
.trand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.trand__title-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.trand__title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
/* 1 */
.trand__content-exists {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.trand__content-empty {
  width: 100%;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.trand__empty-title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}

/* 2 */
@media (min-width: 576px) {
  .trand__title-wrapper, .trand__content-exists, .trand__content-empty {
    min-width: 500px;
  }
  .trand__content-exists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Medium devices (tablets, 768px and up) 3 */
@media (min-width: 768px) {
  .trand__title-wrapper, .trand__content-exists, .trand__content-empty {
    min-width: 590px;
  }
  .trand__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Large devices (desktops, 992px and up) 4 */
@media (min-width: 992px) {
  .trand__title-wrapper, .trand__content-empty {
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .trand__title-wrapper, .trand__content-exists, .trand__content-empty {
    min-width: 900px;
  }
  .trand__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* X-Large devices (large desktops, 1200px and up) 5 */
@media (min-width: 1200px) {
  .trand__title-wrapper, .trand__content-exists, .trand__content-empty {
    min-width: 1100px;
  }
  .trand__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) 6 */
@media (min-width: 1400px) {
  .trand__title-wrapper, .trand__content-exists, .trand__content-empty {
    min-width: 1300px;
  }
  .trand__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}
</style>
