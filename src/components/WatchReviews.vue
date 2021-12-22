<template>
  <div class="watch-reviews">
    <app-loader :code="loader">
      <div class="watch-reviews__title-wrapper">
        <h3 class="watch-reviews__title">Резенции на {{type}}</h3>
      </div>
      <div v-if="reviewsData.POSITIVE.length > 0" class="watch-reviews__content watch-reviews__content_positive">
        <div v-for="card in reviewsData.POSITIVE" :key="card.reviewTitle" class="watch-reviews__item watch-reviews__item_positive">
          <h4 class="watch-reviews__item-title">{{(card.reviewTitle ? card.reviewTitle : 'Позитивный')}}</h4>
          <span class="watch-reviews__item-content">{{card.reviewDescription}}</span>
        </div>
      </div>
      <div v-if="reviewsData.NEGATIVE.length > 0" class="watch-reviews__content watch-reviews__content_negative">
        <div v-for="card in reviewsData.NEGATIVE" :key="card.reviewTitle" class="watch-reviews__item watch-reviews__item_negative">
          <h4 class="watch-reviews__item-title">{{(card.reviewTitle ? card.reviewTitle : 'Негативный')}}</h4>
          <span class="watch-reviews__item-content">{{card.reviewDescription}}</span>
        </div>
      </div>
      <div v-if="reviewsData.NEUTRAL.length > 0" class="watch-reviews__content">
        <div v-for="card in reviewsData.NEUTRAL" :key="card.reviewTitle" class="watch-reviews__item">
          <h4 class="watch-reviews__item-title">{{(card.reviewTitle ? card.reviewTitle : 'Нейтральный')}}</h4>
          <span class="watch-reviews__item-content">{{card.reviewDescription}}</span>
        </div>
      </div>
      <div v-if="reviewsData.UNKNOWN.length > 0" class="watch-reviews__content">
        <div v-for="card in reviewsData.UNKNOWN" :key="card.reviewTitle" class="watch-reviews__item">
          <h4 class="watch-reviews__item-title">{{(card.reviewTitle ? card.reviewTitle : 'Нейтральный')}}</h4>
          <span class="watch-reviews__item-content">{{card.reviewDescription}}</span>
        </div>
      </div>
      <div v-if="!isReviewsData" class="watch-reviews__placeholder">
        Рецензий еще нет
      </div>
    </app-loader>
  </div>
</template>

<script>
import Api from '../api'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'WatchReviews',
  components: {
    AppLoader
  },
  props: {
    type: {
      required: true,
      type: String,
      default: ''
    },
    kinopoiskId: {
      required: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loader: 'loader',
      isReviewsData: false,
      reviewsData: {
        POSITIVE: [],
        NEGATIVE: [],
        NEUTRAL: [],
        UNKNOWN: []
      }
    }
  },
  mounted () {
    this.getReviews()
  },
  methods: {
    start () {
      if (!this.kinopoiskId) return false

      this.getReviews()
    },
    getReviews () {
      if (!this.kinopoiskId) return false

      Api.watchGetReviewsByKpid(this.kinopoiskId).then(({ data }) => {
        this.loader = 'data'

        if (data?.code === 200) {
          this.reviewsData = data.items
          this.isReviewsData = true
        }
      })
    }
  },
  watch: {
    kinopoiskId () {
      this.start()
    }
  }
}
</script>

<style scoped>
/* watch-reviews */
.watch-reviews {
  display: block;
  overflow: auto;
  max-height: calc(90vh - var(--h-header) * 2);
}
.watch-reviews__title-wrapper {
  display: block;
  text-align: center;
  margin: 1rem 0.5em;
}
.watch-reviews__title {
  color: var(--base-strong-darker);
  font-weight: 500;
  font-size: xx-large;
  margin-bottom: 0;
}
.watch-reviews__content {
  width: 100%;
  display: block;
}

.watch-reviews__content:first-child {
  padding-top: 0em;
}

.watch-reviews__item {
  width: 100%;
  display: block;
  padding: 1em 1em;
}

.watch-reviews__item_positive:nth-child(odd) {
  background-color: var(--base-weak);
}

.watch-reviews__item_positive > .watch-reviews__item-title {
  color: var(--success-text);
}

.watch-reviews__item-title {
  font-size: x-large;
  text-align: center;
  margin-bottom: 0.5em;
  color: var(--base-text);
}

.watch-reviews__item_negative:nth-child(even) {
  background-color: var(--base-weak);
}

.watch-reviews__item_negative > .watch-reviews__item-title {
  color: var(--critic-text);
}
.watch-reviews__placeholder {
  display: block;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: larger;
}

@media (min-width: 992px) {
  .watch-reviews {
    display: block;
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .watch-reviews__title {
    color: var(--base-strong-darker);
  }
  .watch-reviews__item {
    padding: 1.5em;
  }
}
</style>
