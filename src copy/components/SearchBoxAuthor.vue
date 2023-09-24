<template>
  <div class="q-pa-md col-12">

    <q-form @submit="onSubmit" @keyup.enter="onSubmit">

      <q-input clearable @clear="onDelete" :disable="loading" square class="" v-model="keyword" outlined placeholder="Type your keyword..."
        input-class="text-left">
        <template v-slot:append>
          <q-btn @click="onSubmit" :disable="loading" :loading="loading" square unelevated color="red" label="search" />
        </template>
      </q-input>
    </q-form>

  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/author-store'


export default defineComponent({
  name: 'SearchBoxAuthor',
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
      'author',
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
      'onRetrieveAuthor',
    ]),
    onSubmit() {

      const currentRoute = this.$route
      const current_page = 1 //this.current_page ? this.current_page : Number(currentRoute.query.current_page)
      const order = this.order ? this.order : currentRoute.query.order
      const per_page = this.per_page ? this.per_page : Number(currentRoute.query.per_page)
      const keyword = this.keyword ? this.keyword : currentRoute.query.keyword
      const author = this.author ? this.author : currentRoute.query.author

      this.$router.push({
        query: {
          current_page: current_page,
          order: order,
          per_page: per_page,
          keyword: keyword,
          author: author
        }
      })

      this.onRetrieveAuthor({
        current_page,
        order,
        per_page,
        keyword,
        author
      })

    },
    onDelete() {

      const currentRoute = this.$route
      const current_page = 1 //this.current_page ? this.current_page : Number(currentRoute.query.current_page)
      const order = this.order ? this.order : currentRoute.query.order
      const per_page = this.per_page ? this.per_page : Number(currentRoute.query.per_page)
      const keyword = this.keyword ? this.keyword : currentRoute.query.keyword
      const author = this.author ? this.author : currentRoute.query.author

      this.$router.push({
        query: {
          current_page: current_page,
          order: order,
          per_page: per_page,
          keyword: '',
          author: author
        }
      })

    }
  }
})
</script>
