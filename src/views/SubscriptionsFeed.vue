<template>
  <div class="container px-0 px-lg-auto">
    <div class="subscriptions">
      <div class="subscriptions__title-wrapper">
        <h1 class="subscriptions__title">Новые серии</h1>
      </div>
      <app-loader :height="'calc(50vh)'" :code="loader">
        <div v-if="subscriptionsData.length > 0" class="subscriptions__content-exists">
          <watch-card
            v-for="item in subscriptionsData"
            displayOption="feed"
            :key="item.kinopoiskId + '_' + item.season + '_' + item.episode"
            :id="item.kinopoiskId + '_' + item.season + '_' + item.episode"
            :kinopoiskId="item.kinopoiskId"
            :nameRu="subscriptionBinding[item.kinopoiskId].nameRu"
            :ratingAgeLimits="subscriptionBinding[item.kinopoiskId].ratingAgeLimits"
            :ratingKinopoisk="subscriptionBinding[item.kinopoiskId].ratingKinopoisk"
            :posterUrl="subscriptionBinding[item.kinopoiskId].posterUrl"
            :type="subscriptionBinding[item.kinopoiskId].type"
            :year="subscriptionBinding[item.kinopoiskId].year"
            :season="item.season"
            :episode="item.episode"
            :episodeName="item.nameRu"
          ></watch-card>
        </div>
        <div v-else class="subscriptions__content-empty">
          <h3 class="subscriptions__empty-title">Подписки еще формируются, подпишитесь на пару сериалов</h3>
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
  name: 'SubscriptionsFeed',
  components: {
    WatchCard,
    AppLoader
  },
  data () {
    return {
      loader: 'loader',
      subscriptionsData: [],
      subscriptionBinding: []
    }
  },
  async mounted () {
    document.title = 'Мои подписки'
    await this.loadSubscriptions()
  },
  methods: {
    async loadSubscriptions () {
      const clientId = localStorage.getItem('client_id')
      const jwt = localStorage.getItem('jwt')

      const { data } = await Api.watchGetFeed(jwt, clientId)
      this.loader = 'data'
      if (data?.code === 200) {
        this.subscriptionsData = data?.content?.sort((a, b) => b.time - a.time)
        this.subscriptionBinding = data.binding
      }
    }
  }
}
</script>

<style scoped>
.subscriptions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.subscriptions__title-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.subscriptions__title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
.subscriptions__action {
  display: block;
  font-size: large;
  margin-top: 0.5em;
  text-decoration: none;
  color: var(--complement-strong);
}
/* 1 */
.subscriptions__content-exists {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.subscriptions__content-empty {
  width: 100%;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.subscriptions__empty-title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}

/* 2 */
@media (min-width: 576px) {
  .subscriptions__title-wrapper, .subscriptions__content-exists, .subscriptions__content-empty {
    min-width: 500px;
  }
  .subscriptions__content-exists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Medium devices (tablets, 768px and up) 3 */
@media (min-width: 768px) {
  .subscriptions__title-wrapper, .subscriptions__content-exists, .subscriptions__content-empty {
    min-width: 590px;
  }
  .subscriptions__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Large devices (desktops, 992px and up) 4 */
@media (min-width: 992px) {
  .subscriptions__title-wrapper, .subscriptions__content-empty {
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .subscriptions__title-wrapper, .subscriptions__content-exists, .subscriptions__content-empty {
    min-width: 900px;
  }
  .subscriptions__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* X-Large devices (large desktops, 1200px and up) 5 */
@media (min-width: 1200px) {
  .subscriptions__title-wrapper, .subscriptions__content-exists, .subscriptions__content-empty {
    min-width: 1100px;
  }
  .subscriptions__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) 6 */
@media (min-width: 1400px) {
  .subscriptions__title-wrapper, .subscriptions__content-exists, .subscriptions__content-empty {
    min-width: 1300px;
  }
  .subscriptions__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}
</style>
