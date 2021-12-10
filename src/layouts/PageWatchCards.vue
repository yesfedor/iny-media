<template>
  <div class="container px-0 px-lg-auto">
    <div class="layout">
      <slot name="afterTitle"></slot>
      <div class="layout__title-wrapper">
        <h1 class="layout__title">{{layoutTitle}}</h1>
      </div>
      <slot name="beforeTitle"></slot>
      <app-loader :height="'calc(50vh - var(--h-header))'" :code="loader">
        <div class="layout__content-exists">
          <watch-card
            v-for="item in layoutData"
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
        <template #placeholder>
          <div class="layout__content-empty">
            <h3 class="layout__empty-title">{{layoutEmpty}}</h3>
          </div>
        </template>
      </app-loader>
    </div>
  </div>
</template>

<script>
import WatchCard from '../components/WatchCard.vue'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'PageWatchCards',
  props: {
    documentTitle: {
      required: true,
      type: String
    },
    layoutTitle: {
      required: true,
      type: String
    },
    layoutData: {
      required: true,
      type: Array
    },
    layoutEmpty: {
      required: true,
      type: String
    },
    loader: {
      required: true,
      type: String
    }
  },
  components: {
    WatchCard,
    AppLoader
  },
  mounted () {
    document.title = this.documentTitle
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.layout__title-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.layout__title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
/* 1 */
.layout__content-exists {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.layout__content-empty {
  width: 100%;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.layout__empty-title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}

/* 2 */
@media (min-width: 576px) {
  .layout__title-wrapper, .layout__content-exists, .layout__content-empty {
    min-width: 500px;
  }
  .layout__content-exists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Medium devices (tablets, 768px and up) 3 */
@media (min-width: 768px) {
  .layout__title-wrapper, .layout__content-exists, .layout__content-empty {
    min-width: 590px;
  }
  .layout__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Large devices (desktops, 992px and up) 4 */
@media (min-width: 992px) {
  .layout__title-wrapper, .layout__content-empty {
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .layout__title-wrapper, .layout__content-exists, .layout__content-empty {
    min-width: 900px;
  }
  .layout__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* X-Large devices (large desktops, 1200px and up) 5 */
@media (min-width: 1200px) {
  .layout__title-wrapper, .layout__content-exists, .layout__content-empty {
    min-width: 1100px;
  }
  .layout__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) 6 */
@media (min-width: 1400px) {
  .layout__title-wrapper, .layout__content-exists, .layout__content-empty {
    min-width: 1300px;
  }
  .layout__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}
</style>
