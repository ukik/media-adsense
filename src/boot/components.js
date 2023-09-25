import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'
import { date as qdate } from 'quasar'

export const host = 'https://blog.musikalindo.com/wp-json/wp/v2/' // 'http://wp-rest-api.local/wp-json/wp/v2/'//'https://api.imajora.labsnip.com/', 'https://api.imajora.labsnip.com/', //
export const host_laravel = 'http://wp-rest-api-laravel.musikalindo.com/api/' //'http://localhost:8000/api/'//'https://api.imajora.labsnip.com/', 'https://api.imajora.labsnip.com/', //


export const per_page = 20

export function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);
  return qdate.formatDate(previous, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  return previous;
}

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore as useStoreHome } from 'src/stores/home-store'
import { useStore as useStoreDate } from 'src/stores/date-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'
import { useStore as useStoreGLOBAL } from 'src/stores/GLOBAL'

// import {VueRecaptcha} from 'vue-recaptcha';

// import VRuntimeTemplate from "vue3-runtime-template";

const shuffle = (array) => {
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
};

export default boot(({ app, store, ssrContext }) => {
  // console.log('ssrContext.req.headers.host', ssrContext.req.headers.host)
  app.mixin({
    data() {
      return {
        adsense_show: false,

        web_title: 'Musikalindo: We talk about music & infotainment | Breaking News | Music Videos | Entertainment News | Hip Hop News',
        web_description: 'Musikalindo: situs musik terlengkap di indonesia, berita musik, lirik lagu, RBT, foto penyanyi, jadwal konser - Musikalindo.com',
        web_keyword: 'music charts, news, photos, video, infotainment, gosip, artis, indonesia, internasional, game, entertainment, film, resensi, musik, zodiac, kartu ucapan, berita musik, lirik lagu, foto penyanyi, jadwal konser, pop, jazz, edm, funk, r&b, dangdut, hiphop, alternative, experimental',
        // hostname: ssrContext
        // fb_yuvoria_url: 'https://www.facebook.com/TheWickedAvatar',
        // ig_yuvoria_url: 'https://www.instagram.com/yuvoria.official',
        // yt_yuvoria_url: '',
        // tk_yuvoria_url: '',
        // fb_imajora_url: '',
        // ig_imajora_url: '',
        // yt_imajora_url: 'https://www.youtube.com/@imajora.labels',
        // tk_imajora_url: 'https://www.tiktok.com/@imajora.labels',

        domain: function() {
          return process.env.CLIENT ? window.location.host : ssrContext.req.headers.host
        }(),
        host: host,
        host_laravel: host_laravel,
        no_image: "/images/no-image.jpg",
        _per_page: per_page,
      }
    },
    methods: {
      suffleArray(array) {
        return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
      },
      formatDate(date = new Date()) {
        const previous = new Date(date.getTime());
        // previous.setDate(date.getDate() - 1);
        return qdate.formatDate(previous, 'YYYY-MM-DD')
      },
      onGotoDate(payload, date) {

        const {
          current_page,
          order,
          per_page,
          keyword,
        } = useStoreDate(store)

        // const currentRoute = this.$route

        // const current_page = !currentRoute.query?.current_page ? 1 : Number(currentRoute.query.current_page)
        // const order = !currentRoute.query?.order ? 'desc' : currentRoute.query.order
        // const per_page = !currentRoute.query?.per_page ? _per_page : Number(currentRoute.query.per_page)
        // const keyword = !currentRoute.query?.keyword ? '' : currentRoute.query.keyword
        // // const date = !currentRoute.query?.date ? '' : currentRoute.query.date

        return {
          query: {
            current_page,
            order,
            per_page,
            keyword,
            date
          },
          ...payload,
        }
      },
      onGotoHome(payload) {
        // const currentRoute = this.$route

        // const current_page = !currentRoute.query?.current_page ? 1 : Number(currentRoute.query.current_page)
        // const order = !currentRoute.query?.order ? 'desc' : currentRoute.query.order
        // const per_page = !currentRoute.query?.per_page ? _per_page : Number(currentRoute.query.per_page)
        // const keyword = !currentRoute.query?.keyword ? '' : currentRoute.query.keyword

        const {
          current_page,
          order,
          per_page,
          keyword,
        } = useStoreHome(store)

        return {
          ...payload,
          query: {
            current_page,
            order,
            per_page,
            keyword,
          }
        }
      },
      onGotoCategory(payload, category_id) {
        // const currentRoute = this.$route

        // const current_page = !currentRoute.query?.current_page ? 1 : Number(currentRoute.query.current_page)
        // const order = !currentRoute.query?.order ? 'desc' : currentRoute.query.order
        // const per_page = !currentRoute.query?.per_page ? _per_page : Number(currentRoute.query.per_page)
        // const keyword = !currentRoute.query?.keyword ? '' : currentRoute.query.keyword
        // const category = category_id ? category_id : currentRoute.query.category

        const {
          current_page,
          order,
          per_page,
          keyword,
        } = useStoreCategory(store)


        return {
          ...payload,
          query: {
            current_page,
            order,
            per_page,
            keyword,
            category: category_id,
          }
        }
      },
      getExtends(arr, type) {
        // type = category || post_tag
        let temp_arr = []
        for (let i = 0; i < arr?.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            // console.log(arr[i][j]['taxonomy'], type)
            if(arr[i][j]['taxonomy'] == type) {
              temp_arr.push(arr[i][j])
            }
          }
        }
        return temp_arr
      },
      getExtendsSpesificCategory(arr, type, term_id) {
        // type = category || post_tag
        let temp_arr = []
        for (let i = 0; i < arr?.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            // console.log(arr[i][j]['taxonomy'], type)
            if(arr[i][j]['taxonomy'] == type && arr[i][j]['term_id'] == term_id) {
              temp_arr.push(arr[i][j])
            }
          }
        }
        return temp_arr
      }
    }
  });

  // app.component('VueRecaptcha', VueRecaptcha)
  app.component('VRuntimeTemplate',
    defineAsyncComponent(() => import('vue3-runtime-template'))
  )

  app.component('VRuntimeTemplateSample',
    defineAsyncComponent(() => import('src/components/VRuntimeTemplateSample.vue'))
  )

  app.component('CardPost',
    defineAsyncComponent(() => import('src/components/CardPost.vue'))
  )

  app.component('CardPostCategoryPageOnly',
    defineAsyncComponent(() => import('src/components/CardPostCategoryPageOnly.vue'))
  )

  app.component('CardPostNonCategoryPage',
    defineAsyncComponent(() => import('src/components/CardPostNonCategoryPage.vue'))
  )

  app.component('PaginationHome',
    defineAsyncComponent(() => import('src/components/PaginationHome.vue'))
  )

  app.component('PaginationCategory',
    defineAsyncComponent(() => import('src/components/PaginationCategory.vue'))
  )

  app.component('PaginationDate',
    defineAsyncComponent(() => import('src/components/PaginationDate.vue'))
  )

  app.component('PaginationTag',
    defineAsyncComponent(() => import('src/components/PaginationTag.vue'))
  )

  app.component('PaginationAuthor',
    defineAsyncComponent(() => import('src/components/PaginationAuthor.vue'))
  )

  app.component('PaginationPostSuggestion',
    defineAsyncComponent(() => import('src/components/PaginationPostSuggestion.vue'))
  )

  app.component('PaginationPostComment',
    defineAsyncComponent(() => import('src/components/PaginationPostComment.vue'))
  )

  app.component('SearchBoxHome',
    defineAsyncComponent(() => import('src/components/SearchBoxHome.vue'))
  )

  app.component('Preloading',
    defineAsyncComponent(() => import('src/components/Preloading.vue'))
  )

  app.component('NoData',
    defineAsyncComponent(() => import('src/components/NoData.vue'))
  )

  app.component('SearchBoxCategory',
    defineAsyncComponent(() => import('src/components/SearchBoxCategory.vue'))
  )

  app.component('SearchBoxDate',
    defineAsyncComponent(() => import('src/components/SearchBoxDate.vue'))
  )

  app.component('SearchBoxAuthor',
    defineAsyncComponent(() => import('src/components/SearchBoxAuthor.vue'))
  )

  app.component('NavMenu',
    defineAsyncComponent(() => import('src/components/NavMenu.vue'))
  )

  app.component('TopBanner',
    defineAsyncComponent(() => import('src/components/TopBanner.vue'))
  )

  app.component('MobileAds',
    defineAsyncComponent(() => import('src/components/MobileAds.vue'))
  )

  app.component('SearchBoxTag',
    defineAsyncComponent(() => import('src/components/SearchBoxTag.vue'))
  )

  app.component('LeftDrawer',
    defineAsyncComponent(() => import('src/components/LeftDrawer.vue'))
  )


})
