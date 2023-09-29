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
    }" unelevated square flat color="white" icon="home" label="Home" class="text-weight-regular" />
    <!-- <q-circular-progress v-show="loading_categories"
      indeterminate
      rounded
      color="lime"
    /> -->
    <!-- v-show="!loading_categories"  -->
    <q-btn :disable="loading_categories" unelevated square flat color="white" icon="menu" label="Categories" class="text-weight-regular">
      <q-menu auto-close square>
        <q-list id="top-menu" separator style="min-width: 200px">
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
              <q-item-section side style="width:40px;">
                <q-item-label class="text-capitalize"><q-badge color="white" text-color="red">{{ item?.count }}</q-badge></q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="text-capitalize">{{ item?.name }} </q-item-label>
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
      </q-menu>
    </q-btn>
    <!-- v-show="!loading_tags"  -->
    <q-btn :disable="loading_tags" unelevated square flat color="white" icon="label" label="Tags" class="text-weight-regular">
      <q-menu auto-close square>
        <q-list id="top-menu" separator style="min-width: 100px">
          <template v-for="(item, index) in tags">
            <q-item active-class="bg-red text-white" :active="item?.slug == $route.params.slug" :to="{
              name: 'tag',
              params: { slug: item.slug },
              query: {
                current_page: tag_current_page,
                order: tag_order,
                per_page: _per_page,
                keyword: tag_keyword,
                tag: item.id,
              }
            }" dense clickable class="q-py-sm">
              <q-item-section side style="width:40px;">
                <q-item-label class="text-capitalize"><q-badge color="white" text-color="red">{{ item?.count }}</q-badge></q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="text-capitalize">{{ item?.name }} </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <q-item active-class="bg-red text-white" :active="$route.name == 'menu_tags'" :to="{
              name: 'menu_tags',
              query: {
                current_page: menu_tag_current_page,
                order: menu_tag_order,
                per_page: menu_tag_per_page,
              }
            }" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">Selengkapnya...</q-item-label>
              </q-item-section>
            </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <!-- <q-btn unelevated square flat color="white" icon="bookmark" label="How to download" /> -->
    <q-btn :to="{ name:'contact' }" unelevated square flat color="white" icon="account_box" label="Contact Us" class="text-weight-regular" />
    <q-space />

    <q-item dense clickable v-ripple="{ color:'white' }" unelevated square flat color="white" >
      <q-item-section :side="false" >
        <q-avatar size="28px" square>
          <q-img v-if="locale == 'id-ID'" src="~assets/flag-id.png" />
          <q-img v-else src="~assets/flag-us.png" />
        </q-avatar>
      </q-item-section>
      <q-menu anchor="bottom right" self="top right" auto-close square>
        <q-list id="top-menu" separator style="min-width: 100px">
            <q-item active-class="bg-red text-white" :active="$route.params?.locale == 'id'" :to="{
              name: 'home',
              // query: {
              //   ...$route.query,
              // },
              params: {
                ...$route.params,
                locale: 'id'
              },
            }" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">Bahasa Indonesia</q-item-label>
              </q-item-section>
            </q-item>
            <q-item active-class="bg-red text-white" :active="$route.params?.locale == 'en'" :to="{
              name: 'home',
              // query: {
              //   ...$route.query,
              // },
              params: {
                ...$route.params,
                locale: 'en'
              },
            }" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">English</q-item-label>
              </q-item-section>
            </q-item>
        </q-list>
      </q-menu>
    </q-item>

    <!-- <q-btn unelevated square flat color="white" icon="language" :label="`Bahasa `+$i18n.locale">
      <q-menu auto-close square>
        <q-list id="top-menu" separator style="min-width: 100px">
            <q-item active-class="bg-red text-white" :active="$route.params?.locale == 'id'" :to="{
              query: {
                ...$route.query,
              },
              params: {
                ...$route.params,
                locale: 'id' },
            }" @click="$i18n.locale = 'id-ID'" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">Bahasa Indonesia</q-item-label>
              </q-item-section>
            </q-item>
            <q-item active-class="bg-red text-white" :active="$route.params?.locale == 'en'" :to="{
              query: {
                ...$route.query,
              },
              params: {
                ...$route.params,
                locale: 'en' },
            }" @click="$i18n.locale = 'en-US'" dense clickable class="q-py-sm">
              <q-item-section>
                <q-item-label class="text-capitalize">English</q-item-label>
              </q-item-section>
            </q-item>
        </q-list>
      </q-menu>
    </q-btn> -->

    <!-- <q-space /> -->

  </q-toolbar>
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore as useStoreGLOBAL } from 'src/stores/GLOBAL'

import { useStore as useStoreHome } from 'src/stores/home-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'
import { useStore as useStoreTag } from 'src/stores/tag-store'

import { useStore as useStoreMenuCategory } from 'src/stores/menu-categories-store'
import { useStore as useStoreMenuTag } from 'src/stores/menu-tags-store'

import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export default {
  // setup() {
  //   const { locale } = useI18n({ useScope: 'global' })

  //   return {
  //     locale: ref(locale)
  //   }
  // },
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
    ...mapState(useStoreMenuCategory, {
      menu_category_current_page: 'current_page',
      menu_category_order: 'order',
      menu_category_per_page: 'per_page',
    }),
    ...mapState(useStoreTag, {
      // items_categories: 'items_categories',
      tag_current_page: 'current_page',
      tag_order: 'order',
      tag_per_page: 'per_page',
      tag_keyword: 'keyword',
      tag_category: 'category',
    }),
    ...mapState(useStoreMenuTag, {
      menu_tag_current_page: 'current_page',
      menu_tag_order: 'order',
      menu_tag_per_page: 'per_page',
    }),


  },

}
</script>
