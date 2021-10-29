<i18n lang="yaml" locale="ru">
  page_title: "Авторизация"
</i18n>

<i18n lang="yaml" locale="en">
  page_title: "Авторизация"
</i18n>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        Авторизация
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {}
  },
  mounted () {
    document.title = this.$t('page_title')
  }
}
</script>
