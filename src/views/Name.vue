<template>
  <div class="container px-0 px-lg-auto">
    <app-loader :height="'calc(100vh - var(--h-header))'" :code="loader">
      <div class="name">
        <div class="name__title-wrapper">
          <h1 class="name__title">{{title}}</h1>
        </div>
        <div v-if="nameData.length > 0" class="name__content-exists">
          <watch-card
            v-for="item in nameData"
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
        <div v-else class="name__content-empty">
          <h3 class="name__empty-title">Тренды пустуют</h3>
        </div>
      </div>
    </app-loader>
  </div>
</template>

<script>
import Api from '../api'
import WatchCard from '../components/WatchCard.vue'
import AppLoader from '../components/AppLoader.vue'

export default {
  name: 'Name',
  components: {
    WatchCard,
    AppLoader
  },
  data () {
    return {
      loader: 'loader',
      nameData: [],
      title: ''
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      document.title = 'Персонал'
      this.loadName()
    },
    loadName () {
      Api.watchGetNameByStaffId(this.$route.params.staff).then(({ data }) => {
        this.loader = 'data'
        if (data?.code === 200) {
          this.title = data?.title
          this.nameData = data?.items
        } else {
          /** @todo что тут делать ??? */
        }
      })
    }
  }
}
</script>

<style scoped>
.name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.name__title-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.name__title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
/* 1 */
.name__content-exists {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.name__content-empty {
  width: 100%;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.name__empty-title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}

/* 2 */
@media (min-width: 576px) {
  .name__title-wrapper, .name__content-exists, .name__content-empty {
    min-width: 500px;
  }
  .name__content-exists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Medium devices (tablets, 768px and up) 3 */
@media (min-width: 768px) {
  .name__title-wrapper, .name__content-exists, .name__content-empty {
    min-width: 590px;
  }
  .name__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Large devices (desktops, 992px and up) 4 */
@media (min-width: 992px) {
  .name__title-wrapper, .name__content-empty {
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .name__title-wrapper, .name__content-exists, .name__content-empty {
    min-width: 900px;
  }
  .name__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* X-Large devices (large desktops, 1200px and up) 5 */
@media (min-width: 1200px) {
  .name__title-wrapper, .name__content-exists, .name__content-empty {
    min-width: 1100px;
  }
  .name__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) 6 */
@media (min-width: 1400px) {
  .name__title-wrapper, .name__content-exists, .name__content-empty {
    min-width: 1300px;
  }
  .name__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
}
</style>
