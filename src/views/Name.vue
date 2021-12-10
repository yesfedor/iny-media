<template>
  <page-watch-cards
    :documentTitle="documentTitle"
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
  name: 'Name',
  components: {
    PageWatchCards
  },
  data () {
    return {
      documentTitle: 'Актер',
      layoutTitle: 'Загрузка',
      layoutData: [],
      layoutEmpty: 'Такой участник ненайден',
      loader: 'loader'
    }
  },
  mounted () {
    Api.watchGetNameByStaffId(this.$route.params.staff).then(({ data }) => {
      this.loader = 'data'

      if (data?.code === 200) {
        document.title = data?.title
        this.layoutTitle = data?.title
        this.layoutData = data?.items
      } else {
        /** @todo что тут делать ??? */
      }
    })
  }
}
</script>
