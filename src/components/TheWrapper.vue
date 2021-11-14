<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TheWrapper',
  data () {
    return {}
  },
  mounted () {},
  unmounted () {}
}
</script>
