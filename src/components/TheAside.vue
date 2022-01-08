<template>
  <div class="aside">
    <div class="aside__main">
      <div @click="$router.push({ name: 'Main' })" :class="$route.name === 'Main' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-home fa-lg"></i>
        <span class="aside__main-text">Главная</span>
      </div>
      <div @click="$router.push({ name: 'Trand' })" :class="$route.name === 'Trand' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-fire fa-lg"></i>
        <span class="aside__main-text">В тренде</span>
      </div>
      <div @click="$router.push({ name: 'Search' })" :class="$route.name === 'Search' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-compass fa-lg"></i>
        <span class="aside__main-text">Навигатор</span>
      </div>
      <div @click="$router.push({ name: 'SubscriptionsFeed' })" :class="$route.name === 'SubscriptionsFeed' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-th-list fa-lg"></i>
        <span class="aside__main-text">Новые серии</span>
      </div>
      <div @click="$router.push({ name: 'Subscriptions' })" :class="$route.name === 'Subscriptions' ? 'aside__main-item_active' : ''" class="aside__main-item">
        <i class="aside__main-icon fal fa-heart fa-lg"></i>
        <span class="aside__main-text">Подписки</span>
      </div>
    </div>
    <div class="aside__mobile">
      <div @click="$router.push({ name: 'Main' })" :class="$route.name === 'Main' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-home"></i>
        <span class="aside__mobile-text">Главная</span>
      </div>
      <div @click="$router.push({ name: 'Trand' })" :class="$route.name === 'Trand' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-fire"></i>
        <span class="aside__mobile-text">В тренде</span>
      </div>
      <div @click="$router.push({ name: 'Search' })" :class="$route.name === 'Search' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-compass"></i>
        <span class="aside__mobile-text">Навигатор</span>
      </div>
      <div @click="$router.push({ name: 'SubscriptionsFeed' })" :class="$route.name === 'SubscriptionsFeed' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-th-list"></i>
        <span class="aside__mobile-text">Новые серии</span>
      </div>
      <div @click="$router.push({ name: 'Subscriptions' })" :class="$route.name === 'Subscriptions' ? 'aside__mobile-item_active' : ''" class="aside__mobile-item">
        <i class="aside__mobile-icon fal fa-heart"></i>
        <span class="aside__mobile-text">Подписки</span>
      </div>
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
  background: var(--base-navbar-bg);
}
.aside__main-icon {
  text-align: center;
  width: 75px;
  color: var(--base-navbar-brand);
  margin: auto 0em;
}

.aside__main-item_active > .aside__main-icon {
  color: var(--base-navbar-color-active);
}
.aside__mobile-item_active > .aside__mobile-icon {
  color: var(--base-navbar-color-active);
}

.aside__main-text {
  text-align: start;
  width: 125px;
  color: var(--base-navbar-text);
  font-weight: 500;
  font-size: 0.9em;
}
.aside__mobile {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  background: var(--base-navbar-bg);
  border-top: 1px solid var(--base-navbar-line);
  z-index: 40;
}
.aside__mobile-item {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.aside__mobile-text {
  font-size: 0.5em;
  padding-top: 0.25em;
}
@media (min-width: 992px) {
  .aside__main {
    display: flex;
  }
  .aside__mobile {
    display: none;
  }
}
</style>
