import { defineStore } from 'pinia';
import axios from 'axios'
// import { useRouterStore } from 'src/stores/router-store'
// import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

// import { errorNotify } from 'src/boot/client_side';



export const useCounterStore = defineStore('search-store', {
  state: () => ({
    items: [],
    x_wp_total: 0, // all at current filter
    x_wp_totalpages: 0, // all records
    current_page: 1,
    order: 'asc',
    per_page: 2,
    keyword: '',

    loading: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    max_pages: (state) => {
      return Math.ceil(Number(state.x_wp_total) / Number(state.per_page))
    }
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
    async onRetrieve() {
      const vm = this
      vm.loading = true
      const items = await axios.get(`posts?page=${vm.current_page}&order=${vm.order}&per_page=${vm.per_page}&_fields=x_author,id,x_featured_media_medium,title,modified`,{
          params: {
            ID: 12345
          }
        })
        .then(response => {
          // vm.$q.notify({
          //   message: "Berhasil",
          //   caption: "data sudah tersimpan",
          //   icon: "check_circle",
          //   color: "green"
          // })
          // vm.email = ''
          // vm.name = ''
          // vm.phone = ''
          // vm.subject = ''
          // vm.description = ''
          // vm.send = true
          // console.log('response', response)
          return response
        })
        .catch(error => {
          // vm.$q.notify({
          //   message: "Gagal",
          //   caption: "data tidak tersimpan",
          //   icon: "error",
          //   color: "red"
          // })
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
  },
});
