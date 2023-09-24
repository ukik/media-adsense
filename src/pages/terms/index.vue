<template>
  <q-no-ssr>
    <SearchBoxHome />
  </q-no-ssr>
  <div class="col-12 q-pa-md text-h5">Terms of Use</div>

  <div id="page" v-html="get_post?.content.rendered?.replaceAll('\n','')" class="col-12 q-px-md q-mb-lg row q-col-gutter-md" v-once />

</template>


<script>
import { date } from 'quasar'

import { defineComponent, defineAsyncComponent } from 'vue'
import { mapState, mapWritableState, mapActions } from 'pinia'

import { preFetch } from 'quasar/wrappers';
import { useStore } from 'src/stores/terms-store'

import { createMetaMixin } from 'quasar'
import { metaDataStatic } from "boot/meta"

export default defineComponent({
  mixins: [
    createMetaMixin(function () {
      return metaDataStatic(this.web_title, this.web_description, this.web_keyword)
    })
  ],
  name: 'TermIndex',
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    // if (!process.env.SERVER) return
    const mystore = useStore(store)
    if(mystore?.item.length > 0) return
    await useStore(store).onRetrievePost();
  }),
  data() {
    return {
      domain: '',
    }
  },
  computed: {
    ...mapState(useStore, [
      'get_post',
    ]),
    get_date() {
      if (!this.get_post?.modified) return 0

      const timeStamp = new Date(this.get_post?.modified);

      return date.formatDate(timeStamp, 'MMM, DD YYYY');
    },
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrievePost',
    ]),
  }
})
</script>
