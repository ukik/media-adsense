<template>
  <q-page class="col-12 row flex justify-center items-start">
    <q-page-scroller style="z-index: 9;" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="arrow_upward" color="pink" dense />
    </q-page-scroller>

    <div v-show="$q.screen.width > 1440" class="bannerLeft">
      <div class="adsbygoogle bg-yellow " style="display:inline-block;width:200px;height:750px;"
        data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
        Adsense 1
      </div>
    </div>

    <div class="bg-white row flex justify-center items-start col-xl-7 col-lg-9 col-md-11 col-sm-12 col-xs-12">
      <TopBanner />

      <NavMenu />

      <MobileAds />

      <div class="q-px-md q-mt-md col-12">
        <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:90px"
          data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
          Adsense 2
        </div>
      </div>

      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-xs-12 row">
        <!-- <SearchBox /> -->

        <RouterView />

      </div>

      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-xs-12" :class="[ $q.screen.width <= 425 ? 'q-pl-md' : 'q-pl-none' ]">

        <div class="q-pr-md q-py-md row q-gutter-y-md">
          <template v-for="(item, index) in items">
            <CardPost :item="item" class="col-12"></CardPost>
          </template>
        </div>

        <!-- <div id="adsense_728_90_layout_0" class="ad-slot adsense-fluid-100"></div>

        <div class="q-px-md q-mt-md">
          <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:250px"
            data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
            Adsense 3
          </div>
        </div>

        <SearchBox />

        <div class="q-px-md ">
          <div class="adsbygoogle full-width bg-yellow" style="display:inline-block;width:100%;height:250px"
            data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
            Adsense 4
          </div>
        </div>

        <div v-show="$q.screen.width > 425" class="q-px-md q-mt-md q-pb-md flex justify-center">
          <div class="sticky " :class="[positionY > 870 ? 'onSticky' : 'offSticky']">
            <div class="adsbygoogle bg-yellow" style="display:inline-block;width:100%;height:100%"
              data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
              Adsense 5
            </div>
          </div>
        </div> -->

      </div>

      <div class="col-12 q-mt-lg">
        <q-separator padding class="co-12" />

        <div class="col-12 row flex items-center q-pa-md">
          <div>
            <q-btn class="text-caption" square label="DMCA" flat no-caps></q-btn>
            <q-btn class="text-caption" square label="Copyrights" flat no-caps></q-btn>
            <q-btn class="text-caption" square label="Privacy Policy" flat no-caps></q-btn>
            <q-btn class="text-caption" square label="Terms Of UseSitemap" flat no-caps></q-btn>
          </div>

          <div class="col-12 q-px-md">
            <q-separator class="q-my-sm" />
            <span class="text-caption">© 2023 - FCS. All Rights Reserved.</span>
          </div>
        </div>
      </div>


    </div>
    <div v-show="$q.screen.width > 1440" class="bannerRight">
      <div class="adsbygoogle bg-yellow " style="display:inline-block;width:200px;height:750px;"
        data-ad-client="ca-pubxxx" data-ad-slot="slot_id">
        Adsense 6
      </div>
    </div>


  </q-page>
</template>

<script>
import PaginationHome from 'src/components/PaginationHome.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainSubLayout',
  props: ['positionY','items'],
  components: { PaginationHome }
})
</script>

<style scoped>
.onSticky {
  position: fixed;
  top: 50px;
}

.offSticky {
  position: inherit;
}

.bannerLeft {
  position: fixed;
  top: 70px;
  left: 50px;
}

.bannerRight {
  position: fixed;
  top: 70px;
  right: 50px;
}

.sticky {
  width: 250px;
  background-color: yellow;
  /* padding: 50px; */
  /* font-size: 20px; */
  height: 600px;
}
</style>
