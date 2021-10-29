<template>
  <div class="zero-block theme">
    <div class="container">
      <div class="row zero-block__view theme">
        <!-- zero-block__view::1 -->
        <div v-if="page === 'start'" class="col-12">
          <div class="row zero-block__top">
            <div class="col-12 col-lg-12 zero-block__action">
              <h1 class="display-1 zero-block__title">
                Вам нужен сайт?
              </h1>
              <p class="h4 zero-block__p py-3 text-center">
                Ознакомьтесь с нашими услугами и преимуществами
              </p>
            </div>
          </div>
          <div class="row zero-block__bottom">
            <div class="col-12 col-lg-12 zero-block__callback text-center">
              <button @click="toMore()" class="btn btn-outline-light btn-lg mb-4 mb-sm-0 me-sm-4">
                Подробнее
              </button>
              <button @click="toRequest()" class="btn btn-link btn-lg zero-block__request">
                <i class="fal fa-bell pe-3"></i>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="request_screen" class="request-screen theme">
    <div class="container">
      <div class="row request-screen__view py-3 py-lg-0">
        <div class="col-12 col-lg-10 col-xl-8 mt-auto">
          <h2 class="h2 my-0 py-0">Оставить заявку</h2>
          <p class="mt-3 mb-0">Заполните и отправьте форму, после ее рассмотрения<br>мы свяжемся с вами для более детального обсуждения</p>
        </div>
        <div class="col-12">
          <div class="row align-items-center justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8 text-start py-3">
              <label for="requestInputEmail" class="form-label">Ваша почта</label>
              <input type="email" class="form-control" id="requestInputEmail" v-model="requestEmail">
            </div>
            <div class="col-12 col-lg-10 col-xl-8 text-start py-3">
              <label for="requestInputWho" class="form-label">Какое Юр/Физ лицо вы представляете</label>
              <input type="text" class="form-control" id="requestInputWho" v-model="requestWho">
            </div>
            <div class="col-12 col-lg-10 col-xl-8 text-start py-3">
              <label for="requestInputService" class="form-label">Какая услуга вас интересует</label>
              <input type="text" class="form-control" id="requestInputService" v-model="requestService">
            </div>
          </div>
        </div>
        <div v-if="!isRequestSend" class="col-12 mb-auto">
          <button @click="requestSend()" class="btn btn-outline-light btn-lg">{{requestAction}}</button>
        </div>
        <div v-else class="col-12 mb-auto">
          <h4 class="h3 my-0 py-0">Спасибо!</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../api'

export default {
  name: 'Main',
  data () {
    return {
      page: 'start',
      isRequestSend: false,
      requestEmail: '',
      requestWho: '',
      requestService: 'Сайт',
      requestAction: 'Отправить'
    }
  },
  mounted () {
    document.title = 'Purple X - Веб-студия для вашего бизнеса и проектов'
    this.aos()
  },
  unmounted () {
  },
  methods: {
    aos () {
      const status = setInterval(() => {
        // eslint-disable-next-line
        if (typeof AOS === 'object') {
          clearInterval(status)
          setTimeout(() => {
            // eslint-disable-next-line
            window.AOS.init()
          }, 2000)
        }
      }, 100)
    },
    requestSend () {
      setTimeout(() => {
        this.requestAction = 'Отправить'
      }, 1200)
      if (this.requestEmail === '' || this.requestWho === '' || this.requestService === '') {
        // eslint-disable-next-line
        this.requestAction = 'Заполните все поля'
        return false
      }

      const contactForm = {
        email: this.requestEmail,
        who: this.requestWho,
        service: this.requestService
      }
      const res = Api.contactFormSend(contactForm)
      res.then(({ data }) => {
        if (data.status) this.isRequestSend = true
      })
    },
    toMore () {
      this.page = 'two'
    },
    toRequest () {
      const scrollY = this.$refs.request_screen.scrollHeight
      window.scroll(0, scrollY)
    }
  }
}
</script>

<style scoped>
/* zero-block */
.zero-block {
  width: 100%;
  height: calc(100vh - var(--h-header));
  background: var(--accent-fancy-darker);
  border-top: var(--base-line-darker) solid 1px;
}
.zero-block__view {
  min-height: calc(100vh - var(--h-header));
}
.zero-block__top {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65vh
}
.zero-block__bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(35vh - var(--h-header))
}
.zero-block__action {
  text-align: center;
}
.zero-block__title {
  color: var(--base-weak-lighter);
  font-weight: 500;
  margin-bottom: 1rem;
}
.zero-block__p {
  line-height: 2.4rem;
  color: var(--base-weak);
}
.zero-block__callback {
  margin-top: 0;
}
.zero-block__request {
  color: var(--base-weak-lighter);
  text-decoration: unset;
}
.zero-block__request:hover {
  color: var(--base-weak-darker);
}

  /* second-screen */
.second-screen {
  display: flex;
  align-items: top;
  justify-content: center;
  width: 100%;
  height: calc(100vh - var(--h-header));
  background: var(--base-back);
}
.second-screen__title {
  margin-top: 5rem;
  color: var(--base-strong-darker);
}

  /* request-screen */
.request-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - var(--h-header));
  background-color: var(--base-back);
  background-image: var(--base-back);
}
.request-screen__view {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: var(--accent-strong-darker);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.125);
  min-height: calc(80vh - var(--h-header));
  color: white !important;
}

@media (max-width: 500px) {
  .request-screen__view {
    border-radius: 0rem !important;
  }
}
</style>
