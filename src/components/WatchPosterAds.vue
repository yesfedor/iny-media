<template>
  <div ref="watch_card_target" class="watch-card ratio ratio-16x9" :style="(opacity === 1 ? cardBackgroundImage : '')">
    <template v-if="opacity === 1">
      <a :href="url" target="_blank">
        <div class="watch-card__wrapper">
          <div v-if="displayOption === 'default'" class="watch-card__content">
            <span class="watch-card__title">{{title}}</span>
          </div>
        </div>
      </a>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'WatchCard',
  props: {
    displayOption: {
      required: false,
      type: [String, Number],
      default: 'default'
    },
    id: {
      required: true,
      type: [String, Number],
      default: ''
    },
    url: {
      required: true,
      type: [String, Number],
      default: ''
    },
    posterUrl: {
      required: false,
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    type: {
      required: false,
      type: [String, Number],
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
  created () {
    const visibleFn = () => {
      if (this.displayOption === 'collection') {
        this.opacity = 1
        return true
      }
      if (this.$position.isVisible(this.$refs.watch_card_target)) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
    }

    this.hotSetVisibleFn = visibleFn
    this.setVisibleFn = _.debounce(visibleFn, 100)
  },
  mounted () {
    window.addEventListener('scroll', this.setVisibleFn)
    this.hotSetVisibleFn()
  },
  unmounted () {
    window.removeEventListener('scroll', this.setVisibleFn)
  },
  computed: {
    cardBackgroundImage () {
      return `background-image: url(${(this.posterUrl ? this.posterUrl : 'https://kinopoiskapiunofficial.tech/images/posters/kp/' + this.kinopoiskId + '.jpg')});`
    },
    marginTopRating () {
      if (this.displayOption === 'default') return '-62px'
      if (this.displayOption === 'feed') return '-30px'

      return '-62px'
    }
  }
}
</script>

<style scoped>
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
  padding: 0.15em;
  margin: 0.15em 0.5em;
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
  background-size: 135%;
  transition: all 0.5s;
  background-color: var(--accent-weak-darker);
}
.watch-card:hover {
  z-index: 1;
  background-size: 155%;
}
.watch-card__fast-action {
  opacity: 0;
  z-index: 100;
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
  z-index: 100;
}
.watch-card__fast-action-item:hover {
  background: #ffffff;
  color: var(--accent-strong);
  box-shadow: 0 0 1rem -0.25rem var(--accent-strong);
}
.watch-card .watch-card__fast-action-item:nth-child(1) {
  left: 55%;
  top: 89.375%;
}
.watch-card .watch-card__fast-action-item:nth-child(2) {
  left: 55%;
  top: 55%;
}
.watch-card .watch-card__fast-action-item:nth-child(3) {
  left: 89.375%;
  top: 55%;
}
.watch-card__wrapper {
  display: block;
  position: absolute;
  width: 100%;
  height: 100.2%;
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
.watch-card__type, .watch-card__nameRu {
  text-shadow: 4px -3px 3px #212121;
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__nameRu {
  font-size: smaller;
}
.watch-card__title {
  text-shadow: 4px -3px 3px #212121;
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__title_name {
  display: block;
  margin-bottom: 0.5em;
  font-size: medium;
}
.watch-card__title_counter {
  display: block;
  font-size: smaller;
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
  margin-top: v-bind(marginTopRating);
  height: 100%;
}
.watch-card__subscribe-true {
  color: var(--complement-strong) !important;
  outline: none;
  box-shadow: none;
}
.watch-card__subscribe-false {
  color: var(--critic-strong) !important;
  outline: none;
  box-shadow: none;
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
