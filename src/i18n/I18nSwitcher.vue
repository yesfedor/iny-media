<i18n lang="yaml" locale="ru">
  locale: "Язык"
</i18n>

<i18n lang="yaml" locale="en">
  locale: "Language"
</i18n>

<template>
  <div class="dropdown locale">
    <button class="btn locale__toggle dropdown-toggle" type="button" id="localeTogglerMenu" data-bs-toggle="dropdown" aria-expanded="false">
      {{$t('locale')}}
    </button>
    <ul class="dropdown-menu dropdown-menu-start locale__menu" aria-labelledby="localeTogglerMenu">
      <li class="w-auto py-2">
        <a @click.prevent="change('ru')" class="dropdown-item locale__item" href="#">Русский</a>
      </li>
      <!--<li class="w-auto pb-2">
        <a  @click.prevent="change('en')" class="dropdown-item locale__item" href="#">English</a>
      </li>-->
    </ul>
  </div>
</template>

<script>
import changeLocale from './change'
export default {
  name: 'I18nSwitcher',
  methods: {
    change (locale) {
      changeLocale(this, locale)
    }
  }
}
</script>

<style scoped>
.locale {
  min-width: fit-content;
}
.locale__toggle {
  display: inline;
  color: var(--accent-weak);
}
.locale__toggle:hover {
  display: inline;
  color: var(--accent-weak);
}
.locale__menu {
  backdrop-filter: blur(4px) saturate(120%);
  -webkit-backdrop-filter: blur(4px) saturate(120%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  text-align: center;
}
.locale__item {
  display: inline;
  color: var(--accent-weak);
  padding-right: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.locale__item:hover {
  color: var(--accent-weak-lighter);
  background: none;
}

.locale__item:after {
  padding-left: 0.5rem;
  display: inline;
  content: '|';
}
.locale__item:last-child:after {
  display: inline;
  content: '';
}
</style>
