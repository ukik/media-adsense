<template>
  <q-no-ssr>
    <SearchBoxHome id="search_box" />
  </q-no-ssr>

  <div v-if="adsense_show" class="q-px-md col-12">
    <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
      data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
      Adsense 20
    </div>
  </div>

  <NoData v-if="get_post.length <= 0 && !loading" />

  <div v-show="init ||  get_post?.title && !loading" class="col-12 q-pa-md text-h5" v-html="get_post?.title?.rendered"></div>

  <q-breadcrumbs class="q-px-md q-pb-md text-capitalize">
    <q-breadcrumbs-el label="Artikel" icon="widgets" />
    <q-breadcrumbs-el :label="$route.params.slug" />
  </q-breadcrumbs>

  <div v-show="init ||  get_post?.title && !loading" class="col-12 q-pb-md q-px-md text-caption text-grey row flex items-center">
    By &nbsp;
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
    }" class="text-caption text-capitalize text-bold"> {{ get_post?.x_author }}</RouterLink>
    &nbsp; - On &nbsp;
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
    <q-space />
    <q-btn v-show="init ||  get_post?.title && !loading"  :href="`${$route.path}#comments`" color="primary" flat dense icon="comment"
      :label="get_post?.get_comment_count?.approved" />

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

    <!-- <q-space /> -->
    <!-- :class="[ $q.screen.width <= 1024 ? 'q-mt-md full-width' : '']"  -->
    <div style="z-index: 9;" class="sharethis-inline-share-buttons"></div>
    <!-- <div class="fb-share-button " :data-href="domain" data-layout="button_count"></div> -->
  </div>

  <!-- <div class="q-px-md q-mt-md col-12">
    <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
      data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
      Adsense 9
    </div>
  </div> -->

  <div v-if="get_post?.x_featured_media_large" v-show="init ||  get_post?.title && !loading" class="col-12 q-px-md">
    <q-img :src="get_post?.x_featured_media_large" />
  </div>

  <div v-if="get_post.length <= 0 && loading" v-for="n in 3" class="col-12 q-pa-md">
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


  <div id="mypost" v-show="init ||  get_post?.title && !loading" class="col-12 q-px-md entry-content">

    <h2 v-html="get_post?.title?.rendered"></h2>

    <!-- <div class="q-pb-md col-12">
      <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
        data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
        Adsense 21
      </div>
    </div> -->

    <div v-html="get_post?.content?.rendered" />

    <div style="z-index: 9;" class="sharethis-inline-reaction-buttons"></div>

    <div style="z-index: 9;" class="sharethis-inline-share-buttons"></div>

    <div v-if="adsense_show" class="q-pt-md q-pb-md col-12">
      <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
        data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
        Adsense 21
      </div>
    </div>

    <q-separator class="q-mt-lg" padding />
  </div>

  <div class="q-mx-md q-mt-md q-mb-lg text-h6">Categories</div>

  <div class="col-12 q-pb-lg q-pl-md">
    <template v-for="(item, index) in getExtends(get_post?.extends, 'category')">
      <q-btn :to="{
        name: 'tag',
        params: {
          slug: item?.slug
        },
        query: {
          current_page: tag_current_page,
          order: tag_order,
          per_page: _per_page,
          keyword: tag_keyword,
          tag: item?.term_id,
        }
      }" no-caps :label="'' + item?.name" outline square dense color="grey" text-color="grey-7"  class="q-px-sm q-ma-xs text-weight-regular" />
    </template>
  </div>

  <div class="q-mx-md q-mb-lg text-h6">Tags</div>

  <div class="col-12 q-pb-lg q-pl-md">
    <template v-for="(item, index) in getExtends(get_post?.extends, 'post_tag')">
      <q-btn :to="{
        name: 'tag',
        params: {
          slug: item?.slug
        },
        query: {
          current_page: tag_current_page,
          order: tag_order,
          per_page: _per_page,
          keyword: tag_keyword,
          tag: item?.term_id,
        }
      }" no-caps :label="'#' + item?.name" outline square dense color="grey" text-color="grey-7"  class="q-px-sm q-ma-xs text-weight-regular" />
    </template>
  </div>

  <div class="col-12" id="comments" />

  <q-no-ssr>
    <div class="col-12">
      <Comment :id="get_post?.id" />
      <Suggestion />
    </div>
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
      return metaData(this.get_post, this.web_title, this.web_description, this.web_keyword)
      // return {
      //   // assuming `this.myTitle` exists in your mixed in component
      //   title: this.get_post?.title?.rendered
      // }
    })
  ],
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    if (!process.env.SERVER) return

    await useStore(store).onRetrievePost({
      slug: currentRoute.params.slug,
      id: currentRoute.params.id,
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
      'init',
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
  async mounted() {
    this.domain = "https://" + window.location.host + "/post/" + this.$route.params.slug;

    // mengaktifkan sharethis
    const st = window.__sharethis__
    st.href = window.location.href
    st.initialize()
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrievePost',
    ]),

  }
})
</script>
