<template>
  <div class="watch-info">
    <h3 class="watch-info__title">Информация</h3>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Рейтинг</span>
      <span class="watch-info__item-value">{{ratingKinopoisk}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Проголосовавших</span>
      <span class="watch-info__item-value">{{ratingKinopoiskVoteCount}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Слоган</span>
      <span class="watch-info__item-value">{{slogan}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Краткое описание</span>
      <span class="watch-info__item-value">{{shortDescription}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Год</span>
      <span class="watch-info__item-value">{{year}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Продолжительность</span>
      <span class="watch-info__item-value">{{filmLength}} минут</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Жанры</span>
      <span class="watch-info__item-value">{{getGenres()}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Страна</span>
      <span class="watch-info__item-value">{{getCountries()}}</span>
    </div>
    <div class="watch-info__item">
      <span class="watch-info__item-key">Описание</span>
      <span class="watch-info__item-value">{{description}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatchInfo',
  props: {
    slogan: {
      required: false,
      type: String,
      default: ''
    },
    shortDescription: {
      required: false,
      type: String,
      default: ''
    },
    description: {
      required: false,
      type: String,
      default: ''
    },
    year: {
      required: false,
      type: String,
      default: ''
    },
    filmLength: {
      required: false,
      type: String,
      default: ''
    },
    genres: {
      required: false,
      type: String,
      default: ''
    },
    countries: {
      required: false,
      type: String,
      default: ''
    },
    startYear: {
      required: false,
      type: String,
      default: ''
    },
    endYear: {
      required: false,
      type: String,
      default: ''
    },
    ratingKinopoisk: {
      required: false,
      type: String,
      default: ''
    },
    ratingKinopoiskVoteCount: {
      required: false,
      type: String,
      default: ''
    }
  },
  methods: {
    getGenresTitle () {

    },
    getGenres () {
      const genres = this.genres.split(',')
      return genres.join(', ')
    },
    getCountriesTitle () {
    },
    getCountries () {
      const countries = this.countries.split(',')
      return countries.join(', ')
    }
  }
}
</script>

<style scoped>
/* watch-info */
.watch-info {
  display: block;
}
.watch-info__title {
  color: var(--base-strong-darker);
  font-weight: 500;
  font-size: xx-large;
  margin: 0.5rem;
  text-align: center;
}
.watch-info__item {
  width: 100%;
  display: block;
  padding-top: 1em;
  padding-bottom: 1em;
}
.watch-info__item:nth-child(even) {
  background-color: var(--base-weak);
}
.watch-info__item-key {
  display: block;
  min-width: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  font-weight: 700;
}
.watch-info__item-value {
  display: block;
  min-width: 100%;
  margin-top: 0.5em;
  margin-bottom: 0.75em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

@media (min-width: 992px) {
  .watch-info {
    display: block;
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .watch-info__title {
    color: var(--base-strong-darker);
    text-align: left;
  }
  .watch-info__item {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  .watch-info__item-key {
    display: inline;
    float: left;
    min-width: 25%;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .watch-info__item-value {
    display: inline;
    float: left;
    min-width: 75%;
    padding-left: 0.5em;
    padding-right: 0.5em;
    margin-top: 0em;
  margin-bottom: 0em;
  }
}
</style>
