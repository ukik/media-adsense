import { defineStore } from 'pinia';
import axios from 'axios'

import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

import { host, getPreviousDay } from 'src/boot/components';

export const useStore = defineStore('terms-of-use', {
  state: () => ({
    item: [],
    loading: false,
  }),
  getters: {
    get_post: (state) => {
      return state.item[0]
    },
  },
  actions: {
    async onRetrievePost(payload = null) {
      const vm = this

      if (vm.loading) return

      vm.loading = true

      const items = await axios.get(host + `pages?slug=terms-of-use`)
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
      console.log('items', items)

      vm.loading = false

      if (!items) return

      vm.item = items?.data
    },

  },
});
