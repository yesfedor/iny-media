<i18n lang="yaml" locale="ru">
  page_title: "Такой страницы не существует"
  page_text: "Такой страницы не существует"
</i18n>

<i18n lang="yaml" locale="en">
  page_title: "Page not found"
  page_text: "Page not found"
</i18n>

<template>
  <div class="container app__page_not-found page-not-found">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="my-0 page-not-found__title">{{$t('page_text')}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  mounted () {
    document.title = this.$t('page_title')
  }
}
</script>

<style scoped>
.app__page_not-found {
  margin-top: 5em;
}
.page-not-found__title {
  color: var(--base-strong-darker);
}
</style>
