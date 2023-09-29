<style>

</style>

<template>
  <q-list id="top-menu" bordered separator class="col-12">

    <q-item active-class="bg-red text-white">
      <q-item-section>
        <q-item-label class="text-capitalize text-h5">Categories</q-item-label>
      </q-item-section>
    </q-item>

    <template v-for="(item, index) in categories">
      <q-item active-class="bg-red text-white" :active="item?.slug == $route.params.slug" :to="{
        name: 'category',
        params: { slug: item.slug },
        query: {
          current_page: category_current_page,
          order: category_order,
          per_page: _per_page,
          keyword: category_keyword,
          category: item.id,
        }
      }" dense clickable class="q-py-sm">
        <q-item-section>
          <q-item-label class="text-capitalize">{{ item?.name }} </q-item-label>
        </q-item-section>
        <q-item-section side style="width:40px;">
          <q-item-label class="text-capitalize"><q-badge color="white" text-color="red">{{ item?.count
          }}</q-badge></q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <q-item active-class="bg-red text-white" :active="$route.name == 'menu_categories'" :to="{
      name: 'menu_categories',
      query: {
        current_page: menu_category_current_page,
        order: menu_category_order,
        per_page: menu_category_per_page,
      }
    }" dense clickable class="q-py-sm">
      <q-item-section>
        <q-item-label class="text-capitalize">Selengkapnya...</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore as useStoreGLOBAL } from 'src/stores/GLOBAL'

import { useStore as useStoreHome } from 'src/stores/home-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'
import { useStore as useStoreTag } from 'src/stores/tag-store'

import { useStore as useStoreMenuCategory } from 'src/stores/menu-categories-store'
import { useStore as useStoreMenuTag } from 'src/stores/menu-tags-store'

export default {
  methods: {
    setLocale(val) {
      this.$i18n.locale = val
    }
  },
  data() {
    return {
      mounted: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true
    })
  },
  computed: {
    ...mapState(useStoreGLOBAL, [
      'locale',
      'tags',
      'categories',
      'loading_categories',
      'loading_tags',
    ]),
    ...mapState(useStoreCategory, {
      // items_categories: 'items_categories',
      category_current_page: 'current_page',
      category_order: 'order',
      category_per_page: 'per_page',
      category_keyword: 'keyword',
      category_category: 'category',
    }),
    ...mapState(useStoreMenuCategory, {
      menu_category_current_page: 'current_page',
      menu_category_order: 'order',
      menu_category_per_page: 'per_page',
    }),
  },

}
</script>
