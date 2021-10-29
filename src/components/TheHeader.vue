<i18n lang="yaml" locale="ru">
  nav_menu_title: "Меню"
  nav_main: "Главная"
  nav_about: "О нас"
</i18n>

<i18n lang="yaml" locale="en">
  nav_menu_title: "Menu"
  nav_main: "Main"
  nav_about: "About"
</i18n>

<template>
  <nav class="navbar navbar-main theme navbar-expand-lg sticky-top py-3">
    <div class="container">
      <span class="navbar-icon w-25 text-start">
        <i @click="menuShow()" class="fal fa-bars theme theme__icon fa-lg"></i>
      </span>
      <router-link to="/" class="navbar-brand theme mx-auto">INY Media</router-link>
      <span class="navbar-icon w-25 text-end">
        <i18n-switcher class="d-inline theme theme__icon mx-0"></i18n-switcher>
        <i @click="authModalShow()" class="fal fa-sign-in-alt d-inline theme theme__icon fa-lg"></i>
      </span>
    </div>
    <teleport to=".app__ui-menu">
      <div v-if="isMenuShow" class="navbar-menu">
        <nav class="navbar fixed-top py-3">
          <div class="container">
            <span class="navbar-icon w-25 text-start">
              <i @click="menuHide()" class="fad fa-times theme theme__icon fa-lg"></i>
            </span>
            <router-link @click="menuHide()" to="/" class="navbar-brand theme mx-auto">INY Media</router-link>
            <span class="navbar-icon w-25 text-end">
              <theme-toggler-icon class="d-inline theme theme__icon fa-lg"></theme-toggler-icon>
            </span>
          </div>
        </nav>
        <div class="container h-100">
          <div class="navbar-menu__wrapper">
            <div class="col-12 text-center">
              <div class="row">
                <div class="col-12 mb-3">
                  <span class="h1 navbar-menu__title">{{$t('nav_menu_title')}}</span>
                  <hr class="navbar-menu__line">
                  <router-link @click="menuHide()" :to="{name: 'Main'}" class="h3 navbar-menu__link">{{$t('nav_main')}}</router-link>
                  <router-link @click="menuHide()" :to="{name: 'About'}" class="h3 navbar-menu__link">{{$t('nav_about')}}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      isMenuShow: false,
      isSupportsVibrate: false,
      authModalAction: 'default'
    }
  },
  mounted () {
    this.isSupportsVibrate = 'vibrate' in navigator
  },
  methods: {
    authModalShow () {
      this.$router.push({ name: 'Auth' })
    },
    vibrate () {
      // if (this.isSupportsVibrate) window.navigator.vibrate(100)
    },
    menuShow () {
      this.vibrate()
      this.isMenuShow = true
    },
    menuHide () {
      this.vibrate()
      this.isMenuShow = false
    }
  }
}
</script>

<style scoped>
.navbar-main {
  background: var(--accent-fancy-darker);
}
.navbar-brand {
  font-weight: 500;
  color: var(--base-weak-lighter) !important;
}
.nav-link {
  color: var(--base-weak-lighter) !important;
}
.nav-link:hover {
  color: var(--base-weak-darker) !important;
}
.navbar-toggler-icon {
  height: auto;
  color: var(--base-weak-lighter) !important;
}
.theme__icon {
  cursor: pointer;
  color: var(--base-weak-lighter) !important;
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2001;
}
.navbar-menu__wrapper {
  min-height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-height: 641px) {
  .navbar-menu__wrapper {
    align-items: center !important;
  }
}

.navbar-menu__title {
  display: block;
  color: var(--base-weak);
  margin-bottom: 1rem;
}
.navbar-menu__link {
  display: block;
  width: auto;
  color: var(--complement-weak);
  margin-bottom: 2rem;
  text-decoration: unset;
}
.navbar-menu__link:hover {
  color: var(--base-weak);
}
.navbar-menu__line {
  margin: auto;
  margin-bottom: 3rem;
  width: 12%;
  border: 3px solid var(--base-weak-lighter);
  border-radius: 3px;
}
.navbar-menu__icon {
  display: inline;
  padding: 2rem;
  color: var(--base-weak);
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--theme-duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
