<template>
  <router-link :to="{ name: 'Name', params: { staff: staff.staffId } }" class="staff-card">
    <div class="staff-card__wrapper">
      {{ staff.nameRu }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'StaffCard',
  props: {
    staff: {
      /*
      description: "постановщик",
      nameEn: "Samantha Harley",
      nameRu: "Саманта Харли",
      posterUrl: "https://kinopoiskapiunofficial.tech/images/actor_posters/kp/2175841.jpg",
      professionText: "Художники",
      staffId: 2175841
     */
      type: Object
    }
  }
}
</script>

<style>
.staff-card {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
}
</style>
