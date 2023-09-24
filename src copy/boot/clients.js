import { boot } from 'quasar/wrappers'

import {VueRecaptcha} from 'vue-recaptcha';

export default boot(({ app, store, ssrContext }) => {
  app.component('VueRecaptcha', VueRecaptcha)
})
