<template>
  <div class="col-12 row">
    <template v-for="i in 12">
      <CardPostNonCategoryPage class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"></CardPostNonCategoryPage>
    </template>

    <PaginationHome />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeIndex'
})
</script>
