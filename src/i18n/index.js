import { createI18n } from 'vue-i18n'

// Сохраняем все языки сразу
import localeRu from './locale/ru'
import localeEn from './locale/en'

const messages = {
  ru: localeRu,
  en: localeEn
}

const localeDefault = localStorage.getItem('locale') || (navigator.language || navigator.userLanguage).substr(0, 2)
document.documentElement.setAttribute('lang', localeDefault)

const dateTimeFormats = {
  ru: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}

const i18n = createI18n({
  dateTimeFormats,
  locale: localeDefault,
  fallbackLocale: 'ru',
  messages
})

export default i18n
