<template>
  <div class="main-categories container px-0 px-lg-auto">
    <watch-carousel class="main-categories__carousel"></watch-carousel>
    <div class="main-categories__info">
      <h1 class="main-categories__info-title"></h1>
      <p class="main-categories__info-desc"></p>
      <app-button class="button__link main-categories__info-action">Развернуть</app-button>
    </div>
    <app-loader :code="loader">
      <watch-collection v-for="collection in collectionsData" :key="collection.collection_id" class="main-categories__collection"></watch-collection>
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
      loader: 'loader',
      carouselData: [],
      collectionsData: []
    }
  },
  mounted () {
    document.title = 'INY Media - онлайн кинотеатр'
  }
}
</script>

<style scoped>
.main-categories {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
