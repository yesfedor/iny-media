<template>
  <div @click.stop="toWatch()" class="watch-card ratio ratio-16x9" :style="`background-image: url(${posterUrl});`">
    <div class="watch-card__fast-action">
      <button @click.stop="fastActionHeart()" class="watch-card__fast-action-item fas fa-heart"></button>
      <button @click.stop="fastActionClipboard()" class="watch-card__fast-action-item fas fa-clipboard"></button>
      <button @click.stop="fastActionShare()" class="watch-card__fast-action-item fas fa-share-alt"></button>
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
    </div>
  </div>
</template>

<script>
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
    }
  },
  computed: {
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
    toWatch () {
      this.$router.push('/watch' + this.kinopoiskId)
    },
    fastActionHeart () {},
    fastActionClipboard () {},
    fastActionShare () {}
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
.watch-card {
  padding: 0.5em;
  cursor: pointer;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: all 0.5s;
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
  text-shadow: 4px -3px 3px var(--base-strong-darker);
  color: white;
  padding-top: 0.5em;
  padding-left: calc(1em + 0.5em);
  font-size: medium;
  font-weight: 700;
}
.watch-card__rating-age {
  text-shadow: 4px -3px 3px var(--base-strong-darker);
  color: white;
  padding-top: 0.5em;
  padding-right: calc(1em + 0.5em);
  font-size: medium;
  font-weight: 700;
}
.watch-card__type {
  text-shadow: 4px -3px 3px var(--base-strong-darker);
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__title {
  text-shadow: 4px -3px 3px var(--base-strong-darker);
  text-align: center;
  color: white;
  padding: 0.3em 0.5em;
  font-size: large;
  font-weight: 700;
}
.watch-card__year {
  text-shadow: 4px -3px 3px var(--base-strong-darker);
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
  margin-top: v-bind(marginTopRating);
  height: 100%;
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
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
}

</style>
