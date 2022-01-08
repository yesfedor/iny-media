<template>
  <page-watch-cards
    :documentTitle="$route.params.query || 'Поиск'"
    :layoutTitle="layoutTitle"
    :layoutData="layoutData"
    :layoutEmpty="layoutEmpty"
    :loader="loader"
  ></page-watch-cards>
</template>

<script>
import Api from '../api'
import PageWatchCards from '../layouts/PageWatchCards.vue'

export default {
  name: 'SearchBox',
  components: {
    PageWatchCards
  },
  data () {
    return {
      documentTitle: 'Поиск',
      layoutTitle: 'Поиск',
      layoutData: [],
      layoutEmpty: 'По данному запросу ничего не найдено',
      loader: 'loader'
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    search () {
      this.loader = 'loader'
      Api.watchFastSearch(this.$route.params.query).then(({ data }) => {
        this.loader = 'data'

        if (data?.code === 200) {
          this.layoutTitle = data?.title
          this.layoutData = data?.content
        } else {
          this.loader = 'placeholder'
        }
      })
    }
  },
  watch: {
    '$route.params' () {
      this.search()
    }
  }
}
</script>
