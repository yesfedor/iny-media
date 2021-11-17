<template>
  <div ref="infinite_flag" class="infinite-flag">
    <app-loader :code="loaderCode"></app-loader>
  </div>
</template>

<script>
import AppLoader from './AppLoader.vue'

export default {
  name: 'InfiniteFlag',
  components: {
    AppLoader
  },
  props: {
    status: {
      required: true,
      type: String,
      default: 'off'
    }
  },
  data () {
    return {
      loaderCode: 'loader'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.setVisibleFn)
    setTimeout(() => {
      this.setVisibleFn()
    }, 100)
    setTimeout(() => {
      this.setVisibleFn()
    }, this.$store.getters.PRELOADER_OFFSET)
  },
  unmounted () {
    window.removeEventListener('scroll', this.setVisibleFn)
  },
  methods: {
    setVisibleFn () {
      if (this.$position.isVisible(this.$refs.infinite_flag) && this.status) {
        this.isVisible = true
        this.$emit('status', 'on')
      } else {
        this.isVisible = false
        this.$emit('status', 'off')
      }
    }
  }
}
</script>

<style scoped>
.infinite-flag {
  display: block;
}
</style>
