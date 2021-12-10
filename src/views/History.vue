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
  name: 'History',
  components: {
    PageWatchCards
  },
  data () {
    return {
      documentTitle: 'История просмотров',
      layoutTitle: 'Ваша история просмотров',
      layoutData: [],
      layoutEmpty: 'Похоже, вы еще ничего не посмотрели',
      loader: 'loader'
    }
  },
  mounted () {
    const clientId = localStorage.getItem('client_id')
    const jwt = localStorage.getItem('jwt')
    Api.watchGetUserHistory(jwt, clientId).then(({ data }) => {
      this.loader = 'data'

      if (data?.code === 200) {
        this.layoutData = data?.content
      } else {
        /** @todo что тут делать ??? */
      }
    })
  }
}
</script>
