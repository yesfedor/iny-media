<template>
  <i @click="toggle()" class="theme-toggler-icon" :class="$theme.getIcon()"></i>
</template>

<script>
export default {
  name: 'ThemeTogglerIcon',
  methods: {
    toggle () {
      this.$theme.toggle()
    }
  }
}
</script>

<style scoped>
.theme-toggler-icon {
  cursor: pointer;
}
</style>
