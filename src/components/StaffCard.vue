<template>
  <router-link :to="{ name: 'Name', params: { staff: staff.staffId } }" class="staff-card">
    <div class="staff-card__wrapper row">
      <div class="col-3">
        <div class="ratio ratio-1x1 rounded-lg img-thumbnail staff-card__poster" :style="`background-image: url(${staff.posterUrl})`"></div>
      </div>
      <div class="col-9 d-flex flex-column">
        <div class="staff-card__name">
          <strong>{{ name }}</strong>
          <span v-show="staff.professionText">({{ staff.professionText }})</span>
        </div>
        <span class="staff-card__description d-block">
          {{ staff.description }}
        </span>
        <a @click.stop :href="`https://www.kinopoisk.ru/name/${staff.staffId}/`" target="_blank" class="staff-card__profession-text d-block">Kinopoisk ID</a>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'StaffCard',
  props: {
    staff: {
      type: Object
    }
  },
  computed: {
    name () {
      return this.staff.nameRu || this.staff.nameEn || ''
    }
  }
}
</script>

<style>
.staff-card {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  text-decoration: none;
}

.staff-card__poster {
  background-clip: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.staff-card__name {
  display: flex;
  justify-content: space-between;
  color: var(--base-text-darker);
  margin-bottom: 1rem;
}

.staff-card__description {
  color: var(--base-text);
  margin-bottom: 0.25rem;
}

.staff-card__profession-text {
  margin-top: auto;
  color: var(--base-text);
}
</style>
