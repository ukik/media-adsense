import { defineStore } from 'pinia';
import axios from 'axios'
// import { useRouterStore } from 'src/stores/router-store'
import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

// import { errorNotify } from 'src/boot/client_side';

import { host } from 'src/boot/components';

export const useStore = defineStore('GLOBAL', {
  state: () => ({
    isLocaleInstalled: false,
    locale: 'id-ID',

    categories: [],
    tags: [],
    items_random: [],

    loading: false,
    loading_categories: false,
    loading_tags: false,

    init_categories: false,
    init_tags: false,
  }),
  getters: {
    // max_pages: (state) => {
    //   return Math.ceil(Number(state.x_wp_total) / Number(state.per_page))
    // }
  },
  actions: {
    async setLocale(val = null) {
      if(!val) return
      this.locale = val
    },
    async setLocaleInstalled(val) {
      // if(!isLocaleInstalled) return
      this.isLocaleInstalled = val
    },

    async onGlobalPost(payload = null) {
      const vm = this

      if(vm.loading) return

      vm.loading = true

      const items = await axios.get(host+`posts?per_page=6&rand`)
        .then(response => {
          // console.log('response', response)
          return response
        })
        .catch(error => {
          Notify.create({
            message: "Failed",
            caption: error.response.data?.message,
            icon: "error",
            color: "red",
            position: "top",
          })
          // this.errorMessage = error.message;
          console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });

      vm.loading = false

      if(!items) return

      vm.items_random = items?.data
    },

    async onGlobalCategories(payload = null) {
      const vm = this

      if(vm.init_categories) return
      if(vm.loading_categories) return

      vm.loading_categories = true

      const items = await axios.get(host+`categories`,{
          // params: {
          //   ID: 12345
          // }
        })
        .then(response => {
          // console.log('response', response)
          return response
        })
        .catch(error => {
          Notify.create({
            message: "Failed",
            caption: error.response.data?.message,
            icon: "error",
            color: "red",
            position: "top",
          })
          // this.errorMessage = error.message;
          console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });

      vm.loading_categories = false

      if(!items) return

      vm.init_categories = true

      vm.categories = items?.data
    },
    async onGlobalTags(payload = null) {
      const vm = this

      if(vm.init_tags) return
      if(vm.loading_tags) return

      vm.loading_tags = true

      const items = await axios.get(host+`tags`,{
          // params: {
          //   ID: 12345
          // }
        })
        .then(response => {
          // console.log('response', response)
          return response
        })
        .catch(error => {
          Notify.create({
            message: "Failed",
            caption: error.response.data?.message,
            icon: "error",
            color: "red",
            position: "top",
          })
          // this.errorMessage = error.message;
          console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });

      vm.loading_tags = false

      if(!items) return

      vm.init_tags = true

      vm.tags = items?.data
    },
  },
});
