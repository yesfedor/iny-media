export default function (vm, locale) {
  document.documentElement.setAttribute('lang', locale)

  localStorage.setItem('locale', locale)
  vm.$root.$i18n.locale = locale
}
