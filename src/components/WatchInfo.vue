<template>
  <div class="watch-info">
    <h3 class="watch-info__title">Информация</h3>
    <div v-if="ratingKinopoisk" class="watch-info__item">
      <span class="watch-info__item-key">Рейтинг</span>
      <span class="watch-info__item-value">{{ratingKinopoisk}}</span>
    </div>
    <div v-if="ratingKinopoiskVoteCount" class="watch-info__item">
      <span class="watch-info__item-key">Проголосовавших</span>
      <span class="watch-info__item-value">{{ratingKinopoiskVoteCount}}</span>
    </div>
    <div v-if="slogan" class="watch-info__item">
      <span class="watch-info__item-key">Слоган</span>
      <span class="watch-info__item-value">{{slogan}}</span>
    </div>
    <div v-if="shortDescription" class="watch-info__item">
      <span class="watch-info__item-key">Краткое описание</span>
      <span class="watch-info__item-value">{{shortDescription}}</span>
    </div>
    <div v-if="year" class="watch-info__item">
      <span class="watch-info__item-key">Год</span>
      <span class="watch-info__item-value">{{year}}</span>
    </div>
    <div v-if="filmLength" class="watch-info__item">
      <span class="watch-info__item-key">Продолжительность</span>
      <span class="watch-info__item-value">{{filmLength}} мин.</span>
    </div>
    <div v-if="getGenres()" class="watch-info__item">
      <span class="watch-info__item-key">Жанры</span>
      <span class="watch-info__item-value">
        <template v-for="data in getGenres()" :key="data.id">
          <router-link class="watch-info__item-link" :to="'/search-by-filter?genres=' + data.id">{{data.genre}}</router-link>
        </template>
      </span>
    </div>
    <div v-if="getCountries()" class="watch-info__item">
      <span class="watch-info__item-key">Страна</span>
      <span class="watch-info__item-value">
        <template v-for="data in getCountries()" :key="data.id">
          <router-link class="watch-info__item-link" :to="'/search-by-filter?countries=' + data.id">{{data.country}}</router-link>
        </template>
      </span>
    </div>
    <div v-if="description" class="watch-info__item">
      <span class="watch-info__item-key">Описание</span>
      <span class="watch-info__item-value">{{description}}</span>
    </div>
  </div>
</template>

<script>
import countriesObject from '../store/countries'
import genresObject from '../store/genres'

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
    getGenres () {
      const genres = this.genres.split(',')
      const genresArrayWithId = []
      genres.forEach(genreItem => {
        const filteredGenreObject = genresObject.find(genreObject => genreObject.genre === genreItem)
        if (filteredGenreObject.id) genresArrayWithId.push(filteredGenreObject)
      })

      return genresArrayWithId
    },
    getCountries () {
      const countries = this.countries.split(',')
      const countriesArrayWithId = []
      countries.forEach(countryItem => {
        const filteredCountryObject = countriesObject.find(countryObject => countryObject.country === countryItem)
        if (filteredCountryObject.id) countriesArrayWithId.push(filteredCountryObject)
      })

      return countriesArrayWithId
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
  margin: 1rem 0.5em;
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

.watch-info__item-link {
  margin-left: 0.5em;
  margin-right: 0.5em;
  color: var(--faint-weak-darker);
  text-decoration: underline;
}

.watch-info__item-link:first-child {
  margin-left: 0;
}

.watch-info__item-link:last-child {
  margin-right: 0;
}

@media (min-width: 992px) {
  .watch-info {
    display: block;
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .watch-info__title {
    color: var(--base-strong-darker);
    text-align: center;
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
