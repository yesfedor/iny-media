<template>
  <div class="container my-3">
    <div class="row justify-content-center">
       <div class="col-12 col-md-10 col-lg-6 col-xl-5 text-center">
         <div class="row profile">
           <div class="col-12 text-center profile__top">
             <span class="profile__title">С возвращением, {{user.name}}</span>
             <span class="profile__text">У вас активная подписка до 05.11.2025</span>
           </div>
           <div class="col-12 mb-2">
             <div class="profile__action">
               <app-button @click="toSettings()" class="button__link">Настройки</app-button>
               <app-button @click="toSearchByFilters()" class="d-block button__link">Поиск по фильтрам</app-button>
               <app-button @click="toTrand()" class="d-block button__link">В тренде</app-button>
               <app-button @click="toSubscription()" class="d-block button__link">Подписки</app-button>
               <app-button @click="toHistory()" class="d-block button__link">История просмотров</app-button>
             </div>
           </div>
           <div class="col-12 text-center my-2">
            <app-button class="button__error_outline mx-1" @click="doLogout()">Выйти</app-button>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import Api from '../api/global'
import AppButton from '../components/AppButton'

export default {
  name: 'Profile',
  components: {
    AppButton
  },
  data () {
    return {}
  },
  mounted () {
    document.title = 'Профиль'
  },
  methods: {
    toSearchByFilters () {
      this.$router.push({ name: 'Search' })
    },
    toTrand () {
      this.$router.push({ name: 'Trand' })
    },
    toSubscription () {
      this.$router.push({ name: 'SubscriptionsFeed' })
    },
    toHistory () {
      this.$router.push({ name: 'History' })
    },
    toSettings () {
      this.$router.push({ name: 'ProfileSettings' })
    },
    doLogout () {
      Api.logout(this)
    }
  },
  computed: {
    user () {
      return this.$store.getters.USER
    }
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 3em;
  padding: 1em;
  border:  1px var(--accent-strong) solid;
  border-radius: 0.5em;
}
.profile__top {
  padding: 1em 0px;
}
.profile__title {
  display: block;
  font-weight: 500;
  color: var(--base-strong-darker);
  font-size: x-large;
}
.profile__text {
  display: block;
  margin-top: 1em;
  font-weight: 500;
  color: var(--base-strong);
  font-size: larger;
}
.profile__action {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
