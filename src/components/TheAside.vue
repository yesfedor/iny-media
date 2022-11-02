<template>
  <div
    :class="'aside_page_' + ($route.name + '').toLocaleLowerCase()"
    class="aside"
  >
    <div class="aside__main">
      <router-link :to="({ name: 'Main' })" :class="$route.name === 'Main' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-home fa-lg"></i>
        <span class="aside__main-text">Главная</span>
      </router-link>
      <router-link :to="({ name: 'Trand' })" :class="$route.name === 'Trand' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-fire fa-lg"></i>
        <span class="aside__main-text">В тренде</span>
      </router-link>
      <router-link :to="({ name: 'Search' })" :class="$route.name === 'Search' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-compass fa-lg"></i>
        <span class="aside__main-text">Навигатор</span>
      </router-link>
      <router-link :to="({ name: 'SubscriptionsFeed' })" :class="$route.name === 'SubscriptionsFeed' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-newspaper fa-lg"></i>
        <span class="aside__main-text">Новые серии</span>
      </router-link>
      <router-link :to="({ name: 'Subscriptions' })" :class="$route.name === 'Subscriptions' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-heart fa-lg"></i>
        <span class="aside__main-text">Подписки</span>
      </router-link>
      <hr />
      <template v-if="playlistToggleState">
        <router-link :to="({ name: 'CollectionPlaylists' })" :class="$route.name === 'CollectionPlaylists' ? 'aside__main-item_active' : ''" class="aside__main-item">
          <i class="aside__main-icon fal fa-books fa-lg"></i>
          <span class="aside__main-text">Коллекция</span>
        </router-link>
        <router-link :to="({ name: 'History' })" :class="$route.name === 'History' ? 'aside__main-item_active' : ''" class="aside__main-item">
          <i class="aside__main-icon fal fa-history fa-lg"></i>
          <span class="aside__main-text">История</span>
        </router-link>
        <router-link :to="({ name: 'CollectionWatchLater' })" :class="$route.name === 'CollectionWatchLater' ? 'aside__main-item_active' : ''" class="aside__main-item">
          <i class="aside__main-icon fal fa-clock fa-lg"></i>
          <span class="aside__main-text">Смотреть позже</span>
        </router-link>
        <router-link :to="({ name: 'CollectionFavorites' })" :class="$route.name === 'CollectionFavorites' ? 'aside__main-item_active' : ''" class="aside__main-item">
          <i class="aside__main-icon fal fa-thumbs-up fa-lg"></i>
          <span class="aside__main-text">Понравившиеся</span>
        </router-link>
      </template>
      <a @click.prevent="playlistToggle" class="aside__main-item">
        <i :class="playlistToggleState ? 'fa-angle-up' : 'fa-angle-down'" class="aside__main-icon fal fa-lg"></i>
        <span class="aside__main-text">{{ playlistToggleState && 'Свернуть' || 'Развернуть' }}</span>
      </a>
      <hr />
      <a href="https://t.me/inymedia" target="_blank" class="aside__main-item aside__main-item-away">
        <i class="aside__main-icon fab fa-telegram-plane fa-lg"></i>
        <span class="aside__main-text">Telegram</span>
      </a>
      <a href="https://vk.com/inysu" target="_blank" class="aside__main-item aside__main-item-away">
        <i class="aside__main-icon fab fa-vk fa-lg"></i>
        <span class="aside__main-text">VK</span>
      </a>
      <div class="aside__main-footer">
        <span v-show="asideState === 'main'" class="aside__main-copyright">
          © INY Media, {{(new Date).getFullYear()}}
        </span>
      </div>
    </div>
    <div class="aside__mobile">
      <router-link :to="({ name: 'Main' })" :class="$route.name === 'Main' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-home"></i>
        <span class="aside__mobile-text">Главная</span>
      </router-link>
      <router-link :to="({ name: 'Search' })" :class="$route.name === 'Search' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-compass"></i>
        <span class="aside__mobile-text">Навигатор</span>
      </router-link>
      <router-link :to="({ name: 'Trand' })" :class="$route.name === 'Trand' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-fire"></i>
        <span class="aside__mobile-text">В тренде</span>
      </router-link>
      <router-link :to="({ name: 'Subscriptions' })" :class="$route.name === 'Subscriptions' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-heart"></i>
        <span class="aside__mobile-text">Подписки</span>
      </router-link>
      <router-link :to="({ name: 'SubscriptionsFeed' })" :class="$route.name === 'SubscriptionsFeed' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-newspaper"></i>
        <span class="aside__mobile-text">Новые серии</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheAside',
  data () {
    return {
      asideState: 'main',
      playlistToggleState: true
    }
  },
  mounted () {
    const playlistToggleState = localStorage.getItem('playlist-toggle-state')
    if (playlistToggleState === 'true') {
      this.playlistToggleState = true
    } else {
      this.playlistToggleState = false
    }
    const asideStateHandler = () => {
      this.asideStateHandler()
    }
    window.addEventListener('asideState', asideStateHandler)
    asideStateHandler()
  },
  methods: {
    playlistToggle () {
      this.playlistToggleState = !this.playlistToggleState
      localStorage.setItem('playlist-toggle-state', this.playlistToggleState + '')
    },
    asideStateHandler () {
      this.asideState = localStorage.getItem('asideState') || 'main'
    }
  },
  computed: {
    asideStateTextBlock () {
      if (this.asideState === 'main') return 'unset'
      if (this.asideState === 'zip') return 'none'
      return ''
    }
  }
}
</script>

<style scoped>
.aside {
  display: block;
}
.aside__main {
  display: none;
  width: 100%;
  height: 100%;
  background: var(--base-navbar-bg);
  backdrop-filter: blur(12px);
  z-index: 40;
  flex-direction: column;
}
.aside__main-item {
  margin-left: 13px;
  margin-right: 13px;
  display: block;
  cursor: pointer;
  padding: 0.65em 0em;
  text-decoration: none;
  border-radius: 12px;
}
.aside__main-item:hover {
  background: var(--base-navbar-bg-hover);
}
.aside__main-item_active {
  background: var(--base-aside-navbar-bg);
}
.aside__main-icon {
  text-align: center;
  margin: auto 0em;
  width: 50px;
  color: var(--base-navbar-brand);
}
.aside__main-item_active > .aside__main-icon {
  color: var(--base-navbar-color-active);
}
.aside__mobile-item_active > .aside__mobile-icon {
  color: var(--base-navbar-color-active);
}

.aside__main-text {
  display: v-bind(asideStateTextBlock);
  text-align: start;
  width: 125px;
  color: var(--base-navbar-brand);
  font-weight: 500;
  font-size: 0.9em;
}
.aside__mobile {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  color: var(--base-navbar-brand);
  background: var(--base-navbar-bg);
  border-top: 1px solid var(--base-navbar-line);
  z-index: 40;
}
.aside__mobile-item {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--base-navbar-brand);
  text-decoration: none;
}
.aside__mobile-text {
  color: var(--base-navbar-brand);
  font-size: 0.45em;
  padding-top: 0.25em;
  text-decoration: none;
}
.aside__main-footer {
  display: flex;
  height: 100%;
  align-items: flex-end;
}
.aside__main-copyright {
  width: 100%;
  text-align: center;
  margin-top: 0.5em;
  padding: 0.5em 0.75em;
}
@media (min-width: 992px) {
  .aside__main {
    display: flex;
  }
  .aside__mobile {
    display: none;
  }
}

.aside_page_trailer {
  display: none;
}
</style>
