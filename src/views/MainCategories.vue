<template>
  <div class="main-categories px-0 px-lg-auto">
    <watch-carousel :carousel="carouselData" class="main-categories__carousel"></watch-carousel>
    <div class="main-categories__info">
      <h1 class="main-categories__info-title">
        Онлайн-кинотеатр INY Media: фильмы в хорошем качестве всегда приносят настоящее удовольствие
      </h1>
      <p class="main-categories__info-desc">
        <span>
          Каждый день миллионы людей ищут фильмы онлайн, и никто не хочет усложнять себе жизнь – и вы наверняка один из них!
        </span>
        <span v-show="isInfoOpen">
          А раз так, то INY Media – это именно тот ресурс, который вам нужен. От лучших кинолент в HD-качестве вас отделяет буквально один клик. Мы не просто освобождаем от необходимости идти в кинотеатр или изучать программу телепередач – у посетителей нашего ресурса гораздо больше возможностей.
        </span>
      </p>
      <app-button @click="isInfoOpen = !isInfoOpen" class="button__link main-categories__info-action">{{isInfoOpen ? 'Свернуть' : 'Развернуть'}}</app-button>
    </div>
    <app-loader :code="loader">
      <watch-collection
        v-for="collection in collectionsData"
        :key="collection.collection_id"
        :collection="collection"
        class="main-categories__collection"
      ></watch-collection>
      <template #placeholder>
        <div class="main-categories__collection-placeholder"></div>
      </template>
    </app-loader>
  </div>
</template>

<script>
import AppButton from '../components/AppButton.vue'
import AppLoader from '../components/AppLoader.vue'
import WatchCarousel from '../components/WatchCarousel.vue'
import WatchCollection from '../components/WatchCollection.vue'
import mainCarousel from '../store/mainCarousel'
import mainCategories from '../store/mainCategories'

export default {
  name: 'Main',
  components: {
    WatchCarousel,
    AppButton,
    WatchCollection,
    AppLoader
  },
  data () {
    return {
      isInfoOpen: false,
      loader: 'loader',
      carouselData: [],
      collectionsData: []
    }
  },
  mounted () {
    document.title = 'INY Media - онлайн кинотеатр'
    this.start()
  },
  methods: {
    start () {
      this.loadCarousel()
      this.loadCollection()
    },
    loadCollection () {
      this.collectionsData = mainCategories
      this.loader = 'data'
    },
    loadCarousel () {
      this.carouselData = mainCarousel
    }
  }
}
</script>

<style scoped>
.main-categories {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.main-categories__carousel {
  display: block;
  margin: 0em;
  padding: 1em 0em;
}
.main-categories__info {
  display: block;
  margin: 2em 0.25em;
  padding: 1em 0em;
}
.main-categories__info-title {
  color: var(--base-strong-darker);
  font-weight: bold;
  font-size: x-large;
}
.main-categories__info-desc {
  font-size: medium;
  margin-bottom: 0.5em;
}
.main-categories__info-action {
  margin: 0;
  padding: 0;
  border: none;
}
.main-categories__collection {
  margin-bottom: 3em;
}

@media (min-width: 992px) {
  .main-categories__carousel {
    padding: 0em;
  }
  .main-categories__info {
    margin: 3em 2.7em;
    padding: 1em 0em;
  }
  .main-categories__info {
    max-width: 60%;
  }
}
</style>
