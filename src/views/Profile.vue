<template>
  <div class="container my-3">
    <div class="row justify-content-center">
       <div class="col-12 col-md-10 col-lg-6 col-xl-5 text-center">
         <div class="row profile">
           <div class="col-12 text-center profile__top">
             <span class="profile__title">С возвращением, {{user.name}}</span>
           </div>
           <div class="col-12 text-center my-2">
            <app-button class="button__primary mx-1" @click="goToastr()">Запустить</app-button>
            <app-button class="button__error_outline mx-1" @click="doLogout()">Выйти</app-button>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import Api from '../api/global'
import toastr from '../mixins/Toastr'
import AppButton from '../components/AppButton'

export default {
  name: 'Main',
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
    doLogout () {
      Api.logout(this)
    },
    goToastr () {
      toastr.info('Еще нечего запускать')
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
  font-weight: 500;
  color: var(--base-strong-darker);
  font-size: x-large;
}
.profile__button {
  border: 2px solid var(--complement-strong);
  background-color: var(--complement-strong);
  color: var(--base-weak);
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0.5em;
}
</style>
