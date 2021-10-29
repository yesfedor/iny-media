<template>
  <div class="zero-block theme">
    <div class="container">
      <div class="row zero-block__view theme">
        <!-- zero-block__view::1 -->
        <div class="col-12">
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
  height: calc(100vh - var(--h-header) - 1px);
  background: var(--accent-fancy-darker);
  border-top: var(--base-line-darker) solid 1px;
}
.zero-block__view {
  min-height: calc(100vh - var(--h-header) - 1px);
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

@media (max-width: 500px) {
  .request-screen__view {
    border-radius: 0rem !important;
  }
}
</style>
