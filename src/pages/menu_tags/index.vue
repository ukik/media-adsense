<template>
  <q-no-ssr>
    <SearchBoxHome />
  </q-no-ssr>

  <div class="col-12 q-pa-md q-pb-lg text-h5 text-capitalize">Pilihan Tag</div>

  <div class="col-12 row q-col-gutter-md q-pl-md">
    <NoData v-if="items.length <= 0 && !loading" />
    <Preloading v-if="items.length <= 0 && loading" />
    <template v-for="(item, index) in items">
      <div>
        <q-btn :to="{
              name: 'tag',
              params: { slug: item.slug },
              query: {
                current_page: tag_current_page,
                order: tag_order,
                per_page: _per_page,
                keyword: tag_keyword,
                category: item.id,
              }
            }" unelevated square color="primary" outline no-caps="" class="text-weight-regular flex items-center">
          <q-badge color="blue" text-color="white" rounded>{{ item?.count }}</q-badge>
          <div class="q-ml-sm">#{{ item?.name }}</div>
        </q-btn>
      </div>
    </template>
  </div>

  <q-no-ssr>
    <PaginationMenuTags />
  </q-no-ssr>
</template>

<script>
import { defineComponent } from 'vue'
import { Cookies } from 'quasar'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/menu-tags-store'
import { preFetch } from 'quasar/wrappers';
import { per_page as _per_page } from 'src/boot/components'

import { createMetaMixin } from 'quasar'
import { metaDataStatic } from "boot/meta"

import { useStore as useStoreTag } from 'src/stores/tag-store'

export default defineComponent({
  mixins: [
    createMetaMixin(function () {
      return metaDataStatic(this.web_title, this.web_description, this.web_keyword)
    })
  ],
  name: 'menu_tags_index',
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    // if (!process.env.SERVER) return

    const current_page = !currentRoute.query?.current_page ? 1 : Number(currentRoute.query.current_page)
    const order = !currentRoute.query?.order ? 'desc' : currentRoute.query.order
    const per_page = !currentRoute.query?.per_page ? _per_page : Number(currentRoute.query.per_page)

    await useStore(store).onRetrieveMenuTags({
      current_page, order, per_page
    });
    // await onRequestPrefetch(store, currentRoute, ssrContext)
  }),
  computed: {
    ...mapState(useStore, {
      max_pages: 'max_pages',
      loading: 'loading',
    }),
    ...mapWritableState(useStore, [
      'items',
      'x_wp_total', // all at current filter
      'x_wp_totalpages', // all records
      'current_page',
      'order',
      'per_page',
    ]),
    ...mapState(useStoreTag, {
      tag_current_page: 'current_page',
      tag_order: 'order',
      tag_per_page: 'per_page',
      tag_keyword: 'keyword',
      // tag_tag: 'tag',
    }),
  },
})
</script>
