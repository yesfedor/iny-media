<template>
  <div class="watch-collection">
    <div class="watch-collection__header">
      <span class="watch-collection__title">{{collection.collection_title}} <i class="fal fa-angle-right watch-collection__icon"></i></span>
      <span class="watch-collection__subtitle">{{collection.collection_subtitle}}</span>
    </div>
    <div class="watch-collection__wrapper">
      <div @click="scroll('prev')" class="watch-collection__control">
        <i class="fal fa-caret-left fa-2x"></i>
      </div>
      <div ref="content" class="watch-collection__content">
        <watch-card
          v-for="item in collection.items"
          :key="item.kinopoiskId"
          :id="item.id"
          :kinopoiskId="item.kinopoiskId"
          :ratingKinopoisk="item.ratingKinopoisk"
          :nameRu="item.nameRu"
          :posterUrl="item.posterUrl"
          displayOption="collection"
          class="watch-collection__card"
        ></watch-card>
      </div>
      <div @click="scroll('next')" class="watch-collection__control">
        <i class="fal fa-caret-right fa-2x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import WatchCard from './WatchCard.vue'
export default {
  components: {
    WatchCard
  },
  name: 'WatchCollection',
  props: {
    collection: {
      required: true,
      type: Object
    }
  },
  methods: {
    scroll (direction) {
      const scrollX = this.$refs.content.scrollLeft
      const offset = this.$refs.content.scrollWidth / 1.2

      if (direction === 'prev') {
        this.$refs.content.scroll(scrollX - offset, 0)
      }
      if (direction === 'next') {
        this.$refs.content.scroll(scrollX + offset, 0)
      }
    }
  }
}
</script>

<style scoped>
.watch-collection {
  display: block;
}
.watch-collection__header {
  padding: 0em 0.25em;
}
.watch-collection__title {
  display: block;
  font-size: large;
  font-weight: bold;
  color: var(--base-strong-darker);
}
.watch-collection__icon {
  font-size: large;
}
.watch-collection__subtitle {
  margin-top: 0.25em;
  display: block;
  font-size: small;
  font-weight: 300;
  color: var(--base-strong-lighter);
}
.watch-collection__wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}
.watch-collection__control {
  display: none;
  padding: 1em;
  cursor: pointer;
}
.watch-collection__content {
  padding: 1.5em 0em;
  display: flex;
  height: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: auto;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  scroll-behavior: smooth;
}
.watch-collection__content::-webkit-scrollbar {
  display: none;
}
.watch-collection__card {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  flex: 0 0 auto;
  width: 70vw;
}

.watch-collection__card:first-child {
  scroll-snap-align: start;
}

.watch-collection__card:last-child {
  scroll-snap-align: end;
}

@media (min-width: 576px) {
  .watch-collection__card {
    width: 40vw;
  }
}

@media (min-width: 768px) {
  .watch-collection__card {
    width: 30vw;
  }
}

@media (min-width: 992px) {
  .watch-collection__header {
    padding-left: 44px;
  }
  .watch-collection__title {
    font-size: x-large;
  }
  .watch-collection__icon {
    font-size: x-large;
  }
  .watch-collection__subtitle {
    font-size: medium;
    font-weight: 300;
  }
  .watch-collection__control {
    display: block;
  }
  .watch-collection__card {
    width: 25vw;
  }
}

@media (min-width: 1200px) {
  .watch-collection__card {
    width: 20vw;
  }
}

@media (min-width: 1400px) {
  .watch-collection__card {
    width: 15vw;
  }
}
</style>
