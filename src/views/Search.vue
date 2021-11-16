<template>
  <div class='container'>
    <div class="search">
      <div class="search__title-wrapper">
        <h1 class="search__title">Поиск</h1>
      </div>
      <div class="search__tools">
        <Multiselect
          class="search__tools-item"
          v-model="select.type"
          @change="changed()"
          mode="single"
          :options="store.types"
          valueProp="type"
          trackBy="label"
          label="label"
          :placeholder="'Тип'"
          :searchable="false"
        ></Multiselect>
        <Multiselect
          class="search__tools-item"
          v-model="select.order"
          @change="changed()"
          mode="single"
          :options="store.orders"
          valueProp="type"
          trackBy="label"
          :placeholder="'Сортировка'"
          :searchable="false"
        ></Multiselect>
        <Multiselect
          class="search__tools-item"
          v-model="select.year"
          @change="changed()"
          mode="single"
          :options="store.years"
          :placeholder="'Год'"
          :searchable="false"
        ></Multiselect>
        <Multiselect
          class="search__tools-item"
          v-model="select.country"
          @change="changed()"
          mode="multiple"
          :options="store.countries"
          valueProp="id"
          trackBy="country"
          label="country"
          :placeholder="'Страна'"
          :searchable="true"
          noResultsText="Такой страны нет"
        ></Multiselect>
        <Multiselect
          class="search__tools-item"
          v-model="select.genre"
          @change="changed()"
          mode="multiple"
          :options="store.genres"
          valueProp="id"
          trackBy="genre"
          label="genre"
          :placeholder="'Жанр'"
          :searchable="true"
          noResultsText="Такого жанра нет"
        ></Multiselect>
      </div>
      <app-loader class="d-block" :height="'calc(90vh - var(--h-header) - 306px)'" :code="loader">
        <div class="search__content-exists">
          <watch-card
            v-for="item in searchData"
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
      </app-loader>
      <div v-if="searchData.length <= 0" class="search__content-empty">
        <div class="search__empty-title">Ничего не нашлось</div>
      </div>
      <div v-if="store.pages.length > 0" class="search__pages">
        <span class="search__page-title">Страницы:</span>
        <span
          v-for="page in store.pages"
          :key="page + Date.now()"
          :class="(page === select.page ? 'search__page-item_active':'')"
          @click="selectPage(page)"
          class="search__page-item"
        >{{page}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import Api from '../api'
import AppLoader from '../components/AppLoader.vue'
import WatchCard from '../components/WatchCard.vue'
import countries from '../store/countries'
import genres from '../store/genres'

export default {
  components: {
    AppLoader,
    WatchCard,
    Multiselect
  },
  name: 'Search',
  data () {
    return {
      searchData: [],
      loader: 'loader',
      select: {
        country: [],
        genre: [],
        order: 'RATING',
        type: 'ALL',
        ratingFrom: 0,
        ratingTo: 10,
        year: 0,
        page: 1
      },
      store: {
        countries: countries,
        genres: genres,
        orders: [
          {
            type: 'RATING',
            label: 'По рейтингу'
          },
          {
            type: 'NUM_VOTE',
            label: 'По кол-ву голосов'
          },
          {
            type: 'YEAR',
            label: 'По дате выхода'
          }
        ],
        // RATING, NUM_VOTE, YEAR
        types: [
          {
            type: 'ALL',
            label: 'Все'
          },
          {
            type: 'FILM',
            label: 'Фильмы'
          },
          {
            type: 'TV_SHOW',
            label: 'Сериалы'
          }
        ],
        // 0
        ratingFrom: 0,
        // 10
        ratingTo: 10,
        years: [],
        // page
        pages: [1]
      }
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      document.title = 'Поиск по фильтрам'
      this.fillYearsFields()
      this.select.page = this.store.pages[0]
      this.getSearchData()
    },
    fillYearsFields () {
      const startYear = (new Date()).getFullYear()
      const endYear = 1888
      const years = []

      for (let i = startYear; i >= endYear; i--) {
        years.push(i)
      }

      this.store.years = years
    },
    changed () {
      setTimeout(() => {
        setTimeout(() => {
          this.getSearchData()
        }, 400)
      }, 100)
    },
    selectPage (page) {
      if (this.select.page === page) return false
      this.select.page = page
      this.getSearchData()
    },
    getSearchData () {
      this.loader = 'loader'

      let country = this.select.country.join(',')
      if (country.length === 0) country = false

      let genre = this.select.genre.join(',')
      if (genre.length === 0) genre = false

      let order = this.select.order
      if (order.length === 0) order = 'RATING'

      let type = this.select.type
      if (type.length === 0) type = 'ALL'

      let year = this.select.year
      if (year === 0) year = false

      let page = this.select.page.toString()
      if (page.length === 0) page = 1

      Api.watchSearchByFilters(country, genre, order, type, year, page).then(({ data }) => {
        this.parseData(data)
      })
    },
    parseData (data) {
      this.loader = 'data'

      if (data?.code === 200) {
        this.select.page = Number(data.page)
        this.store.pages = []
        const pages = []
        for (let i = 1; i <= data.pages; i++) {
          pages.push(i)
        }
        this.store.pages = pages
        this.searchData = data.items
      } else {
        this.searchData = []
      }
    }
  }
}
</script>

<style>
.search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.search__title-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.search__title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
.search__tools {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  width: 100%;
}
.search__tools-item {
  width: 100%;
}
.search__content-exists {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em 0.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.search__content-empty {
  width: 100%;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
}
.search__empty-title {
  color: var(--base-strong-darker);
  font-size: xx-large;
}
.search__pages {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5em;
  margin-bottom: 3em;
  width: 100%;
}
.search__page-title {
  color: var(--base-strong-darker);
  padding: 0em 0.8em;
}
.search__page-item {
  cursor: pointer;
  color: var(--base-strong);
  padding: 0em 0.8em;
}
.search__page-item_active {
  color: var(--base-strong);
  border: 1px var(--base-strong) solid;
  border-radius: 25%;
  padding: 0em 0.8em;
}

@media (min-width: 576px) {
  .search__title-wrapper, .search__content-exists, .search__content-empty {
    min-width: 500px;
  }
  .search__content-exists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em 0.5em;
  }
}

/* Medium devices (tablets, 768px and up) 3 */
@media (min-width: 768px) {
  .search__title-wrapper, .search__content-exists, .search__content-empty {
    min-width: 590px;
  }
  .search__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
  }

  .search__tools {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em 0.5em;
    width: 100%;
  }
  .search__tools-item {
    width: 100%;
  }
}

/* Large devices (desktops, 992px and up) 4 */
@media (min-width: 992px) {
  .search__title-wrapper, .search__content-empty {
    border: 1px var(--base-weak-darker) solid;
    border-radius: 0.5em;
  }
  .search__title-wrapper, .search__content-exists, .search__content-empty {
    min-width: 900px;
  }
  .search__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }

  .search__tools {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
    width: 100%;
  }
  .search__tools-item {
    width: 100%;
  }
}

/* X-Large devices (large desktops, 1200px and up) 5 */
@media (min-width: 1200px) {
  .search__title-wrapper, .search__content-exists, .search__content-empty {
    min-width: 1100px;
  }
  .search__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }
  .search__tools {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 0em 1em;
    width: 100%;
  }
  .search__tools-item {
    width: 100%;
  }
}

/* XX-Large devices (larger desktops, 1400px and up) 6 */
@media (min-width: 1400px) {
  .search__title-wrapper, .search__content-exists, .search__content-empty {
    min-width: 1300px;
  }
  .search__content-exists {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5em 0.5em;
  }

  .search__tools {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 0em 1.5em;
    width: 100%;
  }
  .search__tools-item {
    width: 100%;
  }
}
</style>

<style src="../../node_modules/@vueform/multiselect/themes/default.css"></style>
