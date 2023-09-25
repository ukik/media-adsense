<style>
#top-menu .q-hoverable:hover > .q-focus-helper {
    /* background: rgb(189, 0, 0) !important; */
    /* opacity: 1; */
    /* color: white; */
}
</style>

<template>
  <q-toolbar id="navmenu" v-show="$q.screen.width > 425" class="col-12 bg-dark">
    <q-btn :to="{
      name: 'home',
      query: {
        current_page: home_current_page,
        order: home_order,
        per_page: home_per_page,
        keyword: home_keyword,
      }
    }" unelevated square flat color="white" icon="home" label="Home" />
    <q-circular-progress v-show="loading_categories"
      indeterminate
      rounded
      color="lime"
    />
    <q-btn v-show="!loading_categories" :disable="loading_categories" unelevated square flat color="white" icon="menu" label="Categories">
      <q-menu auto-close square>
        <q-list id="top-menu" separator style="min-width: 100px">
          <template v-for="(item, index) in categories">
            <q-item active-class="bg-red text-white" :active="item?.slug == $route.params.slug" :to="{
              name: 'category',
              params: { slug: item.slug },
              query: {
                // current_page: category_current_page,
                // order: category_order,
                // per_page: category_per_page,
                // keyword: category_keyword,
                // category: item.id,
                current_page: category_current_page,
                order: category_order,
                per_page: 1,
                keyword: category_keyword,
                category: item.id,
              }
            }" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">{{ item?.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn v-show="!loading_tags" :disable="loading_tags" unelevated square flat color="white" icon="label" label="Tags">
      <q-menu auto-close square>
        <q-list id="top-menu" separator style="min-width: 100px">
          <template v-for="(item, index) in tags">
            <q-item active-class="bg-red text-white" :active="item?.slug == $route.params.slug" :to="{
              name: 'tag',
              params: { slug: item.slug },
              query: {
                // current_page: tag_current_page,
                // order: tag_order,
                // per_page: tag_per_page,
                // keyword: category_keyword,
                // category: item.id,
                current_page: tag_current_page,
                order: tag_order,
                per_page: 1,
                keyword: tag_keyword,
                tag: item.id,
              }
            }" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">{{ item?.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-menu>
    </q-btn>
    <!-- <q-btn unelevated square flat color="white" icon="bookmark" label="How to download" /> -->
    <q-btn :to="{ name:'contact' }" unelevated square flat color="white" icon="account_box" label="Contact Us" />
    <q-space />

  </q-toolbar>
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore as useStoreGLOBAL } from 'src/stores/GLOBAL'

import { useStore as useStoreHome } from 'src/stores/home-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'
import { useStore as useStoreTag } from 'src/stores/tag-store'

export default {
  computed: {
    ...mapState(useStoreGLOBAL, [
      'tags',
      'categories',
      'loading_categories',
      'loading_tags',
    ]),
    ...mapState(useStoreHome, {
      // items: 'items',
      home_current_page: 'current_page',
      home_order: 'order',
      home_per_page: 'per_page',
      home_keyword: 'keyword',
    }),
    ...mapState(useStoreCategory, {
      // items_categories: 'items_categories',
      category_current_page: 'current_page',
      category_order: 'order',
      category_per_page: 'per_page',
      category_keyword: 'keyword',
      category_category: 'category',
    }),
    ...mapState(useStoreTag, {
      // items_categories: 'items_categories',
      tag_current_page: 'current_page',
      tag_order: 'order',
      tag_per_page: 'per_page',
      tag_keyword: 'keyword',
      tag_category: 'category',
    }),


  },

}
</script>
