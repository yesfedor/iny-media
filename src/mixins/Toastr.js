/**
 * @param {HTMLDivElement} $el
 */
function ToastrSpawn ($el) {
  // with toastr opacity
  const $container = document.querySelector('.app__ui-system')
  $container.append($el)

  setTimeout(() => {
    $el.classList.add('toastr_visble')
  }, 100)

  setTimeout(() => {
    setTimeout(() => {
      $el.remove()
    }, 400)
    $el.classList.remove('toastr_visble')
  }, 2500)
}

/**
 * @param {String} type
 * @param {String} value
 */
function ToastrBuilder (type = 'info', value = 'Toastr') {
  const $el = document.createElement('div')
  const $content = document.createElement('span')
  const typesClass = {
    info: {
      tagClass: 'toastr__info'
    },
    error: {
      tagClass: 'toastr__error'
    },
    warn: {
      tagClass: 'toastr__warn'
    },
    success: {
      tagClass: 'toastr__success'
    }
  }

  $content.classList.add('toastr__text')
  $content.textContent = value

  $el.classList.add('toastr', typesClass[type].tagClass)
  $el.append($content)
  $el.onclick = () => {
    $el.remove()
  }

  ToastrSpawn($el)
}

const toastr = {
  info (value) {
    ToastrBuilder('info', value)
  },
  error (value) {
    ToastrBuilder('error', value)
  },
  warn (value) {
    ToastrBuilder('warn', value)
  },
  success (value) {
    ToastrBuilder('success', value)
  }
}

window.toastr = toastr

export default toastr
