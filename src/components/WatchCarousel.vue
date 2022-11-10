<template>
  <div class="watch-carousel">
    <div id="watch-carousel-main" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button v-for="(item, key) in carousel" :key="item.id" type="button" data-bs-target="#watch-carousel-main" :data-bs-slide-to="key" :class="key === 0 ? 'active' : ''"></button>
      </div>
      <div class="carousel-inner ratio ratio-21x9">
        <div v-for="(item, key) in carousel" :key="item.id" :class="'carousel-item ' + (key === 0 ? 'active':'')">
          <img :src="item.posterUrl" class="d-block w-100" alt="...">
          <div class="carousel-caption watch-carousel__content">
            <img v-if="item.logoUrl" :src="item.logoUrl" class="watch-carousel__title" alt="">
            <app-button @click="toWatch(item.kinopoiskId)" class="button__complement watch-carousel__action">Смотреть</app-button>
          </div>
        </div>
        <!---->
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#watch-carousel-main" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#watch-carousel-main" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
export default {
  components: { AppButton },
  name: 'WatchCarousel',
  props: {
    carousel: {
      required: true,
      type: [Array, Object]
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.IS_AUTH
    }
  },
  methods: {
    toWatch (kinopoiskId) {
      if (this.isAuth) this.$router.push({ name: 'Watch', params: { kpid: kinopoiskId } })
      else this.$router.push({ name: 'Trailer', params: { kpid: kinopoiskId } })
    }
  }
}
</script>

<style scoped>
.carousel-caption {
  right: 10%;
  left: 15%;
}
.watch-carousel {
  display: block;
}
.watch-carousel__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  max-width: 70%;
  height: 100%;
}
.watch-carousel__title {
  max-width: 50%;
  margin-bottom: 1em;
}
.watch-carousel__action {
  font-size: small;
}

@media (min-width: 992px) {
  .carousel-caption {
    right: 10%;
    left: 10%;
  }
  .watch-carousel__content {
    max-width: 50%;
  }
  .watch-carousel__action {
    font-size: medium;
    z-index: 5;
  }
}
</style>
