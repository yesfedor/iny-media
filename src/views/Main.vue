<template>
  <div class="container"></div>
</template>

<script>
export default {
  name: 'Main',
  mounted () {
    document.title = 'INY Media (Aplha)'
    if (this.$store.getters.IS_AUTH) this.$router.push({ name: 'Profile' })
    else this.$router.push({ name: 'Auth' })
  }
}
</script>
