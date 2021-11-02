/**
 * @typedef {Object} API_CONFIG
 * @property {String} protocol - протокол сервера API
 * @property {String} host - хост сервера API
 * @property {String} pathname - локальный адрес API
*/

/** @type {API_CONFIG} */
const API_CONFIG = {
  protocol: 'https:',
  host: 'iny.su',
  pathname: 'api/method/'
}

/**
 * @readonly
 * @type {String}
 */
const API_PATH_METHOD = `${API_CONFIG.protocol}//${API_CONFIG.host}/${API_CONFIG.pathname}`

export default API_PATH_METHOD
