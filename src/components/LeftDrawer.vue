<template>
  <q-list  class="rounded-borders text-primary">
    <q-item :to="{ name:'home' }" class="q-my-md" clickable v-ripple>
      <q-item-section>
        <q-img class="img-logo" src="~/assets/musikalindo.png" alt="" />
      </q-item-section>
    </q-item>
    <q-separator />

    <q-item clickable :to="{ name: 'home' }" v-ripple :active="$route.name === 'home'"
      active-class="my-menu-link">
      <q-item-section class="text-capitalize text-bold">Home</q-item-section>
    </q-item>

    <q-expansion-item class="text-bold"

        label="Categories"
      >
      <q-card>
        <template v-for="(item, index) in categories">
          <q-item :inset-level="0.25"  active-class="bg-red text-white" :active="item?.slug == $route.params.slug" :to="{
            name: 'category',
            params: { slug: item.slug },
            query: {
              current_page: category_current_page,
              order: category_order,
              per_page: category_per_page,
              keyword: category_keyword,
              category: item.id,
            }
          }"  clickable >
            <q-item-section>
              <q-item-label class="text-capitalize  text-weight-regular">- {{ item?.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-card>
    </q-expansion-item>

    <!-- <q-item-label header>Partner</q-item-label>

    <q-item :inset-level="0.25" clickable :to="{ name: 'producer_mk' }" v-ripple :active="$route.name === 'producer_mk'"
      active-class="my-menu-link">
      <q-item-section class="text-uppercase text-bold">MK Record</q-item-section>
    </q-item>

    <q-item :inset-level="0.25" clickable :to="{ name: 'producer_dianica' }" v-ripple
      :active="$route.name === 'producer_dianica'" active-class="my-menu-link">
      <q-item-section class="text-uppercase text-bold">Dianica Studio</q-item-section>
    </q-item> -->

    <!-- <q-separator spaced /> -->

    <!-- <q-item-label header>Discography</q-item-label> -->

    <!-- <q-item :inset-level="0.25" clickable :to="{ name: 'albums' }" v-ripple :active="$route.name === 'albums'"
      active-class="my-menu-link">
      <q-item-section class="text-uppercase text-bold">Albums</q-item-section>
    </q-item>

    <q-item :inset-level="0.4" clickable :to="{ name:'albums_detail_1', query: { tag: 'Mini Album' }  }" v-ripple :active="$route.name === 'albums_detail_1'"
      active-class="my-menu-link">
      <q-item-section>- I Am Coming</q-item-section>
    </q-item>
    <q-item :inset-level="0.4" clickable :to="{ name:'albums_detail_2', query: { tag: 'Mini Album' }  }" v-ripple :active="$route.name === 'albums_detail_2'"
      active-class="my-menu-link">
      <q-item-section>- Where Art Thou?</q-item-section>
    </q-item>

    <q-item :inset-level="0.25" clickable :to="{ name: 'talents' }" v-ripple
      :active="$route.name === 'talents'" active-class="my-menu-link">
      <q-item-section class="text-uppercase text-bold">Talents</q-item-section>
    </q-item>

    <q-item :inset-level="0.4" clickable :to="{ name:'talents_detail', params: { slug: 'yuvoria' }  }" v-ripple :active="$route.name === 'talents_detail'"
      active-class="my-menu-link">
      <q-item-section>- Yuvoria (U-Vo)</q-item-section>
    </q-item>


    <q-item :inset-level="0.25" clickable :to="{ name: 'lyrics' }" v-ripple
      :active="$route.name === 'lyrics'" active-class="my-menu-link">
      <q-item-section class="text-uppercase text-bold">Songs & Lyrics</q-item-section>
    </q-item> -->

    <!-- <q-separator spaced /> -->

    <q-item :inset-level="0" clickable :to="{ name: 'contact' }" v-ripple
      :active="$route.name === 'contact'" active-class="my-menu-link">
      <q-item-section class="text-capitalize text-bold">Contact</q-item-section>
    </q-item>
    <q-item :inset-level="0" clickable :to="{ name: 'disclaimer' }" v-ripple :active="$route.name === 'disclaimer'"
      active-class="my-menu-link">
      <q-item-section class="text-capitalize text-bold">DMCA-Copyrights</q-item-section>
    </q-item>
    <q-item :inset-level="0" clickable :to="{ name: 'privacy' }" v-ripple :active="$route.name === 'privacy'"
      active-class="my-menu-link">
      <q-item-section class="text-capitalize text-bold">Privacy Policy</q-item-section>
    </q-item>
    <q-item :inset-level="0" clickable :to="{ name: 'terms' }" v-ripple :active="$route.name === 'terms'"
      active-class="my-menu-link">
      <q-item-section class="text-capitalize text-bold">Terms of Use</q-item-section>
    </q-item>

    <!-- <q-item>
      <q-item-section>
        <ul class="social-links ">
          <li><a :href="fb_yuvoria_url" target="_blank" title=""><i class="fab fa-facebook-square"></i></a></li>
          <li><a :href="tk_imajora_url" target="_blank" title=""><i class="fas fa-music"></i></a></li>
          <li><a :href="ig_yuvoria_url" target="_blank" title=""><i class="fab fa-instagram"></i></a></li>
          <li><a :href="yt_imajora_url" target="_blank" title=""><i class="fab fa-youtube"></i></a></li>
        </ul>
      </q-item-section>
    </q-item> -->
  </q-list>
</template>



<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore as useStoreGLOBAL } from 'src/stores/GLOBAL'

import { useStore as useStoreHome } from 'src/stores/home-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'


import { ref } from 'vue'

export default {
  setup() {
    return {
      link: ref('inbox')
    }
  },
  computed: {
    ...mapState(useStoreGLOBAL, [
      'tags',
      'categories',
      'loading_categories'
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

    link_beranda() {
      switch (this.$route.name) {
        // case "home":
        case "producer_dianica":
        case "producer_mk":
          return true
        default:
          return false
      }
    },
    link_music() {
      switch (this.$route.name) {
        case "albums":
        case "talents":
        case "lyrics":
        case "albums_detail_1":
        case "albums_detail_2":
        case "talents_detail":
          return true
        default:
          return false
      }
    }
  }
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #1ba6ed
</style>
