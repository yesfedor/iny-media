<template>
  <div class="app__loader">
    <div v-if="code === 'loader'" class="app__loader-wrapper">
      <slot name="loader">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </slot>
    </div>
    <slot v-if="code === 'data'"></slot>
    <slot v-if="code === 'placeholder'" name="placeholder"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    /**
     * @type {String} - data (данные), loader (загрузччик), placeholder (404)
     */
    code: {
      required: true,
      type: String,
      default: 'loader'
    },
    isLazy: {
      required: false,
      type: Boolean,
      default: false
    },
    height: {
      required: false,
      type: String,
      default: 'auto'
    },
    display: {
      required: false,
      type: String,
      default: 'block'
    }
  }
}
</script>
<style scoped>
.app__loader {
  display: v-bind(display);
  width: 100%;
  height: v-bind(height);
}
.app__loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.spinner-border {
  color: var(--accent-strong);
}
</style>
