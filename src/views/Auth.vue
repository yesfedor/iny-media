<template>
  <div class="container my-3">
    <div class="row justify-content-center">
      <!-- Auth::Login -->
      <div class="col-12 text-center">
        status: {{isAuth}}
      </div>
      <div class="col-12 col-md-10 col-lg-6 col-xl-5 text-center">
        <div class="row form-auth">
          <div class="col-12 text-center form-auth__top">
            <span class="form-auth__title">Войти</span>
          </div>
          <div class="col-12 text-center form-auth__wrapper">
            <div class="row">
              <div class="col-12 form-auth__content">
                <input id="login-email" type="email" class="form-auth__input" v-model="login.email">
                <label for="login-email">Email</label>
              </div>
              <div class="col-12 form-auth__content">
                <input id="login-password" type="password" class="form-auth__input" v-model="login.password">
                <label for="login-password">Password</label>
              </div>
            </div>
          </div>
          <div class="col-12 text-center form-auth__bottom">
            <button @click="doLogin()" class="form-auth__button">Войти</button>
          </div>
        </div>
      </div>
      <div class="col-12"></div>
      <!-- Auth::Register -->
      <div class="col-12 col-md-10 col-lg-6 col-xl-5 text-center">
        <div class="row form-auth">
          <div class="col-12 text-center form-auth__top">
            <span class="form-auth__title">Регистрация</span>
          </div>
          <div class="col-12 text-center form-auth__wrapper">
            <div class="row">
              <div class="col-12 form-auth__content">
                <input id="register-name" type="text" class="form-auth__input" v-model="register.name">
                <label for="register-name">Name</label>
              </div>
              <div class="col-12 form-auth__content">
                <input id="register-surname" type="text" class="form-auth__input" v-model="register.surname">
                <label for="register-surname">Surname</label>
              </div>
              <div class="col-12 form-auth__content">
                <input id="register-email" type="email" class="form-auth__input" v-model="register.email">
                <label for="register-email">Email</label>
              </div>
              <div class="col-12 form-auth__content">
                <input id="register-password" type="password" class="form-auth__input" v-model="register.password">
                <label for="register-password">Password</label>
              </div>
              <div class="col-12 form-auth__content">
                <input id="register-passwordRepeat" type="password" class="form-auth__input" v-model="register.passwordRepeat">
                <label for="register-passwordRepeat">Repeat password</label>
              </div>
            </div>
          </div>
          <div class="col-12 text-center form-auth__bottom">
            <button @click="doRegister()" class="form-auth__button">Продолжить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../interfaces/User'
import Api from '../api/global'
import Handler from '../api/handler'

export default {
  name: 'Auth',
  data () {
    return {
      /** @type {User}  */
      login: {
        email: '',
        password: ''
      },
      /** @type {User}  */
      register: {
        name: '',
        surname: '',
        gender: '',
        email: '',
        password: '',
        passwordRepeat: ''
      }
    }
  },
  mounted () {
    document.title = 'Авторизация'
  },
  methods: {
    goProfile () {
      this.$router.push({ name: 'Profile' })
    },
    doLogin () {
      if (!this.login.email || !this.login.password) return false
      Api.login(this, this.login.email, this.login.password).then(data => {
        if (data?.jwt) this.$store.commit('LOGIN', data?.jwt)
        if (data?.status) Handler.user(data?.status)
      })
    },
    doRegister () {
      if (!this.register.name || !this.register.surname || !this.register.gender || !this.register.email || !this.register.password || !this.register.passwordRepeat) return false
      if (this.register.password === this.register.passwordRepeat) return false
      Api.register(this, this.register.name, this.register.surname, this.register.email, this.register.gender, this.register.password)
    }
  },
  computed: {
    isAuth () {
      const isAuth = this.$store.getters.IS_AUTH
      if (isAuth) this.goProfile()
      return isAuth
    }
  }
}
</script>

<style scoped>
.form-auth {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 3em;
  padding: 1em;
  border:  1px var(--complement-strong) solid;
  border-radius: 0.5em;
}
.form-auth__top {
  padding: 1em 0px;
}
.form-auth__title {
  font-weight: 500;
  color: var(--base-strong);
  font-size: x-large;
}
.form-auth__content {
  margin: 1em 0em;
  position: relative;
  display: inline-block;
}
.form-auth__input {
  display: inline-block;
  width: 100%;
  padding: 10px 0 10px 15px;
  font-weight: 400;
  color: var(--base-strong-darker);
  background: var(--base-weak);
  border: 0;
  border-radius: 3px;
  outline: 0;
  text-indent: 60px;
  transition: all 0.3s ease-in-out;
}
.form-auth__input::-webkit-input-placeholder {
  color: var(--base-weak);
  text-indent: 0;
  font-weight: 300;
}
.form-auth__input + label {
  margin-left: 2em;
  margin-right: 2em;
  display: inline-block;
  position: absolute;
  top: 8px;
  left: 0;
  bottom: 8px;
  padding: 5px 15px;
  color: var(--base-strong);
  font-size: 11px;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  border-radius: 3px;
  background: var(--base-weak);
}
.form-auth__input + label:after {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 100%;
  left: 50%;
  transition: all 0.3s ease-in-out;
}
.form-auth__input:focus, .form-auth__input:active {
  color: var(--base-weak);
  text-indent: 0;
  background: var(--complement-strong);
}
.form-auth__input:focus::-webkit-input-placeholder, .form-auth__input:active::-webkit-input-placeholder {
  color: var(--base-weak);
}
.form-auth__input:focus + label, .form-auth__input:active + label {
  color: var(--base-weak);
  text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
  background: var(--complement-strong);
  transform: translateY(-40px);
}
.form-auth__input:focus + label:after, .form-auth__input:active + label:after {
  border-top: 4px solid var(--complement-strong);
}

.form-auth__bottom {
  padding: 1em 0em;
}
.form-auth__button {
  border: 2px solid var(--complement-strong);
  background-color: var(--complement-strong);
  color: var(--base-weak);
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0.5em;
}
</style>
