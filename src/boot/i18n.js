import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

import { useStore } from 'src/stores/GLOBAL';

export default boot( async ({ app, store, router, urlPath }) => {
  const global = useStore(store)

  console.log('urlPath', urlPath.substring(0, 3), urlPath.includes('/en'))

  const obj = {
    locale: function() {
      switch (urlPath.substring(0, 3)) {
        case '/id':
          global.setLocale('id-ID')
          return 'id-ID'
        case '/en':
          global.setLocale('en-US')
          return 'en-US'
      }
    }(),
    globalInjection: true,
    messages
  }

  const i18n = createI18n(obj)

  console.log('i18n obj', obj)

  app.use(i18n) // CUKUP SEKALI

  router.beforeEach(async (to, from, next) => {

    // WAJIB di sini agar bahasa singkron
    switch (to.params.locale) {
      case 'id':
        await global.setLocale('id-ID')
        break;
      case 'en':
        await global.setLocale('en-US')
        break;
    }


    next()
  })

  // SYNTAX wajib seperti ini
  // console.log('i18n beforeEach', global.locale)
  // console.log("i18n global.locale", global.locale)

})
