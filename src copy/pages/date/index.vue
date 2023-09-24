<template>
  <q-no-ssr>
    <SearchBoxDate />
  </q-no-ssr>

  <div class="col-12 q-pa-md text-h5 text-capitalize">{{ formatDate(new Date($route.params.slug)) }}</div>

  <q-breadcrumbs class="q-px-md q-pb-lg text-capitalize">
    <q-breadcrumbs-el label="Date" icon="widgets" />
    <q-breadcrumbs-el :label="formatDate(new Date($route.params.slug))" />
  </q-breadcrumbs>

  <div class="col-12 row q-col-gutter-md q-pl-md">
    <NoData v-if="items_date.length <= 0 && !loading" />
    <Preloading v-if="items_date.length <= 0 && loading" />
    <template v-for="(item, index) in items_date">
      <CardPostNonCategoryPage :item="item" class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"></CardPostNonCategoryPage>
    </template>
  </div>

  <q-no-ssr>
    <PaginationDate />
  </q-no-ssr>
</template>

<script>
import { defineComponent } from 'vue'
import { Cookies } from 'quasar'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/date-store'
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
  name: 'DateIndex',
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    if (!process.env.SERVER) return

    const current_page = !currentRoute.query?.current_page ? 1 : Number(currentRoute.query.current_page)
    const order = !currentRoute.query?.order ? 'desc' : currentRoute.query.order
    const per_page = !currentRoute.query?.per_page ? _per_page : Number(currentRoute.query.per_page)
    const keyword = !currentRoute.query?.keyword ? '' : currentRoute.query.keyword
    const date = !currentRoute.query?.date ? '' : currentRoute.query.date

    await useStore(store).onRetrieveDate({
      current_page, order, per_page, keyword, date
    });
    // await onRequestPrefetch(store, currentRoute, ssrContext)
  }),
  computed: {
    ...mapState(useStore, {
      max_pages: 'max_pages',
      loading: 'loading',
    }),
    ...mapWritableState(useStore, [
      'items_date',
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
