<template>
  <nav
    class="navbar navbar-main theme navbar-expand-lg sticky-top py-3"
    :class="'navbar_page_' + ($route.name + '').toLocaleLowerCase()"
  >
    <div class="container">
      <span class="navbar-icon w-25 text-start">
        <i @click.stop.prevent="menuShow()" class="fal fa-bars theme theme__icon fa-lg"></i>
      </span>
      <router-link :to="{ name: 'Main' }" class="navbar-brand theme mx-auto">
        <strong>INY Media</strong>
      </router-link>
      <span class="navbar-icon w-25 text-end user">
        <div v-if="isAuth" class="dropdown dropstart user__droppos user__wrapper">
          <button class="btn btn-link dropdown-toggle user__menu-button m-0 p-0" type="button" id="navbar-user-menu" data-bs-toggle="dropdown" aria-expanded="false">
            <span>
              <span class="user__name d-none d-lg-inline theme">{{user.name}}</span>
              <i :class="getAccountIcon()" class="user__icon fal d-inline theme fa-lg"></i>
            </span>
          </button>
          <ul class="dropdown-menu user__menu-content shadow" aria-labelledby="navbar-user-menu">
            <li class="user__menu-item-wrapper" :class="$route.name === 'SubscriptionsFeed' ? 'user__menu-item-wrapper_active' : ''">
              <router-link class="dropdown-item user__menu-item" :to="{name: 'SubscriptionsFeed'}">Новые серии</router-link>
            </li>
            <li class="user__menu-item-wrapper" :class="$route.name === 'Subscriptions' ? 'user__menu-item-wrapper_active' : ''">
              <router-link class="dropdown-item user__menu-item" :to="{name: 'Subscriptions'}">Подписки</router-link>
            </li>
            <li class="user__menu-item-wrapper" :class="$route.name === 'Profile' ? 'user__menu-item-wrapper_active' : ''">
              <router-link class="dropdown-item user__menu-item" :to="{name: 'Profile'}">Профиль</router-link>
            </li>
            <li class="user__menu-item-wrapper">
              <button  @click="$store.commit('LOGOUT')"  class="dropdown-item user__menu-item" type="button">Выйти</button>
            </li>
          </ul>
        </div>
        <div v-else class="user__wrapper">
          <span @click="goAccount()">
            <span class="user__name d-none d-lg-inline theme">{{user.name}}</span>
            <i :class="getAccountIcon()" class="user__icon fal d-inline theme fa-lg"></i>
          </span>
        </div>
      </span>
    </div>
    <teleport to=".app__ui-menu">
      <transition name="fade">
        <div v-if="isMenuShow" class="navbar-menu">
          <nav class="navbar fixed-top py-3">
            <div class="container">
              <span class="navbar-icon w-25 text-start">
                <i @click.stop.prevent="menuHide()" class="fad fa-times theme theme__icon fa-lg"></i>
              </span>
              <router-link @click.stop.prevent="menuHide()" :to="{ name: 'Main' }" class="navbar-brand theme mx-auto">
                <strong>{{isSearchHints ? '':'INY Media'}}</strong>
              </router-link>
              <span class="navbar-icon w-25 text-end">
                <theme-toggler-icon class="d-inline theme theme__icon fa-lg theme-toggler-icon"></theme-toggler-icon>
              </span>
            </div>
          </nav>
          <div class="container h-100">
            <div class="navbar-menu__wrapper theme-newYear-in-menu">
              <div class="col-12 text-center">
                <div class="row">
                  <div class="col-12 mb-3">
                    <span class="h1 navbar-menu__title">{{(isSearchHints ? 'Поиск' : 'Меню')}}</span>
                    <hr class="navbar-menu__line">
                    <div @focusin="isSearchHints = true" @focusout="searchFocusOut()" class="row search">
                      <div class="col-12 text-center ">
                        <input placeholder="Поиск" class="navbar-menu__search" type="search" @input="debounceSearch()" @change="debounceSearch()" v-model="searchValue">
                      </div>
                      <div v-show="isSearchHints" class="col-12 search__hints">
                        <div class="row hints">
                          <div class="col-12 hints__item hint hint_info">
                            <span class="h5 hint__title">{{hintInfo}}</span>
                          </div>
                          <div v-for="item in searchResult" :key="item.kinopoiskId" @click.stop.prevent.stop="goWatch(item.kinopoiskId)" class="col-12 hints__item hint">
                            <span class="h5 hint__title">{{getKpidType(item.type)}} {{item.nameRu}} - ({{item.year}})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template v-if="!isSearchHints">
                      <router-link @click.stop.prevent="menuHide()" :to="{name: 'Main'}" class="h3 navbar-menu__link">Главная</router-link>
                      <router-link @click.stop.prevent="menuHide()" :to="{name: 'Search'}" class="h3 navbar-menu__link">Поиск по фильтрам</router-link>
                      <router-link @click.stop.prevent="menuHide()" :to="{name: 'Trand'}" class="h3 navbar-menu__link">В тренде</router-link>
                      <router-link v-show="isAuth" @click.stop.prevent="menuHide()" :to="{name: 'SubscriptionsFeed'}" class="h3 navbar-menu__link">Подписки</router-link>
                      <router-link v-show="isAuth" @click.stop.prevent="menuHide()" :to="{name: 'History'}" class="h3 navbar-menu__link">История</router-link>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </nav>
</template>

<script>
import Api from '../api'
import _ from 'lodash'

export default {
  name: 'TheHeader',
  data () {
    return {
      isMenuShow: false,
      isSupportsVibrate: false,
      authModalAction: 'default',
      searchValue: '',
      hintInfo: 'Начните писать',
      isSearchHints: false,
      searchResult: ''
    }
  },
  created () {
    this.debounceSearch = _.debounce(() => {
      if (this.searchValue === '' || this.searchValue.length < 3) {
        this.hintInfo = 'Начните писать'
      } else {
        this.hintInfo = 'Ждем когда вы завершите..'
      }
      this.fastSearch()
    }, 500)
    this.menuShow = _.debounce(() => {
      this.isMenuShow = true
    }, 100)
    this.menuHide = _.debounce(() => {
      this.isMenuShow = false
    }, 100)
  },
  mounted () {
    this.isSupportsVibrate = 'vibrate' in navigator
  },
  methods: {
    getAccountIcon () {
      if (this.isAuth) return 'fa-user-alt'
      else return 'fa-sign-in-alt'
    },
    goAccount () {
      if (this.isAuth) this.$router.push({ name: 'Profile' })
      else this.$router.push({ name: 'Auth' })
    },
    fastSearch () {
      if (this.searchValue.length < 3) return false
      this.hintInfo = 'Загрузка...'
      Api.watchFastSearch(this.searchValue).then(({ data }) => {
        if (data?.code === 200) {
          this.hintInfo = 'Приятного просмотра'
          this.searchResult = data?.content
        } else {
          this.hintInfo = 'Ничего не нашлось'
          /**
           * @todo Обработать когда результатов нет
           */
        }
      })
    },
    getKpidType (type) {
      switch (type) {
        default:
        case 'VIDEO':
          return 'Видео'
        case 'FILM':
          return 'Фильм'
        case 'TV_SERIES':
          return 'Сериал'
        case 'MINI_SERIES':
          return 'Мини-сериал'
        case 'TV_SHOW':
          return 'Шоу'
      }
    },
    goWatch (kinopoiskId) {
      this.menuHide()
      this.$router.push('/watch' + kinopoiskId)
    },
    searchFocusOut () {
      setTimeout(() => {
        this.isSearchHints = false
      }, 500)
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
.navbar-main {
  background: var(--base-navbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--base-navbar-line);
}
.navbar-brand {
  font-weight: 500;
  color: var(--base-navbar-color) !important;
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
.theme-toggler-icon {
  margin-right: 0.5em;
}

/* Special from page */
.navbar_page_trailer {
  --base-navbar-color: white;
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
