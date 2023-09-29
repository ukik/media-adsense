<template>

  <div class="q-pa-md col-12">
    <div class="col-12 row q-col-gutter-md">
      <div class="col">
        <q-select :disable="loading" :loading="loading" v-model="per_page" :options="options" label="Per Page" />
      </div>
      <div class="col">
        <q-select :disable="loading" :loading="loading" v-model="order" :options="orders" label="Sort" />
      </div>
    </div>

    <div class="col-12 flex justify-center q-mt-lg">
      <q-list bordered class="q-pa-sm">
        <q-pagination :disable="loading" v-model="current_page" :max="max_pages" :input="$q.screen.width <= 425" :max-pages="6" direction-links boundary-links
          icon-first="skip_previous" icon-last="skip_next" icon-prev="fast_rewind" icon-next="fast_forward" />
      </q-list>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/menu-categories-store'

export default {
  computed: {
    ...mapState(useStore, {
      max_pages: 'max_pages',
      loading: 'loading',
    }),
    ...mapWritableState(useStore, {
      current_page: 'current_page',
      per_page: 'per_page',
      order: 'order',
    }),
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrieveMenuCategories',
    ]),
  },
  watch: {
    current_page(val) {
      this.onRetrieveMenuCategories()
    },
    per_page(val) {
      this.onRetrieveMenuCategories()
    },
    order(val) {
      this.onRetrieveMenuCategories()
    },
  },
  setup() {
    return {
      // current: ref(3),
      // model: ref(25),
      options: [
        1, 5, 10, 15, 20, 25
      ],
      orders: ['asc','desc']
    }
  }
}
</script>
