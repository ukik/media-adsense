import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://id.musikalindo.com/wp-json/wp/v2/' })

import { useStore } from 'src/stores/GLOBAL'

export const host_id = 'https://id.musikalindo.com/wp-json/wp/v2/' // 'http://wp-rest-api.local/wp-json/wp/v2/'//'https://api.imajora.labsnip.com/', 'https://api.imajora.labsnip.com/', //
export const host_en = 'https://en.musikalindo.com/wp-json/wp/v2/' // 'http://wp-rest-api.local/wp-json/wp/v2/'//'https://api.imajora.labsnip.com/', 'https://api.imajora.labsnip.com/', //

export default boot(({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const global = useStore(store)

  // app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  axios.interceptors.request.use( async function (config) {
    // default options

    // if(config.method == "post") {
    //     Loading.show()
    // }

    // cookies = process.env.SERVER
    //   ? Cookies.parseSSR(ssrContext)
    //   : Cookies // otherwise we're on client

    // console.log('boot/axios.js', cookies.getAll())

    // token = cookies.get('cubix_token') == null ? localStorage.getItem('conpas') : cookies.get('cubix_token')
    // csrf = store.getters['auth/auth_csrf'] // cookies.get('Conpas-Csrf') //
    // type = 'Bearer' //cookies.get('cubix_type')

    // axios.defaults.params = { 'csrf': csrf };

    // config.headers.common['Authorization'] = `${type} ${token}`
    // config.headers.common['Conpas-Csrf'] = csrf
    // config.headers.common['Conpas-Client'] = client

    // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // config.headers.post['Content-Type'] = 'multipart/form-data'
    // config.headers.post['Content-Type'] = 'application/json'
    // config.headers.post['Content-Type'] = 'application/pdf';

    // console.log('axios.interceptors.request', app.config.globalProperties.$api)
    // config['url'] = 'application/pdf';
    // console.log('axios.interceptors.request', config)

    // console.log(global.locale)

    if(config.method != "post") {

      // config['url'] = `${host_id}${config.url}`

      // if(config['url'].includes(host_id) || config['url'].includes(host_en)) {

        config['url'] = config['url'].replace(host_id,'')
        config['url'] = config['url'].replace(host_en,'')

        // config['url'] = config['url'].substring(str.indexOf("/v2/") + 1);

      // }

      switch (global.locale) {
        case 'id-ID':
          config['url'] = `${host_id}${config.url}`
          break;
        case 'en-US':
          config['url'] = `${host_en}${config.url}`
          break;
      }

    }
    // console.log('axios.interceptors.request', config['url'])

    return config
  }, function (error) {
    // Loading.hide()
    console.log('axios.interceptors.response error1', error.response)

    return Promise.reject(error)
  })

})

// export { api }
