<template>
  <div class="container main">
    <div class="row">
      <div class="col-12 text-center main__wrapper">
        <h1 class="main__title">Добро пожаловать на INY Media</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  mounted () {
    document.title = 'INY Media (Aplha)'
  }
}
</script>

<style scoped>
.main__wrapper {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1.5em;
}
.main__title {
  color: var(--faint-weak-darker);
  margin: 0;
}
</style>
