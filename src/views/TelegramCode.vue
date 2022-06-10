<template>
  <div class="telegram-code container">
    <div class="row mt-5">
      <div class="col-10 offset-1 text-center">
        <template v-if="cryptCode && user.telegram">
          <div class="row">
            <div class="col-12">
              <h1>Оповещения в боте уже работают.</h1>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="col-12">
              <h4>Нажмите на кнопку ниже, чтобы активировать бота. после активации пройдет до шести часов и вы начнете получать сообщения о новых сериях</h4>
              <h4 class="mt-5">Если после нажатия бот не активировался, отправьте ему команду ниже:</h4>
              <h5 class="mt-5 telegram-code__command">/code {{ cryptCode }}</h5>
            </div>
          </div>
        </template>

        <br>
        <app-button @click="openBot" class="button__primary mt-3">@inymedia_bot</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '../api'
import AppButton from '../components/AppButton.vue'

export default {
  name: 'TelegramCode',
  components: { AppButton },
  data () {
    return {
      cryptCode: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'USER'
    })
  },
  mounted () {
    this.getCrypt()
  },
  methods: {
    getCrypt () {
      Api.getCrypt().then(res => {
        if (res.crypt) {
          this.cryptCode = res.crypt
        } else {
          Api.getCrypt().then(res => {
            if (res.crypt) {
              this.cryptCode = res.crypt
            }
          })
        }
      })
    },
    openBot () {
      const url = 'https://t.me/inymedia_bot'
      if (this.user.telegram) {
        window.open(url, '_blank')
      } else {
        window.open(url + '?start=/code ' + this.cryptCode, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.telegram-code__command {
  padding: 0.75rem 0.75rem;
  background-color: var(--alpha-base-weak);
}
</style>
