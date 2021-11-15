<template>
  <div class="watch-facts">
    <app-loader :code="loader">
      <div class="watch-facts__title-wrapper">
        <h3 class="watch-facts__title">Интересные факты</h3>
      </div>
      <div v-if="isFactsData" class="watch-facts__content">
        <span v-for="fact in factsData" :key="fact.id" class="watch-facts__item">
          <strong>#{{fact.id + 1}}</strong>
          <span class="js__name-link" v-html="fact.text"></span>
        </span>
      </div>
      <div v-else class="watch-facts__placeholder">
        Фактов еще нет
      </div>
    </app-loader>
  </div>
</template>

<script>
import Api from '../api'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'WatchFacts',
  components: {
    AppLoader
  },
  props: {
    kinopoiskId: {
      required: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loader: 'loader',
      isFactsData: false,
      factsData: []
    }
  },
  mounted () {
    this.getFacts()
  },
  methods: {
    start () {
      if (!this.kinopoiskId) return false

      this.getFacts()
    },
    getFacts () {
      if (!this.kinopoiskId) return false

      Api.watchGetFacts(this.kinopoiskId).then(({ data }) => {
        this.loader = 'data'
        if (data?.code === 200) {
          this.factsData = data.content
          this.isFactsData = true
          this.listenerLink()
        }
      })
    },
    listenerLink () {
      setTimeout(() => {
        const $links = document.querySelectorAll('.js__name-link > [href^="/name/"]')
        const fnClick = (event) => {
          event.preventDefault()
          const link = event.srcElement.href
          window.open(link, '_blank')
        }
        /**
         * @param {HTMLLinkElement} e
         */
        $links.forEach(e => {
          e.onclick = fnClick
        })
      }, 100)
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
/* watch-facts */
.watch-facts {
  display: block;
  overflow: auto;
  max-height: calc(100vh - var(--h-header) * 2);
}
.watch-facts__placeholder {
  display: block;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: larger;
}
.watch-facts__title-wrapper {
  display: block;
  text-align: center;
  margin: 1rem 0.5em;
}
.watch-facts__title {
  color: var(--base-strong-darker);
  font-weight: 500;
  font-size: xx-large;
  margin-bottom: 0;
}
.watch-facts__content {
  width: 100%;
  display: block;
}
.watch-facts__item {
  width: 100%;
  display: block;
  padding: 1em 1em;
}

.watch-facts__item > strong {
  padding-right: 0.5em;
}

@media (min-width: 992px) {
  .watch-facts {
    display: block;
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .watch-facts__title-wrapper {
  }
  .watch-facts__title {
  }
  .watch-facts__content {
  }
  .watch-facts__item {
    padding: 1.5em;
  }
}
</style>
