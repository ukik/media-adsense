import { defineStore } from 'pinia';
import axios from 'axios'
// import { useRouterStore } from 'src/stores/router-store'
import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

// import { errorNotify } from 'src/boot/client_side';



export const useStore = defineStore('home-store', {
  state: () => ({
    items: [],
    items_category: [],
    items_date: [],

    x_wp_total: 0, // all at current filter
    x_wp_totalpages: 0, // all records
    current_page: 1,
    order: 'desc',
    per_page: 20,
    keyword: '',
    category: '',
    date:'',

    loading: false,
    loading_categories: false,
    loading_date: false,
  }),
  getters: {
    max_pages: (state) => {
      return Math.ceil(Number(state.x_wp_total) / Number(state.per_page))
    },
  },
  actions: {
    async onRetrieve(payload = null) {
      const vm = this

      // console.log('x_wp_total', vm.x_wp_total)
      // console.log('max_pages', vm.max_pages*vm.per_page)

      if(vm.loading) return

      vm.loading = true
      // &_fields=x_author,id,x_featured_media_medium,title,modified,x_categories,x_tags,categories,tags
      // beberapa field null jika pakai _fields

      if(payload) {
        vm.current_page = payload?.current_page
        vm.order = payload?.order
        vm.per_page = payload?.per_page
        vm.keyword = payload?.keyword
      }

      const items = await axios.get(`posts?page=${vm?.current_page}&order=${vm?.order}&per_page=${vm?.per_page}`,{
          params: {
            keyword: vm?.keyword
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
          // console.log('errorNotify', error.response)
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
    async onRetrieveDate(payload = null) {
      const vm = this

      if(vm.loading_date) return

      vm.loading_date = true

      if(payload) {
        vm.current_page = payload?.current_page
        vm.order = payload?.order
        vm.per_page = payload?.per_page
        vm.keyword = payload?.keyword
        vm.date = payload?.date
      }

      const items = await axios.get(`posts?page=${vm?.current_page}&order=${vm?.order}&per_page=${vm?.per_page}`,{
          params: {
            keyword: vm?.keyword,
            date: vm?.date,
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
          // console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });

      vm.loading_date = false

      if(!items) return

      vm.items_date = items?.data
      vm.x_wp_total = items?.headers['x-wp-total']
      vm.x_wp_totalpages = items?.headers['x-wp-totalpages']
    },

    async onRetrieveCategories(payload = null) {
      const vm = this

      if(vm.loading_categories) return

      vm.loading_categories = true

      if(payload) {
        vm.current_page = payload?.current_page
        vm.order = payload?.order
        vm.per_page = payload?.per_page
        vm.keyword = payload?.keyword
        vm.category = payload?.category
      }

      const items = await axios.get(`posts?page=${vm?.current_page}&order=${vm?.order}&per_page=${vm?.per_page}&categories=${vm.category}`,{
          params: {
            keyword: vm?.keyword
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
          // console.log('errorNotify', error.response)
          console.error("There was an error!", error);
          return null
        });
      // console.log('items', items)

      vm.loading_categories = false

      if(!items) return

      vm.items_category = items?.data
      vm.x_wp_total = items?.headers['x-wp-total']
      vm.x_wp_totalpages = items?.headers['x-wp-totalpages']
    },
  },
});
