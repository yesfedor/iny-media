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
          @keypress.enter="goToSearchPage()"
          @focus="isSearchActive = true"
          @blur="isSearchActive = false"
          v-model="searchModel"
        >
        <span @click="goToSearchPage()" class="input-group-text navbar__search-label fal fa-search p-2 m-auto"></span>
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
export default {
  name: 'TheHeader',
  data () {
    return {
      isSearchActive: false,
      searchModel: '',
      isMenuShow: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.searchModel = this.$route.params.query || ''
    }, 500)
  },
  methods: {
    toggleAside () {
      // main | zip
      const asideState = localStorage.getItem('asideState') || 'main'
      const event = new CustomEvent('asideState')
      if (asideState === 'main') localStorage.setItem('asideState', 'zip')
      if (asideState === 'zip') localStorage.setItem('asideState', 'main')
      window.dispatchEvent(event)
    },
    goToSearchPage () {
      if (this.searchModel === '') return false
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
.nav-link {
  color: var(--base-navbar-color) !important;
}
.nav-link:hover {
  color: var(--theme-white-darker) !important;
}
.navbar-toggler-icon {
  height: auto;
  color: var(--base-navbar-color) !important;
}
.theme__icon {
  cursor: pointer;
  color: var(--base-navbar-color) !important;
  margin: 1rem;
}
.navbar-menu {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(8px) saturate(200%);
  -webkit-backdrop-filter: blur(8px) saturate(200%);
  background-color: var(--alpha-base-weak);
  z-index: 2001;
}
.navbar-menu__wrapper {
  min-height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user__menu-item-wrapper, .user__menu-item-wrapper:hover {
  background-color: unset;
}
.user__menu-item-wrapper_active {
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
.hint__title {
  color: var(--base-navbar-color);
}

@media (min-height: 641px) {
  .navbar-menu__wrapper {
    align-items: center !important;
  }
}

.navbar-menu__title {
  display: block;
  color: var(--base-navbar-color);
  margin-bottom: 1rem;
}
.navbar-menu__link {
  display: block;
  width: auto;
  color: var(--base-navbar-color);
  margin-bottom: 2rem;
  text-decoration: unset;
}
.navbar-menu__link:hover {
  color: var(--faint-strong);
}
.navbar-menu__line {
  margin: auto;
  margin-bottom: 3rem;
  width: 12%;
  border: 3px solid var(--base-navbar-color);
  border-radius: 3px;
}
.navbar-menu__icon {
  display: inline;
  padding: 2rem;
  color: var(--base-navbar-color);
  cursor: pointer;
}
.navbar-menu__search {
  width: 30%;
  display: inline;
  padding: .5rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  border: 3px var(--base-navbar-color) solid;
  color: var(--base-navbar-color);
  background: var(--alpha-base-weak);
  transition: width 0.5s;
  outline: none;
}

.navbar-menu__search::placeholder {
  color: var(--base-navbar-color);
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

.navbar-menu__search:focus {
  width: 70%;
  border-radius: 0.5rem;
  border: 3px var(--base-navbar-color) solid;
}

.search__hints {
  display: flex;
  justify-content: center;
}
.hints {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  width: 70%;
  background: transparent;
  overflow: auto;
  max-height: 60vh;
  background: var(--alpha-base-weak);
}

.hints__item {
  padding: 1rem .5rem;
}
.hint {
  cursor: pointer;
  border-top: 3px var(--base-navbar-color) solid;
  text-align: center;
}

.hint_info {
  border-top: none;
  text-align: start;
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

@media (max-width: 992px) {
  .navbar-menu__search {
    width: 50%;
  }
  .navbar-menu__search:focus {
    width: 100%;
  }
  .hints {
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
