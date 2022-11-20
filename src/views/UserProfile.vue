<template>
  <div>
    Profile
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../plugins/Auth'

export default {
  name: 'UserProfile',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const Api = useAuth()
    Api.install(1, {
      routerPush: routeName => {
        console.log('routeName: ', routeName)
        if (routeName === 'Current') router.push({ name: route.name })
      },
      storeCommit: (what, payload) => {
        console.log('storeCommit: ', what, payload)
      }
    })
    Api.mounted()
    console.log(Api)
  }
}
</script>
