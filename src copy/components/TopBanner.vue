<template>
  <div class="col-12 flex flex-center row q-my-md" >
    <div class="col-12 flex flex-center q-pl-md" style="height: 100px; width: 300px;">
      <RouterLink :to="{ name:'home' }">
        <img style="height: 75px;" src="~assets/musikalindo.png" >
      </RouterLink>
    </div>
    <div v-show="$q.screen.width > 425" class="col q-px-md">
        <div v-if="adsense_show" class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:100px"
          data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
          Adsense X
        </div>
      </div>
  </div>
</template>
