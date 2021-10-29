<template>
  <div class="zero-block">
    <div class="container-fluid">
      <div class="row zero-block__view">
        <div class="col-12 col-lg-6 zero-block__action">
          <h1 class="zero-block__title">Привет друг!</h1>
          <h1 class="zero-block__title">Привет друг!</h1>
          <h1 class="zero-block__title">Привет друг!</h1>
          <h1 class="zero-block__title">Привет друг!</h1>
          <h1 class="zero-block__title">Привет друг!</h1>
          <h1 class="zero-block__title">Привет друг!</h1>
        </div>
        <div class="d-none d-lg-block col-lg-6 zero-block__preview">
          <h1 class="zero-block__title">Привет друг!</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="second-screen">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-6"></div>
        <div class="d-none d-lg-block col-lg-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {}
  },
  mounted () {
    document.title = 'Purple X - О компании'
  },
  unmounted () {
  }
}
</script>

<style scoped>
.zero-block {
  width: 100%;
  height: calc(100vh - 56px);
  background: var(--compliment-fancy-darker);
  border-top: var(--base-line-darker) solid 1px;
}
.zero-block__title {
  color: var(--base-strong)
}
.zero-block__view {
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 56px * 3);
}
.zero-block__action {
  text-align: center;
}
.zero-block__preview {
  text-align: left;
}
.second-screen {
  width: 100%;
  height: calc(100vh - 56px);
  background: var(--complement-fancy-darker);
  border-top: var(--base-line-lighter) solid 1px;
}
</style>
