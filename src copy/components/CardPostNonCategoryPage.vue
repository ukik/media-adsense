<template>
  <div class="col-12 row items-start">
    <q-card class="full-width" square flat bordered>
      <RouterLink v-if="item?.x_featured_media_medium" :to="{
        name: 'post',
        params: { slug: item?.slug }
      }">
        <q-img :src="item?.x_featured_media_medium">
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>
      </RouterLink>
      <RouterLink v-else :to="{
        name: 'post',
        params: { slug: item?.slug }
      }">
        <q-img :src="no_image" />
      </RouterLink>

      <div class="absolute-top-left">
        <q-btn :to="{
          name: 'category',
          params: {
            slug: suffleArray(getExtends(item?.extends, 'category'))[0]?.slug
          },
          query: {
            current_page: category_current_page,
            order: category_order,
            per_page: 1,
            keyword: category_keyword,
            category: suffleArray(getExtends(item?.extends, 'category'))[0]?.term_id,
          }
        }" square :label="suffleArray(getExtends(item?.extends, 'category'))[0]?.name" color="pink" unelevated />
      </div>

      <q-separator />

      <q-card-section class="q-pb-none">
        <div class="row">
          <RouterLink :to="{
            name: 'date',
            params: { slug: item?.modified },
            query: {
              current_page: date_current_page,
              order: date_order,
              per_page: date_per_page,
              keyword: date_keyword,
              date: item?.modified,
            }
          }" class="text-overline text-orange-9">{{ get_date }}</RouterLink>
          <q-space />
          <q-btn :to="{
                name: 'post',
                params: { slug: item?.slug },
                query: {
                  'anchor':'comments'
                }
              }" color="primary" flat dense icon="comment" :label="item?.get_comment_count.approved" />
        </div>

        <div class="text-h6 q-mt-sm q-mb-xs">
          <q-item-section>
            <q-item-label lines="2" style="height:48px;">
              <RouterLink :to="{
                name: 'post',
                params: { slug: item?.slug }
              }">{{ item?.title?.rendered }}</RouterLink>
            </q-item-label>
          </q-item-section>
        </div>

      </q-card-section>

      <q-card-actions class="q-px-md">
        <RouterLink :to="{
          name: 'author',
          params: { slug: item?.x_author },
          query: {
            current_page: author_current_page,
            order: author_order,
            per_page: author_per_page,
            keyword: author_keyword,
            author: item?.author,
          }
        }" class="text-caption text-capitalize text-grey">By {{ item?.x_author }}</RouterLink>
        <q-space />

        <q-btn v-if="getExtends(item?.extends, 'post_tag')"
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition v-if="getExtends(item?.extends, 'post_tag')">
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
            <template v-for="(val, index) in getExtends(item?.extends, 'post_tag')">
              <q-btn :to="{
                name: 'tag',
                params: {
                  slug: val?.slug
                },
                query: {
                  current_page: tag_current_page,
                  order: tag_order,
                  per_page: 1,
                  keyword: tag_keyword,
                  tag: val?.term_id,
                }
              }" no-caps :label="'#' + val?.name" outline square dense color="grey" text-color="grey-7"  class="q-px-sm  text-weight-regular" />
            </template>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { date } from 'quasar'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore as useStoreDate } from 'src/stores/date-store'
import { useStore as useStoreAuthor } from 'src/stores/author-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'
import { useStore as useStoreTag } from 'src/stores/tag-store'


export default {
  props: ['item'],
  computed: {
    get_date() {
      if (!this.item?.modified) return 0

      const timeStamp = new Date(this.item?.modified);

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
    ...mapState(useStoreCategory, {
      category_current_page: 'current_page',
      category_order: 'order',
      category_per_page: 'per_page',
      category_keyword: 'keyword',
    }),
    ...mapState(useStoreTag, {
      tag_current_page: 'current_page',
      tag_order: 'order',
      tag_per_page: 'per_page',
      tag_keyword: 'keyword',
    }),
  },
  setup() {
    return {
      expanded: ref(false),
    }
  },
}
</script>
