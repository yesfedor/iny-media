import axios from 'axios'
import API_PATH_METHOD from './config'

const API_MODULE_SIMPLE_FORM = {
  /** @description отправить заявку на обратную связь */
  contactFormSend: async (data) => {
    return await axios.post(API_PATH_METHOD + 'mail.mainRequest?v=1.0', data)
  }
}

export default API_MODULE_SIMPLE_FORM
