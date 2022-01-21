/**
 * @author Garanin Fedor <fedor@purplex.ru>
 * @namespace ThemeApp
 * @property {String} name - название текущей темы
 * @property {String} memory - название темы в памяти
 * @property {String} default - название темы по умолчанию
 * @property {Array} allow - название темы в памяти
 */
import { reactive } from '@vue/reactivity'
import ThemeTogglerIcon from './ThemeTogglerIcon.vue'

const ThemeApp = reactive({
  themes: {},
  allow: [],
  default: '',
  name: '',
  memory: '',
  specialPurposeOld: null,
  specialPurposeKey: 'newYear-2022reset',
  specialPurposeName: 'light',

  create () {
    this.$el = document.documentElement
    this.themes = {
      light: {
        icon: 'fal fa-sun'
      },
      dark: {
        icon: 'fal fa-moon'
      }
      /* newYear: {
        icon: 'fal fa-hat-winter'
      } */
    }
    this.allow = Object.keys(this.themes)
    this.default = this.allow[0]
    this.name = localStorage.getItem('Theme') || this.default
    this.memory = localStorage.getItem('Theme-Memory') || null
    this.specialPurposeOld = localStorage.getItem('Theme-SpecialPurpose') || null

    this.checkSpecialPurpose()
    this.mounted()
  },
  initSpecialPurpose () {
    // winter
  },
  checkSpecialPurpose () {
    if (this.specialPurposeOld !== this.specialPurposeKey) {
      this.name = this.specialPurposeName
      localStorage.setItem('Theme-SpecialPurpose', this.specialPurposeKey)
    }
  },
  mounted () {
    this.change(this.name)
  },
  change (name) {
    if (!this.allow.includes(name)) {
      console.log('[Vue $theme]: There is no such theme')
      return ''
    }

    this.name = name
    localStorage.setItem('Theme', name)
    this.$el.setAttribute('scheme', name)
  },
  toggle () {
    if (this.allow.length <= 1) return console.log('[Vue $theme]: Specify at least two theme to switch to')

    const N = this.allow.indexOf(this.name)
    const Nmax = this.allow.length - 1
    if (N === Nmax) this.change(this.allow[0])
    else this.change(this.allow[N + 1])
  },
  /**
   * @method remember
   * @description Запоминает текущую тему, что бы позже ее восстановить
   * @return {String} Возвращает запоминаемое значение темы
   */
  remember () {
    const memorableTheme = this.name
    localStorage.setItem('Theme-Memory', memorableTheme)
    this.memory = memorableTheme
    return memorableTheme
  },
  /**
   * @method restore
   * @description Восстанавливает тему, которая была в памяти ранее, либо первая при инициализации
   * @return {String} Возвращает значение темы
   */
  restore () {
    if (this.memory === null) {
      console.log('To use this.$theme.restore(), first use this.$theme.remember()')
      return ''
    }
    this.change(this.memory)
    return this.name
  },
  getIcon () {
    if (this.allow.length <= 1) return console.log('[Vue $theme]: Specify at least two theme to switch to')

    const N = this.allow.indexOf(this.name)
    const Nmax = this.allow.length - 1
    if (N === Nmax) return this.themes[this.allow[0]].icon
    else return this.themes[this.allow[N + 1]].icon
  }
})

const Theme = {
  install: (app) => {
    app.config.globalProperties.$theme = ThemeApp
    app.provide('theme', ThemeApp)
    ThemeApp.create()
    app.component('theme-toggler-icon', ThemeTogglerIcon)
  }
}

export default Theme
