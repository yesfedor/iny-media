<template>
  <div class="trailer">
    <div class="trailer__player-wrapper ratio ratio-16x9">
      <iframe
        allowfullscreen
        allowpaymentrequest
        autoplay="autoplay"
        class="trailer__player"
        :src="getTrailerSrc()"
      ></iframe>
    </div>
    <div v-if="isOverlayOpen" class="trailer__info">
      <div class="trailer__primary">
        <span class="trailer__title">{{trailerType}} {{nameRu}}</span>
        <span class="trailer__rating-kp">Рейтинг: <b>{{ratingKinopoisk}}</b></span>
        <span class="trailer__count-kp">голосов: <b>{{ratingKinopoiskVoteCount}}</b></span>
        <span class="trailer__description-title">Описание</span>
        <span class="trailer__description">{{description}}</span>
      </div>
      <div class="trailer__secondary">
        <span class="trailer__auth">
          <router-link class="trailer__auth-link" :to="{ name: 'Auth' }">Войдите</router-link>,
          чтобы посмотреть.
          <span class="trailer__auth-sub">Это - <span class="trailer__auth-free">бесплатно</span>.</span>
        </span>
      </div>
    </div>
    <div @click="isOverlayOpen = !isOverlayOpen" class="trailer__info-toggle">
      {{isOverlayOpen ? 'Скрыть информацию' : 'Показать информацию'}}
    </div>
  </div>
</template>

<script>
import Api from '../api/'
export default {
  name: 'Trailer',
  data () {
    return {
      isOverlayOpen: true,
      kinopoiskId: null,
      trailer_src: '',
      nameRu: '',
      description: '',
      posterUrl: '',
      ratingAgeLimits: '',
      ratingKinopoisk: '',
      ratingKinopoiskVoteCount: '',
      year: '',
      type: ''
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      this.kinopoiskId = this.$route.params.kpid
      this.getData()
      const eventResize = new Event('resize')
      window.dispatchEvent(eventResize)
    },
    getData () {
      Api.watchGetTrailerData(this.kinopoiskId).then(({ data }) => {
        this.kinopoiskId = data.kinopoiskId
        this.trailer_src = data.trailer_src
        this.nameRu = data.nameRu
        this.description = data.description
        this.posterUrl = data.posterUrl
        this.ratingAgeLimits = data.ratingAgeLimits
        this.ratingKinopoisk = data.ratingKinopoisk
        this.ratingKinopoiskVoteCount = data.ratingKinopoiskVoteCount
        this.year = data.year
        this.type = data.type
      })
    },
    getTrailerSrc () {
      let link = ''
      try {
        link = new URL(this.trailer_src)
      } catch {
        link = new URL('https://example.com')
      }
      if (this.trailer_src.includes('youtube.com')) {
        return 'https://youtube.com/embed/' + link.searchParams.get('v') + '?autoplay=1&controls=1&showinfo=0'
      }
      if (this.trailer_src.includes('kinopoisk.ru')) {
        return this.trailer_src
      }
      return this.trailer_src
    }
  }
}
</script>

<style>
.trailer {
  display: block;
  min-height: calc(100vh - var(--h-header));
  background-color: black;
  color: white;
}
.trailer__player-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-top: 1px solid white;
  height: calc(50vh - var(--h-header));
}
.trailer__player {
  display: block;
  background-color: var(--base-back-darker);
}
.trailer__info {
  display: flex;
  padding: 0.25em;
  flex-direction: column;
}
.trailer__primary {
  max-width: 100%;
  margin-top: 1.5em;
}
.trailer__secondary {
  max-width: 100%;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.trailer__title {
  display: block;
  font-size: xx-large;
}
.trailer__rating-kp {
  display: block;
  font-size: large;
  padding-top: 0.5em;
  padding-left: 0.25em;
  color: #ebebeb;
}
.trailer__count-kp {
  display: block;
  font-size: large;
  padding-top: 0.25em;
  padding-left: 0.25em;
  color: #ebebeb;
}
.trailer__description-title {
  display: block;
  font-size: medium;
  padding-top: 1.5em;
  padding-left: 0.25em;
}
.trailer__description {
  display: block;
  font-size: medium;
  padding-top: 0.5em;
  padding-left: 0.25em;
  color: #ebebeb;
}
.trailer__auth {
  display: block;
  font-size: larger;
}
.trailer__auth-link {
  text-decoration: none;
  color: #fff;
}
.trailer__auth-free {
  color: #fff;
  text-decoration: underline;
}
.trailer__auth-sub {
  display: block;
  padding-left: 0.1em;
}
.trailer__info-toggle {
  display: none;
}
@media (min-width: 992px) {
  .trailer__primary {
    margin-top: 0em;
    max-width: 45%;
  }
  .trailer__secondary {
    max-width: 45%;
    margin-top: 0em;
    margin-bottom: 0em;
  }
  .trailer {
    padding: 0em var(--h-header);
  }
  .trailer__player-wrapper {
    margin-top: calc(var(--h-header) * -1);
    border-top: none;
    height: 100vh;
    z-index: 0;
  }
  .trailer__info-toggle {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    padding: 0.25em;
    bottom: calc(44px + 0.5em);
    left: var(--h-header);
    right: var(--h-header);
    z-index: 2;
    cursor: pointer;
    user-select: none;
  }
  .trailer__info {
    padding-top: calc(var(--h-header) * 1.5);
    display: flex;
    flex-direction: row;
    min-height: calc(100vh - var(--h-header));
    align-items: flex-start;
    justify-content: space-around;
    position: absolute;
    top: var(--h-header);
    left: var(--h-header);
    right: var(--h-header);
    background: #000000;
    background: linear-gradient(90deg, #000000 0%, #000000bb 30%, #000000bb 50%, #00000075 100%);
    z-index: 1;
  }
}
</style>
