import axios from 'axios'
import API_PATH_METHOD from './config'

const API_MODULE_WATCH = {
  /** @description Получить информацию по kpid */
  watcDataByKpid: async (kpid, jwt) => {
    return await axios.get(API_PATH_METHOD + 'watch.getDataByKpid?v=1.0&kpid=' + kpid + '&jwt=' + jwt)
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
  },

  /** @description Быстрый поиск по запросу */
  watchFastSearch: async (query) => {
    return await axios.get(API_PATH_METHOD + 'watch.fastSearch?v=1.0&query=' + query)
  },

  watchGetSubscriptions: async (jwt, clientId) => {
    return await axios.get(API_PATH_METHOD + 'watch.getSubscriptions?v=1.0' + '&jwt=' + jwt + '&client_id=' + clientId)
  },

  watchGetUserHistory: async (jwt, clientId) => {
    return await axios.get(API_PATH_METHOD + 'watch.getUserHistory?v=1.0' + '&jwt=' + jwt + '&client_id=' + clientId)
  },

  watchGetTrand: async () => {
    return await axios.get(API_PATH_METHOD + 'watch.getTrand?v=1.0')
  },

  watchGetReviewsByKpid: async (kpid) => {
    return await axios.get(API_PATH_METHOD + 'watch.getReviews?v=1.0&kpid=' + kpid)
  },

  watchGetFacts: async (kpid) => {
    return await axios.get(API_PATH_METHOD + 'watch.getFacts?v=1.0&kpid=' + kpid)
  },

  watchSearchByFilters: async (country = false, genre = false, order = false, type = 'ALL', year = false, page = 1) => {
    let url = API_PATH_METHOD + 'watch.searchByFilters?v=1.0'

    if (country) url += '&country=' + country

    if (genre) url += '&genre=' + genre

    if (order) url += '&order=' + order

    if (type) url += '&type=' + type
    else url += '&type=ALL'

    if (year) url += '&year=' + year

    if (page) url += '&page=' + page
    else url += '&page=1'

    return await axios.get(url)
  },

  watchGetNameByStaffId: async (staff) => {
    return await axios.get(API_PATH_METHOD + 'watch.getNameByStaffId?v=1.0&staff=' + staff)
  }
}

export default API_MODULE_WATCH
