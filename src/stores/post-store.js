import { defineStore } from 'pinia';
import axios from 'axios'

import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'



export const useStore = defineStore('post-store', {
  state: () => ({
    item: [],
    items_suggestion: [],

    x_wp_total: 0, // all at current filter
    x_wp_totalpages: 0, // all records
    current_page: 1,
    order: 'desc',
    per_page: 6,
    keyword: '',
    category: '',

    init: false,
    loading: false,
    loading_suggestion: false,
  }),
  getters: {
    get_post: (state) => {
      if(state.item.length <= 0) return []
      return state.item[0]
    },
    max_pages: (state) => {
      return Math.ceil(Number(state.x_wp_total) / Number(state.per_page))
    },
  },
  actions: {
    async onRetrievePost(payload = null) {
      const vm = this

      if (vm.loading) return

      vm.loading = true

      // console.log('onRetrievePost', payload)

      const items = await axios.get( `posts/${payload.id}`)
      // const items = await axios.get( `posts?slug=${payload.slug}`)
        .then(response => {
          // // console.log('response', response)
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
          // console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });
      // console.log('items', items)

      vm.loading = false

      if (!items) return

      vm.item = [ items?.data ]

      vm.init = true
    },

    async onRetrieveSuggestion(payload = null) {
      const vm = this

      if (vm.loading_suggestion) return

      vm.loading_suggestion = true

      // const items = await axios.get( `posts?per_page=6&rand`)
      const items = await axios.get(`posts?page=${vm?.current_page}&order=${vm?.order}&per_page=${vm?.per_page}`)
        .then(response => {
          // // console.log('response', response)
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
          // console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });
      // console.log('items', items)

      vm.loading_suggestion = false

      if (!items) return

      vm.items_suggestion = items?.data
      vm.x_wp_total = items?.headers['x-wp-total']
      vm.x_wp_totalpages = items?.headers['x-wp-totalpages']
    },
  },
});
