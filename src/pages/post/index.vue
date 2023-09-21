<template>
  <q-no-ssr>
    <SearchBoxHome />
  </q-no-ssr>

  <div class="q-px-md col-12">
    <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
      data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
      Adsense 20
    </div>
  </div>

  <NoData v-if="get_post.length <= 0 && !loading" />

  <div v-for="n in 3" class="col-12 q-pa-md">
    <q-skeleton height="170px" square animation="fade" />

    <div class="row items-start no-wrap q-mt-sm">
      <q-skeleton size="56px" square animation="fade" />

      <div class="col q-pl-sm">
        <q-skeleton type="text" square width="30%" animation="fade" />
        <q-skeleton type="text" square height="12px" animation="fade" />
        <q-skeleton type="text" square height="12px" width="75%" animation="fade" />
      </div>
    </div>
  </div>

  <div class="col-12 q-pa-md text-h5">{{ get_post?.title?.rendered }}</div>

  <div class="col-12 q-pb-sm q-px-md text-caption text-grey">
    By
    <RouterLink :to="{
      name: 'author',
      params: { slug: get_post?.x_author },
      query: {
        current_page: author_current_page,
        order: author_order,
        per_page: author_per_page,
        keyword: author_keyword,
        author: get_post?.author,
      }
    }" class="text-caption text-capitalize text-bold">{{ get_post?.x_author }}</RouterLink>
    - On
    <RouterLink :to="{
      name: 'date',
      params: { slug: get_post?.modified },
      query: {
        current_page: date_current_page,
        order: date_order,
        per_page: date_per_page,
        keyword: date_keyword,
        date: get_post?.modified,
      }
    }" class="text-bold">{{ get_date }}</RouterLink>
  </div>

  <!-- <q-breadcrumbs class="q-px-md q-pb-md">
    <q-breadcrumbs-el :to="{ name:'home' }" label="Home" icon="home" />
    <q-breadcrumbs-el label="Breadcrumbs" />
  </q-breadcrumbs> -->

  <div class="col-12 q-px-md row flex items-center q-mb-md">
    <!-- <div>
      <q-btn color="blue" rounded unelevated size="sm" no-caps icon="fab fa-facebook" label="Facebook" />
    </div>
    <div>
      <q-btn color="teal" rounded unelevated size="sm" no-caps icon="fab fa-twitter" label="Twitter" />
    </div>
    <div>
      <q-btn color="orange" rounded unelevated size="sm" no-caps icon="mail" label="Email" />
    </div> -->
    <div class="fb-share-button " :data-href="domain" data-layout="button_count"></div>
    <q-space />
    <q-btn :href="`${$route.path}#comments`" color="primary" flat dense icon="comment"
      :label="get_post?.get_comment_count?.approved" />
  </div>

  <!-- <div class="q-px-md q-mt-md col-12">
    <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
      data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
      Adsense 9
    </div>
  </div> -->

  <div class="col-12 q-px-md">
    <q-img :src="get_post?.x_featured_media_large" />
  </div>

  <div class="col-12 q-px-md entry-content">

    <h2>{{ get_post?.title?.rendered }}</h2>

    <!-- <div class="q-pb-md col-12">
      <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
        data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
        Adsense 21
      </div>
    </div> -->

    <div v-html="get_post?.content?.rendered" />


    <div class="q-pt-md q-pb-lg col-12">
      <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
        data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
        Adsense 21
      </div>
    </div>

  </div>

  <div class="q-pb-lg q-pl-md">
    <template v-for="(item, index) in getExtends(get_post?.extends, 'post_tag')">
      <q-btn :to="{
        name: 'tag',
        params: {
          slug: item?.slug
        },
        query: {
          current_page: tag_current_page,
          order: tag_order,
          per_page: 1,
          keyword: tag_keyword,
          tag: item?.term_id,
        }
      }" :label="'#' + item?.name" outline square dense color="grey" class="q-px-sm" />
    </template>
  </div>

  <div id="comments" />
  <q-no-ssr>
    <Comment :id="get_post?.id" />
    <Suggestion />
  </q-no-ssr>
</template>

<script>

import { date } from 'quasar'

import { defineComponent, defineAsyncComponent } from 'vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/post-store'
import { preFetch } from 'quasar/wrappers';
import { useStore as useStoreDate } from 'src/stores/date-store'
import { useStore as useStoreAuthor } from 'src/stores/author-store'
import { useStore as useStoreTag } from 'src/stores/tag-store'


import { createMetaMixin } from 'quasar'
import { metaData } from "boot/meta"

export default defineComponent({
  name: 'PostIndex',
  mixins: [
    // createMetaMixin(metaData(this.get_post))
    createMetaMixin(function () {
      // "this" here refers to your component
      return metaData(this.get_post, this.web_title, this.web_description)
      // return {
      //   // assuming `this.myTitle` exists in your mixed in component
      //   title: this.get_post?.title?.rendered
      // }
    })
  ],
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    if (!process.env.SERVER) return

    await useStore(store).onRetrievePost({
      slug: currentRoute.params.slug
    });
  }),
  components: {
    Suggestion: defineAsyncComponent(() => import('./suggestion.vue')),
    Comment: defineAsyncComponent(() => import('./comment.vue')),
  },
  data() {
    return {
      domain: '',
    }
  },
  computed: {
    ...mapState(useStore, [
      'get_post',
      'loading',
    ]),
    get_date() {
      if (!this.get_post?.modified) return 0

      const timeStamp = new Date(this.get_post?.modified);

      return date.formatDate(timeStamp, 'MMM, DD YYYY');
    },
    ...mapState(useStoreDate, {
      date_current_page: 'current_page',
      date_order: 'order',
      date_per_page: 'per_page',
      date_keyword: 'keyword',
    }),
    ...mapState(useStoreAuthor, {
      author_current_page: 'current_page',
      author_order: 'order',
      author_per_page: 'per_page',
      author_keyword: 'keyword',
    }),
    ...mapState(useStoreTag, {
      tag_current_page: 'current_page',
      tag_order: 'order',
      tag_per_page: 'per_page',
      tag_keyword: 'keyword',
    }),
  },
  created() {
    // this.onRetrieve()
  },
  mounted() {
    this.domain = "https://" + window.location.host + "/post/" + this.$route.params.slug;
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrievePost',
    ]),

  }
})
</script>
