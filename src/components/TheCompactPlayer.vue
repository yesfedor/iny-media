<template>
  <div
    :class="(isActive ? 'compact-player_active' : '') + ' ' + (isMobileHide ? 'compact-player__mobile_zip' : '')"
    class="compact-player"
  >
    <div class="compact-player_nav">
      <span class="compact-player__mobile-label">{{label}}</span>
      <i @click="toggle()" :class="(isMobileHide ? 'fa-chevron-up' : 'fa-chevron-down')" class="compact-player_nav-icon fal fa-chevron-down fa-lg"></i>
      <i @click="openFull()" class="compact-player_nav-icon fal fa-expand-arrows-alt fa-lg"></i>
      <i @click="close()" class="compact-player_nav-icon fal fa-times fa-lg"></i>
    </div>
    <div class="app__ui-player-compact compact-player__player ratio ratio-16x9">
      <!-- Player target -->
    </div>
    <div class="compact-player__info">
      <span class="compact-player__label">{{label}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'TheCompactPlayer',
  data () {
    return {
      isMobileHide: false,
      isActive: false,
      kpid: null,
      type: '',
      nameRu: '',
      playerAlias: ''
    }
  },
  mounted () {
    const inited = (e) => {
      this.init(e.detail)
    }
    const stoped = () => {
      this.stop()
    }

    window.addEventListener('init-compact-player', inited)
    window.addEventListener('stop-compact-player', stoped)
  },
  methods: {
    ...mapMutations({
      setCompactPlayer: 'SET_COMPACT_PLAYER'
    }),
    ...mapActions({
      SET_PLAYER_SRC: 'SET_PLAYER_SRC',
      SET_PLAYER_COMPACT: 'SET_PLAYER_COMPACT',
      SET_PLAYER_TARGET: 'SET_PLAYER_TARGET'
    }),
    toggle () {
      this.isMobileHide = !this.isMobileHide
    },
    init (detail) {
      this.isActive = true
      this.kpid = detail.kpid
      this.type = detail.type
      this.nameRu = detail.nameRu
      this.playerAlias = detail.playerAlias
      this.SET_PLAYER_COMPACT(true)
    },
    stop () {
      this.isActive = false
      this.kpid = 0
      this.type = 0
      this.nameRu = 0
      this.playerAlias = ''
      this.SET_PLAYER_SRC('')
      this.SET_PLAYER_TARGET('init')
      this.SET_PLAYER_COMPACT(false)
    },
    openFull () {
      if (!Number(this.kpid)) return false
      this.$router.push({ name: 'Watch', params: { kpid: this.kpid } })
      this.close()
    },
    close () {
      // stop player
      // set inactive
      // if (this.$refs?.player?.contentWindow) this.$refs.player.contentWindow.postMessage({ api: 'pause' }, '*')
      this.isActive = false
    }
  },
  computed: {
    ...mapGetters({
      getPlayerTarget: 'getPlayerTarget',
      getPlayerSrc: 'getPlayerSrc',
      isPlayerCompact: 'isPlayerCompact'
    }),
    label () {
      let type = ''
      switch (this.type) {
        default:
        case 'VIDEO':
          type = 'видео'
          break
        case 'FILM':
          type = 'фильм'
          break
        case 'TV_SERIES':
          type = 'сериал'
          break
        case 'MINI_SERIES':
          type = 'мини-сериал'
          break
        case 'TV_SHOW':
          type = 'шоу'
          break
      }
      return type + ' ' + this.nameRu
    }
  },
  watch: {
    isActive () {
      this.setCompactPlayer(this.isActive)
    }
  }
}
</script>

<style scoped>
.compact-player {
  width: 100vw;
  display: none;
  position: fixed;
  right: 0em;
  bottom: 44px;
  background: var(--base-navbar-bg);
  z-index: 1000;
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
