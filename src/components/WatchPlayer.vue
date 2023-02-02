<template>
  <div
    class="compact-player"
    :class="{
      'compact-player_active': watchPlayer.src,
      'compact-player_full theme-none': isWatchPage && watchPlayer.src,
    }"
    :style="positionComputed"
  >
    <div v-if="!isWatchPage" class="compact-player_nav">
      <span class="compact-player__mobile-label">{{ watchPlayer.title }}</span>
      <i @click="openFull()" class="compact-player_nav-icon fal fa-expand-arrows-alt fa-lg"></i>
      <i @click="close()" class="compact-player_nav-icon fal fa-times fa-lg"></i>
    </div>
    <div class="compact-player__player ratio ratio-16x9">
      <iframe ref="player" class="compact-player__video" :src="watchPlayer.src" allowfullscreen frameborder="0"></iframe>
    </div>
    <div v-if="!isWatchPage" class="compact-player__info">
      <span class="compact-player__label">{{ watchPlayer.title }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppWatchPlayer',
  data () {
    return {
      scrollTop: 0,
      position: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      watchPlayer: 'watchPlayer',
      isCompact: 'COMPACT_PLAYER'
    }),
    isWatchPage () {
      return this.$route.name === 'Watch'
    },
    positionComputed () {
      if (this.isCompact || !this.isWatchPage) {
        return {
          position: this.position.position
        }
      }
      return {
        position: this.position.position,
        top: this.position.top,
        left: this.position.left,
        width: this.position.width,
        height: this.position.height
      }
    }
  },
  watch: {
    watchPlayer () {
      setTimeout(() => {
        this.updateSize()
      }, 100)
    },
    isCompact () {
      setTimeout(() => {
        this.updateSize()
      }, 100)
    },
    $route () {
      setTimeout(() => {
        this.updateSize()
      }, 100)
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateSize)
    window.addEventListener('fastscroll', this.updateScroll)
  },
  methods: {
    ...mapActions({
      watchPlayerClose: 'watchPlayerClose'
    }),
    updateScroll () {
      const $el = document.querySelector('.wrapper__content')
      this.scrollTop = $el.scrollTop
      this.updateSize()
    },
    updateSize () {
      const $el = document.querySelector('#watch-position')
      if (!$el) {
        return
      }
      this.position.top = `${$el.offsetTop - this.scrollTop}px`
      this.position.left = `${$el.offsetLeft}px`
      this.position.width = `${$el.offsetWidth}px`
      this.position.height = `${$el.offsetHeight}px`
    },
    openFull () {
      if (!Number(this.watchPlayer.kpid)) return false
      this.$router.push({ name: 'Watch', params: { kpid: this.watchPlayer.kpid } })
    },
    close () {
      this.watchPlayerClose()
    }
  }
}
</script>

<style>
.compact-player {
  width: 100vw;
  display: none;
  position: absolute;
  right: 0em;
  bottom: 44px;
  background: var(--base-navbar-bg);
  z-index: 1000;
  box-shadow: unset;
  will-change: top, left, width, height;
}
.compact-player_full {
  display: block;
  box-shadow: unset;
}
.compact-player_nav {
  margin-bottom: -37.3px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  position: absolute;
  width: 100%;
  text-align: end;
  border-bottom: 1px solid var(--base-navbar-line);
  z-index: 1000;
  transition: all;
  transition-duration: 400ms;
}
.compact-player__mobile_zip .compact-player_nav {
  margin-top: -37.5px;
}
.compact-player .compact-player_nav {
  opacity: 1;
  background-color: #000000;
}
.compact-player__mobile-label {
  width: calc(100% - 120px);
  display: inline-block;
  text-align: start;
  padding: 0.5em 0.5em;
  font-weight: 500;
  font-size: 0.7em;
  color: white;
  text-transform: capitalize;
}
.compact-player_nav-icon {
  cursor: pointer;
  color: white;
  padding: 0.5em 0.5em;
}
.compact-player__player {
  z-index: 0;
}
.compact-player__mobile_zip > .compact-player__player {
  display: none;
}
.compact-player__video {
  border-radius: 0;
  background-color: var(--base-navbar-bg);
}
.compact-player__info {
  width: 100%;
  display: none;
  padding: 0.5em 0.5em;
  border-top: 1px solid var(--base-navbar-line);
}
.compact-player__label {
  display: block;
  font-weight: 500;
  font-size: smaller;
  color: var(--base-navbar-color);
  text-transform: capitalize;
}
.compact-player_active {
  display: block;
}
@media (min-width: 992px) {
  .compact-player {
    width: 35vw;
    display: none;
    position: fixed;
    right: 1em;
    bottom: 1em;
    background: var(--base-navbar-bg);
    z-index: 1000;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }
  .compact-player_full {
    display: block;
    box-shadow: unset;
  }
  .compact-player_nav {
    margin-bottom: -37.3px;
    display: block;
    opacity: 0;
    position: absolute;
    width: 100%;
    text-align: end;
    border-bottom: 1px solid var(--base-navbar-line);
    z-index: 1000;
    transition: all;
    transition-duration: 400ms;
  }
  .compact-player .compact-player_nav {
    opacity: 0;
    background-color: transparent;
  }
  .compact-player:hover .compact-player_nav {
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
    opacity: 1;
    background-color: #000000dd;
  }
  .compact-player__mobile-label {
    display: none;
  }
  .compact-player_nav-icon {
    cursor: pointer;
    color: white;
    padding: 0.5em 0.5em;
    text-align: right;
  }
  .compact-player__player {
    z-index: 0;
  }
  .compact-player__video {
    border-radius: 0;
    background-color: var(--base-navbar-bg);
  }
  .compact-player__info {
    width: 100%;
    display: block;
    padding: 0.5em 0.5em;
    border-top: 1px solid var(--base-navbar-line);
  }
  .compact-player__label {
    display: block;
    font-weight: 500;
    font-size: smaller;
    color: var(--base-navbar-color);
    text-transform: capitalize;
  }
  .compact-player_active {
    display: block;
  }
}
@media (min-width: 1200px) {
  .compact-player {
    width: 25vw;
    right: 2em;
    bottom: 2em;
  }
}
</style>
