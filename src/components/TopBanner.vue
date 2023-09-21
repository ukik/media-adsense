<template>
  <div class="col-12 row q-my-md" v-show="$q.screen.width > 425">
    <RouterLink :to="{ name:'home' }">
      <img class="col-auto" src="~assets/icon-sample.png" style="height: 100px; width: 300px;">
    </RouterLink>
    <div class="col q-px-md">
        <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:100px"
          data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
          Adsense X
        </div>
      </div>
  </div>
</template>
