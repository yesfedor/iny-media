import { reactive } from '@vue/reactivity'

/**
 * @author Garanin Fedor <fedor@purplex.ru>
 * @typedef {Object} PositionApp
 * @property {String} name - название текущей темы
 * @property {Number} x - положение скролинка x
 * @property {Number} y - положение скролинка x
 * @property {String('horizontal', 'portrait')} orientation - ориентация окна
 * @property {Number} breakpoint - breakpoint из сетки bootstarp 5
 * @property {Number} bp - breakpoint - сокращенная запись
 */

/** @type {PositionApp} */
const PositionApp = reactive({
  orientation: '',
  breakpoint: 0,
  bp: 0,
  clientX: 0,
  clientY: 0,
  create () {
    // scroll
    // orientation
    window.addEventListener('resize', this.onOrientation)

    setTimeout(() => {
      this.onOrientation()
    }, 1000)
  },
  onOrientation () {
    // 'horizontal', 'portrait'
    let orientation = ''
    if (window.innerWidth > window.innerHeight) orientation = 'portrait'
    else orientation = 'horizontal'
    this.orientation = orientation
    this.clientX = window.innerWidth
    this.clientY = window.innerHeight

    /* breakpoint
      xs: 0, 1
      sm: 576px, 2
      md: 768px, 3
      lg: 992px, 4
      xl: 1200px, 5
      xxl: 1400px 6
    */
    let breakpoint = 1
    if (window.innerWidth >= 576) breakpoint = 2
    if (window.innerWidth >= 768) breakpoint = 3
    if (window.innerWidth >= 992) breakpoint = 4
    if (window.innerWidth >= 1200) breakpoint = 5
    if (window.innerWidth >= 1400) breakpoint = 6

    this.breakpoint = breakpoint
    this.bp = breakpoint
  }
})

const Position = {
  install: (app) => {
    app.config.globalProperties.$position = PositionApp
    PositionApp.create()
  }
}

export default Position
