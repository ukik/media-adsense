<template>
  <div class="q-pa-md col-12">
    <!-- <div class="q-gutter-y-md column"> -->
    <!-- <q-toolbar class="bg-primary text-white rounded-borders"> -->
    <!-- <q-btn round dense flat icon="menu" class="q-mr-xs" />
        <q-avatar class="gt-xs">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar> -->

    <!-- <q-space /> -->
    <q-form @submit="onSubmit" @keyup.enter="onSubmit">

      <q-input clearable @clear="onDelete" :disable="loading" square class="" v-model="keyword" outlined placeholder="Type your keyword..."
        input-class="text-left">
        <template v-slot:append>
          <q-btn @click="onSubmit" :disable="loading" :loading="loading" square unelevated color="red" label="search" />
          <!-- <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" /> -->
        </template>
      </q-input>
    </q-form>
    <!-- </q-toolbar> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/category-store'


export default defineComponent({
  name: 'SearchBoxCategory',
  computed: {
    ...mapState(useStore, [
      'loading',
      'current_page',
      'order',
      'per_page',
    ]),
    ...mapWritableState(useStore, [
      'keyword',
      'loading',
      'category',
    ]),
  },
  watch: {
    keyword() {
      // this.onRetrieve()
    },
    '$route.query': function (val) {
      if (val?.keyword) {
        if (this.keyword != val?.keyword) this.loading = false
        this.keyword = val?.keyword
        this.onSubmit()
      }
    }
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrieveCategories',
    ]),
    onSubmit() {

      const currentRoute = this.$route
      const current_page = 1 //this.current_page ? this.current_page : Number(currentRoute.query.current_page)
      const order = this.order ? this.order : currentRoute.query.order
      const per_page = this.per_page ? this.per_page : Number(currentRoute.query.per_page)
      const keyword = this.keyword ? this.keyword : currentRoute.query.keyword
      const category = this.category ? this.category : currentRoute.query.category

      this.$router.push({
        query: {
          current_page: current_page,
          order: order,
          per_page: per_page,
          keyword: keyword,
          category: category
        }
      })

      this.onRetrieveCategories({
        current_page,
        order,
        per_page,
        keyword,
        category
      })

    },
    onDelete() {

      const currentRoute = this.$route
      const current_page = 1 //this.current_page ? this.current_page : Number(currentRoute.query.current_page)
      const order = this.order ? this.order : currentRoute.query.order
      const per_page = this.per_page ? this.per_page : Number(currentRoute.query.per_page)
      const keyword = this.keyword ? this.keyword : currentRoute.query.keyword
      const category = this.category ? this.category : currentRoute.query.category

      this.$router.push({
        query: {
          current_page: current_page,
          order: order,
          per_page: per_page,
          keyword: '',
          category: category
        }
      })

    }
  }
})
</script>
