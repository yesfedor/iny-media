<template>
  <div class="aside">
    <div class="aside__main">
      <div @click="$router.push({ name: 'Main' })" :class="$route.name === 'Main' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-sun fa-lg"></i>
        <span class="aside__main-text">Главная</span>
      </div>
      <div @click="$router.push({ name: 'Trand' })" :class="$route.name === 'Trand' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-sun fa-lg"></i>
        <span class="aside__main-text">В тренде</span>
      </div>
      <div @click="$router.push({ name: 'Search' })" :class="$route.name === 'Search' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-sun fa-lg"></i>
        <span class="aside__main-text">Навигатор</span>
      </div>
      <div @click="$router.push({ name: 'SubscriptionsFeed' })" :class="$route.name === 'SubscriptionsFeed' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-sun fa-lg"></i>
        <span class="aside__main-text">Новые серии</span>
      </div>
      <div @click="$router.push({ name: 'Subscriptions' })" :class="$route.name === 'Subscriptions' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-sun fa-lg"></i>
        <span class="aside__main-text">Подписки</span>
      </div>
    </div>
    <div class="aside__mobile">
      <span class="aside__mobile-item"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheAside'
}
</script>

<style scoped>
.aside {
  display: block;
}
.aside__main {
  display: none;
  width: 100%;
  height: 100%;
  background: var(--base-navbar-bg);
  backdrop-filter: blur(12px);
  border-right: 1px solid var(--base-navbar-line);
  z-index: 40;
  flex-direction: column;
}
.aside__main-item {
  cursor: pointer;
  padding: 1em 0em;
  border-bottom: 1px solid var(--base-navbar-line);
}
.aside__main-item_active {
  background: var(--base-navbar-bg-active);
}
.aside__main-icon {
  color: var(--base-navbar-brand);
  padding: 0em 0.625em;
  padding-left: 1.25em;
}
.aside__main-text {
  color: var(--base-navbar-text);
  padding: 0em 0.625em;
  font-weight: 500;
}
.aside__mobile {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: var(--base-navbar-bg);
  border-top: 1px solid var(--base-navbar-line);
  z-index: 40;
}

@media (min-width: 1200px) {
  .aside__main {
    display: flex;
  }
  .aside__mobile {
    display: none;
  }
}
</style>
