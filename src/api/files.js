import axios from 'axios'
import API_PATH_METHOD from './config'

const API_MODULE_FILES = {
  /** @description загрузить изображение */
  uploadImage: async (data) => {
    const fd = new FormData()
    fd.append('image', data)
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    return await axios.post(API_PATH_METHOD + 'file.imageUpload?v=1.0', fd, header)
  }
}

export default API_MODULE_FILES
