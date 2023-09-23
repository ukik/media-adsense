<template>

  <q-no-ssr>
    <SearchBoxHome />
  </q-no-ssr>

  <div class="col-12 row q-col-gutter-md q-pl-md">
    <NoData v-if="items.length <= 0 && !loading" />
    <Preloading v-if="items.length <= 0 && loading" />
    <template v-for="(item, index) in items">
      <CardPostNonCategoryPage :item="item" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"></CardPostNonCategoryPage>
    </template>
  </div>

  <q-no-ssr>
    <PaginationHome />
  </q-no-ssr>
</template>

<script>
import { defineComponent } from 'vue'
import { Cookies } from 'quasar'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/home-store'
import { preFetch } from 'quasar/wrappers';

import { per_page as _per_page } from 'src/boot/components'

import { createMetaMixin } from 'quasar'
import { metaDataStatic } from "boot/meta"

export default defineComponent({
  mixins: [
    createMetaMixin(function () {
      return metaDataStatic(this.web_title, this.web_description)
    })
  ],
  name: 'HomeIndex',
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    if (!process.env.SERVER) return

    // const mystore = useStore(store);
    // console.log('mystore', mystore)

    // const cookies = process.env.SERVER
    // ? Cookies.parseSSR(ssrContext)
    // : Cookies // otherwise we're on client

    const current_page = !currentRoute.query?.current_page ? 1 : Number(currentRoute.query.current_page)
    const order = !currentRoute.query?.order ? 'desc' : currentRoute.query.order
    const per_page = !currentRoute.query?.per_page ? _per_page : Number(currentRoute.query.per_page)
    const keyword = !currentRoute.query?.keyword ? '' : currentRoute.query.keyword

    await useStore(store).onRetrieve({
      current_page, order, per_page, keyword
    });
  }),
  computed: {
    ...mapState(useStore, {
      max_pages: 'max_pages',
      loading:'loading',
    }),
    ...mapWritableState(useStore, [
      'items',
      'x_wp_total', // all at current filter
      'x_wp_totalpages', // all records
      'current_page',
      'order',
      'per_page',
    ]),
  },
  created() {
    // this.onRetrieve()
  },
  methods: {
    ...mapActions(useStore, [
      // 'onRetrieve',
    ]),

  }
})
</script>
