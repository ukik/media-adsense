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
            slug: getExtends(item?.extends, 'category')[0]?.slug
          },
          query: {
            current_page: category_current_page,
            order: category_order,
            per_page: 1,
            keyword: category_keyword,
            category: getExtends(item?.extends, 'category')[0]?.term_id,
          }
        }" square :label="getExtends(item?.extends, 'category')[0]?.name" color="pink" unelevated />
      </div>

      <q-separator />

      <q-card-section>
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
        }" class="text-caption text-grey">By {{ item?.x_author }}</RouterLink>
      </q-card-section>

      <!-- <q-card-actions>
        <q-btn flat color="primary" label="Share" />
        <q-btn flat color="secondary" label="Book" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions> -->

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
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
  },
  setup() {
    return {
      expanded: ref(false),
    }
  },
}
</script>
