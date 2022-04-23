<template>
  <app-button @click="$position.toTop" class="top-button button__secondary" :class="isActive ? 'top-button_active' : ''">
    <i class="far fa-arrow-to-top fa-lg"></i>
  </app-button>
</template>

<script>
import AppButton from './AppButton.vue'
export default {
  name: 'TopButton',
  components: {
    AppButton
  },
  computed: {
    isActive () {
      return this.$position.clientY - this.$position.y < 0 && this.$position.bp > 3
    }
  }
}
</script>

<style>
.top-button {
  opacity: 0;
  display: block;
  width: 64px;
  height: 64px;
  position: fixed;
  border-radius: 100% !important;
  right: 3rem;
  bottom: 3rem;
  padding: 1rem;
  z-index: 5000;
}
.top-button_active {
  opacity: 1;
}
</style>
