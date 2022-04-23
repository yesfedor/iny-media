<template>
  <div class="watch-staff">
    <div class="watch-staff__pre-action pre-action">
      <span class="pre-action__title">Личный состав</span>
      <app-button @click="toggle" class="button__link">{{ isShow ? 'Скрыть' : 'Показать' }}</app-button>
    </div>
    <app-loader v-if="isShow" :code="loader">
      <div class="watch-staff__wrapper">
        <div class="watch-staff__item">
          <span class="watch-staff__item-title">Актеры</span>
        </div>
      </div>
      <template #placeholder>
        <div class="watch-staff__not-found">asd</div>
      </template>
    </app-loader>
  </div>
</template>

<script>
import '@egjs/vue3-flicking/dist/flicking.css'
import Api from '../api'
import AppButton from './AppButton.vue'
import AppLoader from './AppLoader.vue'
// import StaffCard from './StaffCard.vue'

export default {
  name: 'WatchStaff',
  components: {
    AppLoader,
    AppButton
    // StaffCard
  },
  props: {
    kinopoiskId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isInit: false,
      loader: 'loader',
      isShow: false,
      staff: {
        ACTOR: [],
        DESIGN: [],
        PRODUCER: []
      }
    }
  },
  mounted () {
    this.setStaffList()
  },
  methods: {
    toggle () {
      this.isShow = !this.isShow
    },
    setStaffList () {
      Api.watchGetStaffByKpid(this.kinopoiskId).then(({ data }) => {
        if (typeof data !== 'object') {
          this.loader = 'placeholder'
          return false
        }
        if (data?.code !== 200) {
          this.loader = 'placeholder'
          return false
        }
        if (data?.staff?.ACTOR) {
          this.staff.ACTOR = data?.staff?.ACTOR.slice(0, 10)
        }
        if (data?.staff?.DESIGN) {
          this.staff.DESIGN = data?.staff?.DESIGN.slice(0, 10)
        }
        if (data?.staff?.PRODUCER) {
          this.staff.PRODUCER = data?.staff?.PRODUCER.slice(0, 10)
        }
        if (this.staff.ACTOR.length || this.staff.DESIGN.length || this.staff.PRODUCER.length) {
          this.loader = 'data'
          this.staff = Object.assign({}, this.staff)
          console.log(this.staff)
          return true
        }
        this.loader = 'placeholder'
        return false
      })
    }
  }
}
</script>

<style scoped>
.watch-staff {
  display: flex;
  flex-direction: column;
}
.pre-action {
  margin: 1rem 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.pre-action__title {
  display: block;
  font-size: large;
}
.watch-staff__wrapper {
  margin: 1rem 0.5em;
  display: block;
}
.watch-staff__item {
  margin-bottom: 1rem;
}
.watch-staff__item-title {
  display: block;
  text-align: center;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}
.watch-staff__staff-wrapper {
  padding: 0 0.5rem;
}
@media (min-width: 992px) {
  .watch-staff {
    border: 1px solid var(--base-weak-darker);
  }
  .pre-action {
    justify-content: space-between;
  }
}
</style>
