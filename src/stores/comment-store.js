import { defineStore } from 'pinia';
import axios from 'axios'

import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

import { host, getPreviousDay } from 'src/boot/components';

export const useStore = defineStore('comment-store', {
  state: () => ({
    items: [],

    x_wp_total: 0, // all at current filter
    x_wp_totalpages: 0, // all records
    current_page: 1,
    order: 'desc',
    per_page: 10,
    post_id: '',

    loading: false,
  }),
  getters: {
    max_pages: (state) => {
      return Math.ceil(Number(state.x_wp_total) / Number(state.per_page))
    },
  },
  actions: {

    async onRetrieveComment(payload = null) {
      const vm = this

      if(vm.loading) return

      vm.loading = true

      if(payload) {
        // vm.current_page = payload?.current_page
        // vm.order = payload?.order
        // vm.per_page = payload?.per_page
        vm.post_id = payload?.post_id
      }

      const items = await axios.get(host+`comments?page=${vm?.current_page}&order=${vm?.order}&per_page=${vm?.per_page}`, {
        params: {
          post: vm.post_id
        }
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
      // console.log('items', items)

      vm.loading = false

      if(!items) return

      vm.items = items?.data
      vm.x_wp_total = items?.headers['x-wp-total']
      vm.x_wp_totalpages = items?.headers['x-wp-totalpages']
    },
  },
});
