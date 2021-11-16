<template>
  <div ref="watch_card_target" @mouseenter="started()" @mouseleave="reseted()" @click.stop="toWatch()" class="watch-card ratio ratio-16x9" :style="(opacity === 1 ? cardBackgroundImage : '')">
    <template v-if="opacity === 1">
      <div v-if="fastActionState === 'main'" class="watch-card__fast-action">
        <button
          ref="heart"
          @click.stop="fastActionHeart()"
          class="watch-card__fast-action-item fas"
          :class="(isSubscribe ? 'watch-card__subscribe-true fa-heart-broken' : 'watch-card__subscribe-false fa-heart')"
        ></button>
        <button
          ref="clipboard"
          @click.stop="fastActionClipboard()"
          class="watch-card__fast-action-item fas fa-clipboard"
        ></button>
        <button
          ref="share"
          @click.stop="fastActionShare()"
          class="watch-card__fast-action-item fas fa-share-alt"
        ></button>
      </div>
      <div v-if="fastActionState === 'share'" @mouseleave="reseted()" class="watch-card__fast-action">
        <button @click.stop="share('vk')" class="watch-card__fast-action-item fab fa-vk"></button>
        <button @click.stop="share('telegram')" class="watch-card__fast-action-item fab fa-telegram"></button>
        <button @click.stop="share('twitter')" class="watch-card__fast-action-item fab fa-twitter"></button>
      </div>
      <div class="watch-card__wrapper">
        <div class="watch-card__rating">
          <span class="watch-card__rating-kinopoisk">{{ratingKinopoisk}}</span>
          <span class="watch-card__rating-age">{{ratingAgeLimits + '+'}}</span>
        </div>
        <div class="watch-card__content">
          <span class="watch-card__type">{{(cardType.length === 0 ? '' : cardType[0].toUpperCase() + cardType.slice(1))}}</span>
          <span class="watch-card__title">{{nameRu}}</span>
          <span class="watch-card__year">{{year}}</span>
        </div>
        <div class="watch-card__mobile-toggler">
          <i @click.stop="isMobileMenu = !isMobileMenu" class="watch-card__mobile-icon fas fa-ellipsis-v"></i>
        </div>
        <div v-show="isMobileMenu" @click.stop="" class="watch-card__mobile-menu">
          <div class="watch-card__mobile-content">
            <i
              @click.stop="fastActionHeart()"
              class="fas fa-lg"
              :class="(isSubscribe ? 'watch-card__subscribe-true fa-heart-broken' : 'watch-card__subscribe-false fa-heart')"
            ></i>
          </div>
          <div class="watch-card__mobile-content">
            <i
              class="fas fa-lg fas fa-clipboard"
              @click.stop="fastActionClipboard()"
            ></i>
          </div>
          <div class="watch-card__mobile-content">
            <i @click.stop="share('vk')" class="fab fa-vk fa-lg"></i>
            <i @click.stop="share('telegram')" class="fab fa-telegram fa-lg"></i>
            <i @click.stop="share('twitter')" class="fab fa-twitter fa-lg"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Api from '../api'
import Share from '../mixins/Share'
import toastr from '../mixins/Toastr'

export default {
  name: 'WatchCard',
  props: {
    id: {
      required: true,
      type: String,
      default: ''
    },
    kinopoiskId: {
      required: false,
      type: String,
      default: ''
    },
    nameRu: {
      required: false,
      type: String,
      default: ''
    },
    ratingAgeLimits: {
      required: false,
      type: String,
      default: ''
    },
    ratingKinopoisk: {
      required: false,
      type: String,
      default: ''
    },
    posterUrl: {
      required: false,
      type: String,
      default: ''
    },
    type: {
      required: false,
      type: String,
      default: ''
    },
    year: {
      required: false,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isMobileMenu: false,
      fastActionState: 'main',
      isSubscribe: false,
      opacity: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.setVisibleFn)
    setTimeout(() => {
      this.setVisibleFn()
    }, 100)
    setTimeout(() => {
      this.setVisibleFn()
    }, this.$store.getters.PRELOADER_OFFSET)
  },
  unmounted () {
    window.removeEventListener('scroll', this.setVisibleFn)
  },
  computed: {
    cardBackgroundImage () {
      return `background-image: url(${(this.posterUrl ? this.posterUrl : 'https://kinopoiskapiunofficial.tech/images/posters/kp/' + this.kinopoiskId + '.jpg')});`
    },
    isAuth () {
      return this.$store.getters.IS_AUTH
    },
    JWT () {
      return this.$store.getters.JWT
    },
    cardType () {
      switch (this.type) {
        default:
        case 'VIDEO':
          return 'видео'
        case 'FILM':
          return 'фильм'
        case 'TV_SERIES':
          return 'сериал'
        case 'MINI_SERIES':
          return 'мини-сериал'
        case 'TV_SHOW':
          return 'шоу'
      }
    },
    marginTopRating () {
      return '-64px'
    }
  },
  methods: {
    setVisibleFn () {
      if (this.$position.isVisible(this.$refs.watch_card_target)) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
    },
    started () {
      this.getUserRecord()
    },
    getUserRecord () {
      if (!this.kinopoiskId) return false
      const clientId = localStorage.getItem('client_id')
      Api.watchUserRecord(this.kinopoiskId, this.JWT, clientId).then(({ data }) => {
        if (!data?.status) return false
        switch (data.status) {
          case 'jwt_404':
            break
          case 'user_404':
            break
          case 'unsubscribe':
            this.isSubscribe = false
            break
          case 'subscribe':
            this.isSubscribe = true
            break
        }
      })
    },
    reseted () {
      this.fastActionState = 'main'
    },
    toWatch () {
      this.$router.push('/watch' + this.kinopoiskId)
    },
    fastActionHeart () {
      this.$refs.heart.blur()

      if (!this.kinopoiskId) return false

      let act = ''
      if (this.isSubscribe) {
        // подписан - отпистать
        act = 'unsubscribe'
      } else {
        // отписан - подписать
        act = 'subscribe'
      }

      const clientId = localStorage.getItem('client_id')
      Api.watchSubscribeManager(act, this.kinopoiskId, this.JWT, clientId).then(({ data }) => {
        if (data?.status === 'subscribe') this.isSubscribe = true
        if (data?.status === 'unsubscribe') this.isSubscribe = false
      })
    },
    fastActionClipboard () {
      this.$refs.clipboard.blur()

      const copyValue = 'https://iny.su/watch' + this.kinopoiskId
      navigator.clipboard.writeText(copyValue)

      toastr.success('Ссылка скопирована в буфер обмена')

      this.reseted()
    },
    fastActionShare () {
      this.$refs.share.blur()

      this.fastActionState = 'share'
    },
    share (where) {
      const url = 'https://iny.su/watch' + this.kinopoiskId
      const title = `Смотрите ${this.cardType} ${this.nameRu} онлайн на INY Media`
      const text = `Мне очень понравился ${this.cardType} ${this.nameRu}, посмотрите его на INY Media`

      switch (where) {
        case 'vk':
          Share.vk(url, title, this.posterUrl, text)
          break
        case 'telegram':
          Share.telegram(url, text)
          break
        case 'twitter':
          Share.twitter(url, text)
          break
      }

      this.reseted()
    }
  }
}
</script>

<style scoped>
@keyframes watchCardBack {
  0% {
    background-size: 150%;
    background-position: center;
  }
  10% {
    background-size: 100%;
    background-position: top;
  }
  20% {
    background-size: 150%;
    background-position: top;
  }
  30% {
    background-size: 200%;
    background-position: top left;
  }
  40% {
    background-size: 200%;
    background-position: top center;
  }
  50% {
    background-size: 150%;
    background-position: top right;
  }
  60% {
    background-size: 250%;
    background-position: center;
  }
  70% {
    background-size: 100%;
    background-position: bottom;
  }
  80% {
    background-size: 150%;
    background-position:left bottom;
  }
  90% {
    background-size: 200%;
    background-position: right bottom;
  }
  100% {
    background-size: 150%;
    background-position: center;
  }
}

/* Mobile */
.watch-card__mobile-toggler {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.watch-card__mobile-menu {
  background-color: #000000dd;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.watch-card__mobile-content {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.watch-card__mobile-content > i {
  color: white;
  padding: 0.5em;
  margin: 0.5em;
}

.watch-card__mobile-icon {
  color: white;
  padding: 1.5em;
  z-index: 30;
}

.watch-card {
  opacity: v-bind(opacity);
  padding: 0.5em;
  cursor: pointer;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: all 0.5s;
  background-color: var(--base-strong-lighter);
}
.watch-card:hover {
  z-index: 1;
  background-size: 150%;
}
.watch-card__fast-action {
  opacity: 0;
  z-index: 0;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  border-radius: 100%;
  width: 0rem;
  height: 0rem;
  transform: translate(-50%, -50%);
  transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
}
.watch-card__fast-action-item {
  display: grid;
  place-items: center;
  position: absolute;
  width: 2.2em;
  height: 2.2em;
  border: none;
  border-radius: 100%;
  background: var(--accent-strong);
  color: #ffffff;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.25s cubic-bezier(0.25, 0, 0, 1);
  box-shadow: 0 0 0rem -0.25rem var(--accent-strong);
}
.watch-card__fast-action-item:hover {
  background: #ffffff;
  color: var(--accent-strong);
  box-shadow: 0 0 1rem -0.25rem var(--accent-strong);
}
.watch-card .watch-card__fast-action-item:nth-child(1) {
  left: 50%;
  top: 15.625%;
}
.watch-card .watch-card__fast-action-item:nth-child(2) {
  left: 25%;
  top: 25%;
}
.watch-card .watch-card__fast-action-item:nth-child(3) {
  left: 15.625%;
  top: 50%;
}

.watch-card__wrapper {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(0.35) saturate(2);
}
.watch-card__rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 10%;
  padding-top: 1em;
  padding-bottom: 1em;
}
.watch-card__rating-kinopoisk {
  text-shadow: 4px -3px 3px #212121;
  color: white;
  padding-top: 0.5em;
  padding-left: calc(1em + 0.5em);
  font-size: medium;
  font-weight: 700;
}
.watch-card__rating-age {
  text-shadow: 4px -3px 3px #212121;
  color: white;
  padding-top: 0.5em;
  padding-right: calc(1em + 0.5em);
  font-size: medium;
  font-weight: 700;
}
.watch-card__type {
  text-shadow: 4px -3px 3px #212121;
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__title {
  text-shadow: 4px -3px 3px #212121;
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__year {
  text-shadow: 4px -3px 3px #212121;
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* v-bind(marginTopRating) -64px default */
  margin-top: -64px;
  height: 100%;
}

.watch-card__subscribe-true {
  background: var(--complement-strong);
  color: white;
  outline: none;
  box-shadow: none;
}
.watch-card__subscribe-true:hover {
  background: white;
  color: var(--complement-strong);
}

.watch-card__subscribe-false {
  background: var(--critic-strong);
  color: white;
  outline: none;
  box-shadow: none;
}
.watch-card__subscribe-false:hover {
  background: whtie;
  color: var(--critic-strong);
}

@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .watch-card {
    border-radius: 0.5em;
  }
  .watch-card:hover {
    transform: scale(1.15);
    animation: watchCardBack 20s linear 1s infinite;
  }
  .watch-card__wrapper {
    border-radius: 0.5em;
  }
  .watch-card:hover .watch-card__fast-action, .watch-card .watch-card__fast-action:focus-within {
    opacity: 1;
    width: 9em;
    height: 9em;
  }
  .watch-card__mobile-toggler {
    display: none;
    opacity: 0;
  }
  .watch-card__mobile-menu {
    display: none;
    opacity: 0;
  }
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
}

</style>
