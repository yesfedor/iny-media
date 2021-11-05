import axios from 'axios'
import API_PATH_METHOD from './config'

const API_MODULE_WATCH = {
  /** @description Получить информацию по kpid */
  watcDataByKpid: async (kpid) => {
    return await axios.get(API_PATH_METHOD + 'watch.getDataByKpid?v=1.0&kpid=' + kpid)
  },

  /** @description Получить рекомендации по kpid */
  watchRecommendationsDataByKpid: async (kpid) => {
    return await axios.get(API_PATH_METHOD + 'watch.getRecommendationsDataByKpid?v=1.0&kpid=' + kpid)
  },

  /** @description Поулчить данные для kpid по uid */
  watchUserRecord: async (kpid, jwt, clientId) => {
    return await axios.get(API_PATH_METHOD + 'watch.getUserRecord?v=1.0&kpid=' + kpid + '&jwt=' + jwt + '&client_id=' + clientId)
  },

  /** @description subscribeManager подписать или отписать пользователя */
  watchSubscribeManager: async (act, kpid, jwt, clientId) => {
    return await axios.get(API_PATH_METHOD + 'watch.subscribeManager?v=1.0&act=' + act + '&kpid=' + kpid + '&jwt=' + jwt + '&client_id=' + clientId)
  }
}

export default API_MODULE_WATCH
