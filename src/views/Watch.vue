<template>
  <!-- Watch::Container -->
  <div class="watch">
    <app-loader :height="'calc(100vh - var(--h-header))'" :code="loaders.watchData">
      <div class="watch__primary">
        <div class="watch__player-wrapper ratio ratio-16x9">
          <iframe class="watch__player" :src="getPlayerSrc(playerAlias)" allowfullscreen frameborder="0"></iframe>
        </div>
        <div class="watch__title-wrapper">
          <h1 class="watch__title">
            <span class="watch__title-name">{{(type.length === 0 ? '' : type[0].toUpperCase() + type.slice(1))}} {{nameRu}}</span>
            <span class="watch__title-ratingAgeLimits">{{ratingAgeLimits}}</span>
          </h1>
        </div>
        <div class="watch__actions">
          <div class="watch__actions-item-choice-player">
            <app-button @click="setPlayerSrc('svetacdn')" :class="'watch__actions-item button__primary' + (this.playerAlias === 'svetacdn' ? '':'_outline')">Svetacdn</app-button>
            <app-button @click="setPlayerSrc('allohalive')" :class="'watch__actions-item button__primary' + (this.playerAlias === 'allohalive' ? '':'_outline')">Allohalive</app-button>
            <app-button @click="setPlayerSrc('bazon')" :class="'watch__actions-item button__primary' + (this.playerAlias === 'bazon' ? '':'_outline')">Bazon</app-button>
          </div>
          <div class="watch__actions-item-do">
            <app-button @click="donate()" class="watch__actions-item button__primary">Донат</app-button>
            <app-button @click="subscribeManager()" :class="'watch__actions-item ' + (isSubscribe ? 'button__complement':'button__error')">{{(isSubscribe ? 'Отписаться':'Подписаться')}}</app-button>
          </div>
        </div>
        <watch-info
          class="watch__info"
          :slogan="slogan"
          :shortDescription="shortDescription"
          :description="description"
          :year="year"
          :filmLength="filmLength"
          :genres="genres"
          :countries="countries"
          :startYear="startYear"
          :endYear="endYear"
          :ratingKinopoisk="ratingKinopoisk"
          :ratingKinopoiskVoteCount="ratingKinopoiskVoteCount"
        ></watch-info>
        <watch-reviews
          class="watch__reviews"
          :kinopoiskId="this.kinopoiskId"
          :type="this.type"
        ></watch-reviews>
        <watch-facts
          class="watch__facts"
          :kinopoiskId="this.kinopoiskId"
        ></watch-facts>
      </div>
      <div class="watch__secondary">
        <app-loader :code="loaders.watchRecommendations">
          <watch-card
            class="watch__card"
            v-for="item in recommendationsData"
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
        </app-loader>
      </div>
    </app-loader>
  </div>
</template>

<script>
import Api from '../api'
import WatchInfo from '../components/WatchInfo.vue'
import WatchReviews from '../components/WatchReviews.vue'
import WatchCard from '../components/WatchCard.vue'
import AppButton from '../components/AppButton.vue'
import WatchFacts from '../components/WatchFacts.vue'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'Watch',
  components: {
    AppButton,
    WatchInfo,
    WatchReviews,
    WatchCard,
    WatchFacts,
    AppLoader
  },
  data () {
    return {
      loaders: {
        watchData: 'loader',
        watchRecommendations: 'loader',
        btnSubscribe: 'data'
      },
      recommendationsData: [],
      playerAlias: '',
      isSubscribe: false,
      id: 0,
      kinopoiskId: 0,
      imdbId: 'tt0',
      nameRu: '',
      nameEn: '',
      posterUrl: '',
      posterUrlPreview: '',
      ratingKinopoisk: '',
      ratingKinopoiskVoteCount: '',
      ratingFilmCritics: '',
      ratingFilmCriticsVoteCount: '',
      year: '',
      filmLength: '',
      slogan: '',
      description: '',
      shortDescription: '',
      type: '',
      ratingAgeLimits: '',
      startYear: '',
      endYear: '',
      countries: '',
      genres: ''
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      this.loaders.watchData = 'loader'
      this.loaders.watchRecommendations = 'loader'
      this.loaders.btnSubscribe = 'data'

      this.kinopoiskId = this.$route.params.kpid

      const playerAlias = localStorage.getItem('playerAlias')
      if (playerAlias) this.playerAlias = playerAlias
      else this.playerAlias = 'allohalive'

      this.getWatchDataByKpid()
      this.getRecommendationsDataByKpid()
      this.getUserRecord()
    },
    getWatchDataByKpid () {
      Api.watcDataByKpid(this.kinopoiskId, this.JWT).then(({ data }) => {
        if (!data?.id) this.$router.push('/')
        this.loaders.watchData = 'data'
        this.id = data.id
        this.kinopoiskId = data?.kinopoiskId
        this.imdbId = data?.imdbId
        this.nameRu = data?.nameRu
        this.nameEn = data?.nameEn
        this.posterUrl = data?.posterUrl
        this.posterUrlPreview = data?.posterUrlPreview
        this.ratingKinopoisk = data?.ratingKinopoisk
        this.ratingKinopoiskVoteCount = data?.ratingKinopoiskVoteCount
        this.ratingFilmCritics = data?.ratingFilmCritics
        this.ratingFilmCriticsVoteCount = data?.ratingFilmCriticsVoteCount
        this.year = data?.year
        this.filmLength = data?.filmLength
        this.slogan = data?.slogan
        this.description = data?.description
        this.shortDescription = data?.shortDescription
        switch (data?.type) {
          default:
          case 'VIDEO':
            this.type = 'видео'
            break
          case 'FILM':
            this.type = 'фильм'
            break
          case 'TV_SERIES':
            this.type = 'сериал'
            break
          case 'MINI_SERIES':
            this.type = 'мини-сериал'
            break
          case 'TV_SHOW':
            this.type = 'шоу'
            break
        }
        this.ratingAgeLimits = data?.ratingAgeLimits + '+'
        this.startYear = data?.startYear
        this.endYear = data?.endYear
        this.countries = data?.countries
        this.genres = data?.genres

        document.title = `Смотреть ${this.type} ${this.nameRu} (${this.year}) - INY Media`
      })
    },
    /**
     * @todo Добавить статические рекомендации если их нет
     */
    getRecommendationsDataByKpid () {
      Api.watchRecommendationsDataByKpid(this.kinopoiskId).then(({ data }) => {
        this.loaders.watchRecommendations = 'data'
        if (data?.total && data?.total > 0) {
          this.recommendationsData = data?.items
        } else {
          this.recommendationsData = []
        }
      })
    },
    getUserRecord () {
      if (!this.kinopoiskId) return false

      const clientId = localStorage.getItem('client_id')
      Api.watchUserRecord(this.kinopoiskId, this.JWT, clientId).then(({ data }) => {
        if (!data?.status) return false
        switch (data.status) {
          case 'jwt_404':
            break
          case 'user_404':
            break
          case 'unsubscribe':
            this.isSubscribe = false
            break
          case 'subscribe':
            this.isSubscribe = true
            break
        }
      })
    },
    getPlayerSrc (playerAlias) {
      switch (playerAlias) {
        case 'svetacdn':
          return `//7043.svetacdn.in/LDSZJq4uCNvY?kp_id=${this.kinopoiskId}`
        case 'allohalive':
          return `https://dud.allohalive.com/?kp=${this.kinopoiskId}`
        case 'bazon':
          return `https://v1619875985.bazon.site/kp/${this.kinopoiskId}`
      }
    },
    /** @param {String} playerAlias */
    setPlayerSrc (playerAlias) {
      switch (playerAlias) {
        case 'svetacdn':
          localStorage.setItem('playerAlias', 'svetacdn')
          this.playerAlias = 'svetacdn'
          break
        case 'allohalive':
          localStorage.setItem('playerAlias', 'allohalive')
          this.playerAlias = 'allohalive'
          break
        case 'bazon':
          localStorage.setItem('playerAlias', 'bazon')
          this.playerAlias = 'bazon'
          break
      }
    },
    subscribeManager () {
      if (!this.kinopoiskId) return false
      this.loaders.btnSubscribe = 'loader'

      let act = ''
      if (this.isSubscribe) {
        // подписан - отпистать
        act = 'unsubscribe'
      } else {
        // отписан - подписать
        act = 'subscribe'
      }

      const clientId = localStorage.getItem('client_id')
      Api.watchSubscribeManager(act, this.kinopoiskId, this.JWT, clientId).then(({ data }) => {
        this.loaders.btnSubscribe = 'data'
        if (data?.status === 'subscribe') this.isSubscribe = true
        if (data?.status === 'unsubscribe') this.isSubscribe = false
      })
    },
    donate () {
      window.open('https://www.tinkoff.ru/rm/garanin.fedor1/Mm5jI47916', '_blank')
    }
  },
  computed: {
    JWT () {
      return this.$store.getters.JWT
    }
  },
  watch: {
    '$route.params' () {
      this.start()
    }
  }
}
</script>

<style scoped>
/* Watch::Wrapper */
.watch {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - var(--h-header));
}

.watch__info {
  margin-top: 1em;
  margin-bottom: 2em;
}
.watch__reviews {
  margin-top: 2em;
  margin-bottom: 2em;
}
.watch__facts {
  margin-top: 2em;
  margin-bottom: 2em;
}

/* Watch::Primary */
.watch__primary {
  display: block;
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
}
.watch__player-wrapper {
  border: 0;
}
.watch__player {
  background: var(--base-strong-darker);
}
.watch__title-wrapper {
  display: block;
  margin-top: 2em;
  margin-bottom: 1em;
}
.watch__title {
  display: flex;
  padding: 0em 0.3em;
}
.watch__title-name {
  text-align: left;
  display: block;
  width: 85%;
  float: left;
  font-weight: 500;
  font-size: smaller;
  color: var(--base-strong-darker);
}
.watch__title-ratingAgeLimits {
  text-align: right;
  display: block;
  width: 15%;
  float: left;
  font-weight: 500;
  font-size: smaller;
  color: var(--base-strong-darker);
}
.watch__actions {
  display: flex;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0.5em .75em;
}
watch__actions-item-choice-player {
  flex-direction: column;
}
.watch__actions-item {
  margin-top: 0.5em;
}
.watch__actions-item:last-child {
  margin-right: 0em;
}

/* Watch::Secondary */
.watch__secondary {
  display: block;
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
}

.watch__card {
  margin-bottom: 1em;
}

.watch__card:last-child {
  margin-bottom: 0em;
}

@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  /* Watch::Wrapper */
  .watch {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: calc(100vh - var(--h-header));
  }

  /* Watch::Primary */
  .watch__primary {
    display: block;
    float: left;
    width: calc(70% - 3em);
    margin-top: 1em;
    margin-left: 3em;
  }
  .watch__player-wrapper {
    border-radius: 0;
  }
  .watch__player {
    border-radius: 0;
    background-color: var(--base-strong-darker);
  }
  .watch__title-wrapper {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .watch__title {
    padding: 0em 0.3em;
  }
  .watch__title-name {
    font-size: xx-large;
  }
  .watch__title-ratingAgeLimits {
    font-size: xx-large;
  }
  .watch__actions {
    align-items: center;
    justify-content: space-between;
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .watch__actions-item {
    margin-right: 0.5em;
    margin-top: 0em;
  }

  .watch__actions-item {
  }

  /* Watch::Secondary */
  .watch__secondary {
    display: block;
    float: left;
    width: calc(30% - 6em);
    margin-top: calc(3.5em + 16px + 2px);
    margin-left: 3em;
    margin-right: 3em;
  }
  .watch__card {
    margin-bottom: 1em;
  }
  .watch__card:last-child {
    margin-bottom: 0em;
  }
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
}
</style>
