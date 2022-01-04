import _ from 'lodash'

let isInited = false

let $app = null
let $thePreloader = null
let $theHeader = null
let $theWrapper = null
let $theFooter = null

const storeAppVar = {
  w_app: null,
  h_app: null,
  w_preloader: null,
  h_preloader: null,
  w_header: null,
  h_header: null,
  w_wrapper: null,
  h_wrapper: null,
  w_footer: null,
  h_footer: null
}

const _setAppVar = () => {
  // init elements
  if (!isInited) {
    isInited = !isInited
    $app = document.querySelector('.app')
    $thePreloader = document.querySelector('.the_preloader')
    $theHeader = document.querySelector('.the_header')
    $theWrapper = document.querySelector('.the_wrapper')
    $theFooter = document.querySelector('.the_footer')
  }

  // app
  if ($app.offsetWidth !== storeAppVar.w_app) {
    storeAppVar.w_app = $app.offsetWidth
    document.documentElement.style.setProperty('--w-app', $app.offsetWidth + 'px')
  }
  if ($app.offsetHeight !== storeAppVar.h_app) {
    storeAppVar.h_app = $app.offsetHeight
    document.documentElement.style.setProperty('--h-app', $app.offsetHeight + 'px')
  }

  // the_preloader
  if ($thePreloader.offsetWidth !== storeAppVar.w_preloader) {
    storeAppVar.w_preloader = $thePreloader.offsetWidth
    document.documentElement.style.setProperty('--w-preloader', $thePreloader.offsetWidth + 'px')
  }
  if ($thePreloader.offsetHeight !== storeAppVar.h_preloader) {
    storeAppVar.h_preloader = $thePreloader.offsetHeight
    document.documentElement.style.setProperty('--h-preloader', $thePreloader.offsetHeight + 'px')
  }

  // the_header
  if ($theHeader.offsetWidth !== storeAppVar.w_header) {
    storeAppVar.w_header = $theHeader.offsetWidth
    document.documentElement.style.setProperty('--w-header', $theHeader.offsetWidth + 'px')
  }
  if ($theHeader.offsetHeight !== storeAppVar.h_header) {
    storeAppVar.h_header = $theHeader.offsetHeight
    document.documentElement.style.setProperty('--h-header', $theHeader.offsetHeight + 'px')
  }

  // the_wrapper
  if ($theWrapper.offsetWidth !== storeAppVar.w_wrapper) {
    storeAppVar.w_wrapper = $theWrapper.offsetWidth
    document.documentElement.style.setProperty('--w-wrapper', $theWrapper.offsetWidth + 'px')
  }
  if ($theWrapper.offsetHeight !== storeAppVar.h_wrapper) {
    storeAppVar.h_wrapper = $theWrapper.offsetHeight
    document.documentElement.style.setProperty('--h-wrapper', $theWrapper.offsetHeight + 'px')
  }

  // the_footer
  if ($theFooter.offsetWidth !== storeAppVar.w_footer) {
    storeAppVar.w_footer = $theFooter.offsetWidth
    document.documentElement.style.setProperty('--w-footer', $theFooter.offsetWidth + 'px')
  }
  if ($theFooter.offsetHeight !== storeAppVar.h_footer) {
    storeAppVar.h_footer = $theFooter.offsetHeight
    document.documentElement.style.setProperty('--h-footer', $theFooter.offsetHeight + 'px')
  }
}

const setAppVar = _.debounce(_setAppVar, 1000)

export default setAppVar
