<template>
  <div class="container my-3">
    <div class="row justify-content-center">
       <div class="col-12 col-md-10 col-lg-6 col-xl-5 text-center">
         <div class="row profile">
           <div class="col-12 text-center profile__top">
             <span class="profile__title">Настройки</span>
           </div>
           <div class="col-12 mb-2">
             <div class="profile__action"></div>
           </div>
           <div class="col-12 text-center my-2">
            <app-button class="button__error_outline mx-1" @click="goBack()">Назад</app-button>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import AppButton from '../components/AppButton'

export default {
  name: 'ProfileSettings',
  components: {
    AppButton
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'Profile' })
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
