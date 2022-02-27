<template>
  <nav
    class="navbar navbar-main theme navbar-expand-lg sticky-top py-0"
    :class="'navbar_page_' + ($route.name + '').toLocaleLowerCase()"
  >
    <div class="container-fluid">
      <span v-show="!isSearchActive || $position.breakpoint >= 4" class="navbar-icon w-25 text-start">
        <i @click="toggleAside()" class="fal fa-bars theme theme__icon fa-lg"></i>
        <router-link :to="{ name: 'Main' }" class="navbar-brand navbar-brand_start theme mx-auto d-none d-lg-inline">
          <strong class="app__brand">INY Media</strong>
        </router-link>
      </span>
      <div :class="isSearchActive && $position.breakpoint < 4 ? 'w-100' : 'w-50'" class="input-group input-group-sm theme mx-auto navbar__search mx-auto">
        <input
          type="text"
          class="form-control navbar__search-input"
          placeholder="Поиск"
          v-model="searchModel"
          @input="searchModelDebounced"
          @keypress.enter="goToSearchPage()"
          @focus="searchFocus"
          @blur="searchBlur"
        >
        <span @click="goToSearchPage()" class="input-group-text navbar__search-label fal fa-search p-2 m-auto"></span>
        <ul
          :class="searchHints.length && isSearchActive ? 'navbar__search-hints_active' : ''"
          class="navbar__search-hints list-group"
        >
          <router-link
            v-for="hint in searchHints"
            :key="hint.id || hint.kinopoiskId"
            :to="getRouteByHint(hint)"
            :class="'navbar__search-hint_type_' + hint.type"
            class="list-group-item navbar__search-hint"
            @click.prevent="goToSearchPageBySymlink(hint.query)"
          >
            <span class="navbar__search-hint-text">{{ getHintText(hint) }}</span>
            <span v-if="hint.type === 'symlink'" @click.stop.prevent="watchHistoryDelete(hint.id)" class="navbar__search-hint-action">Удалить</span>
          </router-link>
        </ul>
      </div>
      <span v-show="!isSearchActive  || $position.breakpoint >= 4" class="navbar-icon w-25 text-end user">
        <div v-if="isAuth" class="dropdown dropstart user__droppos user__wrapper">
          <button class="btn btn-link dropdown-toggle user__menu-button m-0 p-0" type="button" id="navbar-user-menu" data-bs-toggle="dropdown" aria-expanded="false">
            <span>
              <span class="user__name d-none d-lg-inline theme">{{user.name || 'Войти'}}</span>
              <i :class="getAccountIcon()" class="user__icon fal d-inline theme fa-lg"></i>
            </span>
          </button>
          <ul class="dropdown-menu user__menu-content shadow" aria-labelledby="navbar-user-menu">
            <li class="user__menu-item-wrapper">
              <div class="user__menu-theme">
                <span class="user__menu-item">Тема</span>
                <theme-toggler-icon class="theme theme-toggler-icon"></theme-toggler-icon>
              </div>
            </li>
            <li class="user__menu-item-wrapper">
              <router-link class="dropdown-item user__menu-item" :to="{ name: 'Profile' }">Профиль</router-link>
            </li>
            <li class="user__menu-item-wrapper">
              <button  @click="$store.commit('LOGOUT')"  class="dropdown-item user__menu-item" type="button">Выйти</button>
            </li>
          </ul>
        </div>
        <div v-else class="user__wrapper">
          <span @click="goAccount()">
            <span class="user__name d-none d-lg-inline theme">{{user.name || 'Войти'}}</span>
            <i :class="getAccountIcon()" class="user__icon fal d-inline theme fa-lg"></i>
          </span>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import Api from '../api'
import _ from 'lodash'

export default {
  name: 'TheHeader',
  data () {
    return {
      isSearchActive: false,
      searchModel: '',
      isMenuShow: false,
      searchHints: [],
      searchModelDebouncedTime: 0
    }
  },
  created () {
    this.searchModelDebounced = _.throttle(() => {
      if (this.searchModel.length < 3) {
        this.setWatchFastSearchHistory()
        return false
      }
      const setData = (data) => {
        if (this.searchModelDebouncedTime > data.time) return false
        if (!data.count) return false
        const preparedSymlink = []
        const preparedWatch = []

        data.symlink.forEach(symlink => {
          preparedSymlink.push({
            ...symlink,
            type: 'symlink'
          })
        })

        data.watch.forEach(watch => {
          preparedWatch.push({
            kinopoiskId: watch.kinopoiskId,
            nameRu: watch.nameRu,
            year: watch.year,
            type: 'watch'
          })
        })

        this.searchHints = [
          ...preparedSymlink,
          ...preparedWatch
        ]
      }
      if (this.isAuth) {
        const jwt = this.$store.getters.JWT
        const clientId = localStorage.getItem('client_id')
        Api.watchFastSearchHistoryByKeyword(this.searchModel, jwt, clientId).then(response => setData(response.data))
      } else {
        Api.watchFastSearchHistoryByKeyword(this.searchModel).then(response => setData(response.data))
      }
    }, 400)
  },
  mounted () {
    setTimeout(() => {
      this.searchModel = this.$route.params.query || ''
    }, 500)
  },
  methods: {
    watchHistoryDelete (id) {
      if (!this.isAuth) return false
      const jwt = this.$store.getters.JWT
      const clientId = localStorage.getItem('client_id')
      Api.watchFastSearchHistoryDelete(id, jwt, clientId).then(() => {
        const searchHints = []
        this.searchHints.forEach(hint => {
          if (hint?.id !== id) searchHints.push(hint)
        })
        this.searchHints = searchHints
        this.searchFocus()
        setTimeout(() => {
          this.searchFocus()
        }, 100)
      })
    },
    getHintText (hint) {
      if (hint.type === 'symlink') return hint.query
      if (hint.type === 'watch') return `${hint.nameRu} (${hint.year})`
    },
    getRouteByHint (hint) {
      if (hint.type === 'symlink') return { name: 'SearchBox', params: { query: hint.query } }
      if (hint.type === 'watch') return { name: 'Watch', params: { kpid: hint.kinopoiskId } }
    },
    setWatchFastSearchHistory () {
      if (!this.isAuth) return false
      const jwt = this.$store.getters.JWT
      const clientId = localStorage.getItem('client_id')
      Api.watchFastSearchHistory(jwt, clientId).then(response => {
        const data = response.data
        const queries = []
        response.data.queries.forEach(query => {
          queries.push({
            ...query,
            type: 'symlink'
          })
        })
        if (data?.count) {
          this.searchHints = queries
        }
      })
    },
    searchFocus () {
      this.setWatchFastSearchHistory()
      setTimeout(() => {
        this.isSearchActive = true
      }, 200)
    },
    searchBlur () {
      setTimeout(() => {
        this.isSearchActive = false
      }, 200)
    },
    toggleAside () {
      // main | zip
      const asideState = localStorage.getItem('asideState') || 'main'
      const event = new CustomEvent('asideState')
      if (asideState === 'main') localStorage.setItem('asideState', 'zip')
      if (asideState === 'zip') localStorage.setItem('asideState', 'main')
      window.dispatchEvent(event)
    },
    goToSearchPageBySymlink (symlink) {
      this.searchModel = symlink
      this.goToSearchPage()
    },
    goToSearchPage () {
      if (this.searchModel === '') return false
      this.searchBlur()
      this.$router.push({ name: 'SearchBox', params: { query: this.searchModel } })
    },
    getAccountIcon () {
      if (this.isAuth) return 'fa-user-alt'
      else return 'fa-sign-in-alt'
    },
    goAccount () {
      if (this.isAuth) this.$router.push({ name: 'Profile' })
      else this.$router.push({ name: 'Auth' })
    }
  },
  computed: {
    user () {
      return this.$store.getters.USER
    },
    isAuth () {
      return this.$store.getters.IS_AUTH
    }
  }
}
</script>

<style scoped>
.app__brand {
  padding-left: 0.25em;
  user-select: none;
}
.navbar__search {
  background: var(--base-navbar-bg);
  border-radius: 0.25em;
}
.navbar__search-input {
  background: var(--base-navbar-bg);
  border-radius: 0.25em;
  border: 1px solid var(--base-navbar-line);
  color: var(--base-navbar-color);
}
.navbar__search-input:focus {
  background-color: var(--base-navbar-bg);
  color: var(--base-navbar-brand);
  border-color: var(--base-navbar-line);
  box-shadow: unset;
}
.navbar__search-label {
  background: var(--base-navbar-line);
  color: var(--base-navbar-brand);
  border: 1px solid var(--base-navbar-line);
  cursor: pointer;
}
.navbar-main {
  background: var(--base-navbar-bg);
  backdrop-filter: blur(12px);
  /*border-bottom: 1px solid var(--base-navbar-line);*/
  height: 56px;
}
.navbar-brand {
  font-weight: 500;
  color: var(--base-navbar-color) !important;
}
.navbar-brand_start {
  padding-left: 0.33em;
}
.theme__icon {
  cursor: pointer;
  color: var(--base-navbar-color) !important;
  margin: 1rem;
}
.user__menu-item-wrapper, .user__menu-item-wrapper:hover {
  background-color: unset;
}
.user__menu-item {
  color: var(--base-text);
  padding: 0.75em 1em;
  font-size: small;
}
.user__menu-item:hover {
  background-color: unset;
  color: var(--base-text-darker);
}
.user__menu-item:active {
  color: var(--base-text-darker);
  padding: 0.75em 1em;
  font-size: small;
}
.user__menu-theme {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.theme-toggler-icon {
  color: var(--base-navbar-brand);
  padding: 0.75em 1em;
}
.user__menu-content {
  background-color: var(--base-navbar-bg);
  border: 1px solid var(--base-back-lighter);
}
.user__menu-button {
  text-decoration: none;
}
.user__wrapper {
  display: inline-block;
}
.dropstart .dropdown-toggle::before {
  color: var(--base-weak);
  display: none;
}
button, button:focus, button:focus-visible {
  outline: none;
  box-shadow: none;
}
.dropstart .dropdown-menu[data-bs-popper] {
  top: 1.85em !important;
  right: 0 !important;
  left: auto !important;
  margin-top: 0 !important;
  margin-right: 0.125rem !important;
}
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
.user {
  display: inline;
  text-align: end;
  cursor: pointer;
}
.user__name {
  color: var(--base-navbar-color);
  margin-left: 0.5em;
  margin-right: 1em;
}
.user__icon {
  color: var(--base-navbar-color);
  margin-right: 0.5em;
}
/* Special from page */
.navbar_page_trailer {
  --base-navbar-color-active: #ff0000;
  --base-navbar-line: #161616;
  --base-navbar-bg: #000000;
  --base-navbar-bg-active: #ffffff;
  --base-navbar-color: #ffffff;
  --base-navbar-brand: #ffffff;
  background-color: #000000;
  backdrop-filter: none;
}
.navbar__search-hints {
  display: none;
  position: absolute;
  top: calc(var(--h-header, 50px) - 1rem);
  width: 100%;
  z-index: 1001;
  border-color: var(--base-navbar-line);
  background: var(--base-navbar-bg);
  border-radius: 0.35rem;
  border-top-left-radius: 0.35rem !important;
  border-bottom-left-radius: 0.35rem !important;
}
.navbar__search-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.35rem 1.25rem !important;
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--base-navbar-color);
  border-color: var(--base-navbar-line);
  background: var(--base-navbar-bg);
}
.navbar__search-hint:hover {
  color: var(--base-navbar-brand);
  background: var(--base-navbar-bg-active);
}
.navbar__search-hints_active {
  display: block;
}
.navbar__search-hint_type_symlink {
  color: var(--complement-strong);
}
.navbar__search-hint-text {
  color: inherit;
}
.navbar__search-hint-action {
  display: block;
  opacity: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  color: var(--critic-strong);
}
.navbar__search-hint:hover .navbar__search-hint-action {
  opacity: 1;
}
.navbar__search-hint-action:hover {
  background: var(--critic-weak);
  border-radius: 0.25rem;
}

@media (max-width: 992px) {
  .navbar-menu__search {
    width: 50%;
  }
  .navbar-menu__search:focus {
    width: 100%;
  }
  .dropstart .dropdown-menu[data-bs-popper] {
    top: 0 !important;
    right: 0 !important;
    left: auto !important;
    margin-top: 0 !important;
    margin-right: 0.125rem !important;
  }
}
</style>
