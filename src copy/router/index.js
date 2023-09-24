import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: function(to, from, savedPosition) {
      return new Promise((resolve, reject) => {
        if(to.name !== 'post') {
          if (savedPosition) {
            return resolve(savedPosition)
          } else {
            return resolve({ top: 0 })
          }
        }

        setTimeout(() => {
          if(to.query?.anchor == 'comments') {
            resolve({
              el: document.getElementById('comments'),
              behavior: 'smooth',
            })
          } else if (window.location.hash) {
            const hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
            resolve({
              el: document.getElementById(hash),
              behavior: 'smooth',
            })
          } else {
            if (savedPosition) {
              return resolve(savedPosition)
            } else {
              resolve({
                el: document.getElementById('search_box'),
                // behavior: 'smooth',
              })
            }
            // resolve({
            //   top: 0
            // })
          }
        }, 100)
      })
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  return Router
})
