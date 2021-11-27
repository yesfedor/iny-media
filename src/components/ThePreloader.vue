<i18n lang="yaml" locale="ru">
  slogan: "Онлайн - кинотеатр"
</i18n>

<i18n lang="yaml" locale="en">
  slogan: "Online cinema"
</i18n>

<template>
  <div class="preloader">
    <div class="preloader__view">
      <h1 class="preloader__title">INY Media</h1>
      <h4 class="preloader__subtitle">{{$t('slogan')}}</h4>
      <h5 class="preloader__subtitle">Загрузка ресурсов...</h5>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--accent-fancy-darker);
}
.preloader__view {
  width: 100%;
  height: auto;
  margin: auto;
  padding: auto;
  text-align: center;
}
.preloader__title {
  margin-bottom: 3rem;
  color: var(--accent-weak-lighter);
}
.preloader__subtitle {
  color: var(--accent-weak);
}
</style>
