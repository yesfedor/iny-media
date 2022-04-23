import { reactive } from '@vue/reactivity'
import _ from 'lodash'
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
  y: 0,

  toTop () {
    const $el = document.querySelector('.wrapper__content')
    $el.scrollTo({ top: 0, behavior: 'smooth' })
  },

  create () {
    const wrapperContentSupport = () => {
      const $el = document.querySelector('.wrapper__content')
      if (!$el) return false

      const event = new Event('scroll')
      const _listener = () => {
        this.y = $el.scrollTop
        window.dispatchEvent(event)
      }
      $el.addEventListener('scroll', _.debounce(() => {
        _listener()
      }, 300))
    }
    // scroll
    // orientation
    const onOrientationEvent = () => {
      this.onOrientation()
    }
    window.addEventListener('resize', onOrientationEvent)

    setTimeout(() => {
      this.onOrientation()
      wrapperContentSupport()
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
  },
  isVisible (target) {
    const targetPosition = {
      top: window.pageYOffset + target?.getBoundingClientRect()?.top,
      left: window.pageXOffset + target?.getBoundingClientRect()?.left,
      right: window.pageXOffset + target?.getBoundingClientRect()?.right,
      bottom: window.pageYOffset + target?.getBoundingClientRect()?.bottom
    }
    const windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    }

    if (targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right) {
      return true
    } else {
      return false
    }
  }
})

const Position = {
  install: (app) => {
    app.config.globalProperties.$position = PositionApp
    PositionApp.create()
  }
}

export default Position
