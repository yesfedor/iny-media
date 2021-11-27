import importRoutes from './routes'

function processingRoutes (ctx = false) {
  const routes = importRoutes
  if (ctx === false) return routes
  if (!ctx?.$router) return routes

  // delete old
  routes.forEach((item) => {
    if (item?.name) ctx.$router.removeRoute(item?.name)
  })

  // processing
  const profileSettingFeedToMain = localStorage.getItem('profileSettingFeedToMain')
  if (profileSettingFeedToMain === 'true') {
    routes.map(item => {
      if (item?.name === 'Main') {
        item.name = 'SubscriptionsFeed'
      } else if (item?.name === 'SubscriptionsFeed') {
        item.name = 'Main'
      }
      return item
    })
  }

  // add new
  routes.forEach((item) => {
    if (item?.name) ctx.$router.addRoute(item)
  })

  return routes
}

export default processingRoutes
