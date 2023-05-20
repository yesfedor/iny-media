import { createApp } from 'vue'
import App from './App.vue'
import 'highlight.js/styles/monokai.css'
import router from './router'
import store from './store'
import i18n from './i18n'
import I18nSwitcher from './i18n/I18nSwitcher.vue'

// Base styles
import './main.css'

// Mixins
import './mixins/Toastr.css'

// Theme styles and mixin
import './helpers/Theme/pallets.css'
import './helpers/Theme/theme.css'
import Theme from './helpers/Theme'

// Position
import Position from './helpers/Position'

/**
 * redirects
*/
if (process.env.NODE_ENV === 'production') {
  if (document.location.protocol === 'http:' && document.location.hostname === 'iny.su') {
    document.location.href = document.location.href.replaceAll('http:', 'https:')
    console.log('Use 443 port')
  }
  if (document.location.hostname !== 'iny.su') {
    document.location.href = document.location.href.replaceAll(document.location.hostname, 'iny.su')
  }
}

/**
 * @desc Добавялет скрипт в body
 * @param {String} url
 * @param {Object} data
 */
function importRemoteScript (url, data = {}) {
  const Script = document.createElement('script')
  Script.setAttribute('src', url)
  for (const attribute in data) {
    Script.setAttribute(attribute, data[attribute])
  }
  document.body.append(Script)
}

/* Bootstrap 5 */
importRemoteScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js', {
  integrity: 'sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe',
  crossorigin: 'anonymous'
})

/* AOS 5 */
importRemoteScript('https://unpkg.com/aos@2.3.1/dist/aos.js')

// createApp Vue3
createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .component('i18n-switcher', I18nSwitcher)
  .use(Theme)
  .use(Position)
  .mount('.app')
