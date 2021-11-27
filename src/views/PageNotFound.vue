<template>
  <div class="container px-0 px-lg-auto">
    <div class="app__error">
      <h1 class="app_error-title">Такой страницы нет</h1>
      <app-button @click="toMain()" class="button__primary">На главную</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '../components/AppButton.vue'
export default {
  components: { AppButton },
  name: 'Main',
  methods: {
    toMain () {
      this.$router.push({ name: 'Main' })
    }
  }
}
</script>

<style scoped>
.app__error {
  margin-top: 3em;
  display: block;
  text-align: center;
}

.app_error-title {
  font-size: xx-large;
  margin-bottom: 1em;
}
</style>
