<template>
  <div class="container px-0 px-lg-auto">
    <div class="history">
      <div class="history__title-wrapper">
        <h1 class="history__title">Ваша история просмотров</h1>
      </div>
      <app-loader :height="'calc(50vh - var(--h-header))'" :code="loader">
        <div v-if="historyData.length > 0" class="history__content-exists">
          <watch-card
            v-for="item in historyData"
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
        <div v-else class="history__content-empty">
          <h3 class="history__empty-title">Похоже, вы еще ничего не посмотрели</h3>
        </div>
      </app-loader>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import WatchCard from '../components/WatchCard.vue'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'History',
  components: {
    WatchCard,
    AppLoader
  },
  data () {
    return {
      loader: 'loader',
      historyData: []
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      document.title = 'Мои подписки'
      this.loadHistory()
    },
    loadHistory () {
      const clientId = localStorage.getItem('client_id')
      const jwt = localStorage.getItem('jwt')
      Api.watchGetUserHistory(jwt, clientId).then(({ data }) => {
        this.loader = 'data'

        if (data?.code === 200) {
          this.historyData = data?.content
        } else {
          /** @todo что тут делать ??? */
        }
      })
    }
  }
}
</script>

<style scoped>
.history {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.history__title-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.history__title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
/* 1 */
.history__content-exists {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.history__content-empty {
  width: 100%;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.history__empty-title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}

/* 2 */
@media (min-width: 576px) {
  .history__title-wrapper, .history__content-exists, .history__content-empty {
    min-width: 500px;
  }
  .history__content-exists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Medium devices (tablets, 768px and up) 3 */
@media (min-width: 768px) {
  .history__title-wrapper, .history__content-exists, .history__content-empty {
    min-width: 590px;
  }
  .history__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Large devices (desktops, 992px and up) 4 */
@media (min-width: 992px) {
  .history__title-wrapper, .history__content-empty {
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .history__title-wrapper, .history__content-exists, .history__content-empty {
    min-width: 900px;
  }
  .history__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* X-Large devices (large desktops, 1200px and up) 5 */
@media (min-width: 1200px) {
  .history__title-wrapper, .history__content-exists, .history__content-empty {
    min-width: 1100px;
  }
  .history__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) 6 */
@media (min-width: 1400px) {
  .history__title-wrapper, .history__content-exists, .history__content-empty {
    min-width: 1300px;
  }
  .history__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}
</style>
