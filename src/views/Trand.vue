<template>
  <page-watch-cards
    :documentTitle="documentTitle"
    :layoutTitle="layoutTitle"
    :layoutData="layoutData"
    :layoutEmpty="layoutEmpty"
    :loader="loader"
  >
    <template #beforeTitle>
      <div class="trand__choice-wrapper">
        <app-button @click="selectType('FILM')" :class="(act === 'FILM' ? 'button__primary' : 'button__link') + ' me-3'">Фильмы</app-button>
        <app-button @click="selectType('TV_SERIES')" :class="(act === 'TV_SERIES' ? 'button__primary' : 'button__link') + ' ms-3'">Сериалы</app-button>
      </div>
    </template>
  </page-watch-cards>
</template>

<script>
import Api from '../api'
import PageWatchCards from '../layouts/PageWatchCards.vue'
import AppButton from '../components/AppButton.vue'

export default {
  name: 'Trand',
  components: {
    PageWatchCards,
    AppButton
  },
  data () {
    return {
      act: 'ALL',
      documentTitle: 'История просмотров',
      layoutTitle: 'В тренде',
      layoutData: [],
      layoutEmpty: 'Тренды пустуют',
      loader: 'loader'
    }
  },
  mounted () {
    this.loadTrand()
  },
  methods: {
    loadTrand () {
      Api.watchGetTrand(this.act).then(({ data }) => {
        this.loader = 'data'
        if (data?.code === 200) {
          this.layoutData = data?.content
        } else {
          /** @todo что тут делать ??? */
        }
      })
    },
    selectType (type) {
      if (type === this.act) type = 'ALL'
      this.act = type
      this.loader = 'loader'
      setTimeout(() => {
        this.loadTrand()
      }, 100)
    }
  }
}
</script>

<style scoped>
.trand__choice-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
</style>
