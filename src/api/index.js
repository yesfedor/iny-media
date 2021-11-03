// IMPOR API BACK (old secondary)
import API_MODULE_GLOBAL from './global'

// IMPORT API CHUNKS
import API_MODULE_FILES from './files'
import API_MODULE_SIMPLE_FORM from './simpleForm'
import API_MODULE_WATCH from './watch'

const Api = {
  ...API_MODULE_GLOBAL,
  ...API_MODULE_FILES,
  ...API_MODULE_SIMPLE_FORM,
  ...API_MODULE_WATCH
}

export default Api
