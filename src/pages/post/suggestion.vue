<template>
  <div class="q-mx-md q-my-lg text-h6">Suggestion</div>

  <div class="col-12 row q-col-gutter-sm q-px-md">
    <template v-for="(item, index) in items_suggestion">
      <CardPost :item="item" class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12"></CardPost>
    </template>
  </div>
  <div class="col-12 text-center" v-if="items_suggestion.length > 0">
    <PaginationPostSuggestion />
  </div>

</template>


<script>
import { defineComponent } from 'vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/post-store'

export default defineComponent({
  name: 'PostSuggestion',
  computed: {
    ...mapState(useStore, [
      'items_suggestion',
    ]),
  },
  created() {
    this.onRetrieveSuggestion()
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrieveSuggestion',
    ]),

  }
})
</script>
