<template>
  <Teleport :to="playerTarget">
    <iframe :class="playerClass" :src="getPlayerSrc" allowfullscreen frameborder="0"></iframe>
  </Teleport>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppPlayer',
  computed: {
    ...mapGetters({
      getPlayerTarget: 'getPlayerTarget',
      getPlayerSrc: 'getPlayerSrc',
      isPlayerCompact: 'isPlayerCompact'
    }),
    playerTarget () {
      const targetSelectors = {
        init: '.app__ui-player-init',
        pageWatch: '.app__ui-player-page-watch',
        pageWatch2: '.app__ui-player-page-watch-2',
        compact: '.app__ui-player-compact'
      }
      return targetSelectors[this.getPlayerTarget] || targetSelectors.init
    },
    playerClass () {
      if (this.isPlayerCompact) {
        return 'compact-player__video'
      }
      return 'watch__player'
    }
  }
}
</script>
