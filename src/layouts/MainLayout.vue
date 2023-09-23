<template>
  <q-layout @scroll="scrollHandler" view="lHh Lpr lFf">
    <q-header unelevated>
      <q-no-ssr>
        <div v-if="$q.screen.width > 425" class="row flex items-center bg-dark q-pl-md">
          <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

          <!-- <q-toolbar-title>
          {{ dateNow() }}
        </q-toolbar-title> -->
          {{ dateNow() }}
          <q-space />
          <div>
            <q-btn :to="{ name: 'disclaimer' }" class="text-caption" square label="DMCA-Copyrights" flat no-caps></q-btn>
            <q-btn :to="{ name: 'privacy' }" class="text-caption" square label="Privacy Policy" flat no-caps></q-btn>
            <q-btn :to="{ name: 'terms' }" class="text-caption" square label="Terms Of Use" flat no-caps></q-btn>
          </div>
        </div>

        <q-toolbar class="bg-white" v-else>
          <q-btn @click="leftDrawerOpen = true" round color="primary" flat icon="menu"></q-btn>
          <!-- <q-toolbar-title>
          <RouterLink :to="{ name:'home' }">
            <img style="height: 50px;" src="~assets/musikalindo.png" >
          </RouterLink>
        </q-toolbar-title> -->
        </q-toolbar>
        <q-separator color="grey-4" />
      </q-no-ssr>
    </q-header>

    <q-drawer mini-to-overlay behavior="mobile" v-model="leftDrawerOpen" show-if-above bordered>
      <!-- <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list> -->

      <LeftDrawer />
    </q-drawer>

    <q-page-container class="bg-grey-3 row flex justify-center">
      <router-view :loading="loading" :positionY="positionY" :items="items_random" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { date as qdate } from 'quasar'
import { mapState, mapWritableState, mapActions } from 'pinia'

import { useStore as useStoreHome } from 'src/stores/home-store'
import { useStore as useStoreDate } from 'src/stores/date-store'
import { useStore as useStoreCategory } from 'src/stores/category-store'
import { useStore as useStoreTag } from 'src/stores/tag-store'
import { useStore as useStoreAuthor } from 'src/stores/author-store'
import { useStore as useStorePost } from 'src/stores/post-store'

import { useStore as useStoreGLOBAL } from 'src/stores/GLOBAL'

export default defineComponent({
  name: 'MainLayout',
  watch: {
    '$route.query': function () {
      this.onLoad()
    },
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      positionY: ref(0)
    }
  },
  computed: {
    ...mapState(useStoreGLOBAL, [
      'tags', 'categories', 'items_random', 'loading'
    ]),
    ...mapState(useStoreHome, {
      items: 'items',
      home_current_page: 'current_page',
      home_order: 'order',
      home_per_page: 'per_page',
      home_keyword: 'keyword',
    }),
    ...mapState(useStoreCategory, {
      items_categories: 'items_categories',
      category_current_page: 'current_page',
      category_order: 'order',
      category_per_page: 'per_page',
      category_keyword: 'keyword',
      category_category: 'category',
    }),
    ...mapState(useStoreDate, {
      items_date: 'items_date',
      date_current_page: 'current_page',
      date_order: 'order',
      date_per_page: 'per_page',
      date_keyword: 'keyword',
      date_date: 'date',
    }),
    ...mapState(useStoreTag, {
      items_tag: 'items_tag',
      tag_current_page: 'current_page',
      tag_order: 'order',
      tag_per_page: 'per_page',
      tag_keyword: 'keyword',
      tag_tag: 'tag',
    }),
    ...mapState(useStoreAuthor, {
      items_author: 'items_author',
      author_current_page: 'current_page',
      author_order: 'order',
      author_per_page: 'per_page',
      author_keyword: 'keyword',
      author_author: 'author',
    }),
    ...mapState(useStorePost, {
      post_item: 'item',
    }),
  },

  methods: {
    dateNow() {
      const today = new Date();
      return qdate.formatDate(today, 'dddd, DD MMM YYYY')
      // return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    },
    onLoadHome() {
      const currentRoute = this.$route
      const current_page = this.home_current_page ? this.home_current_page : Number(currentRoute.query.current_page)
      const order = this.home_order ? this.home_order : currentRoute.query.order
      const per_page = this.home_per_page ? this.home_per_page : Number(currentRoute.query.per_page)
      const keyword = this.home_keyword ? this.home_keyword : currentRoute.query.keyword

      this.onRetrieve({
        current_page,
        order,
        per_page,
        keyword
      })
    },
    onLoadCategory() {
      const currentRoute = this.$route
      const current_page = this.category_current_page ? this.category_current_page : Number(currentRoute.query.current_page)
      const order = this.category_order ? this.category_order : currentRoute.query.order
      const per_page = this.category_per_page ? this.category_per_page : Number(currentRoute.query.per_page)
      const keyword = this.category_keyword ? this.category_keyword : currentRoute.query.keyword
      const category = this.category_category ? this.category_category : currentRoute.query.category

      this.onRetrieveCategories({
        current_page,
        order,
        per_page,
        keyword,
        category
      })
    },
    onLoadDate() {
      const currentRoute = this.$route
      const current_page = this.date_current_page ? this.date_current_page : Number(currentRoute.query.current_page)
      const order = this.date_order ? this.date_order : currentRoute.query.order
      const per_page = this.date_per_page ? this.date_per_page : Number(currentRoute.query.per_page)
      const keyword = this.date_keyword ? this.date_keyword : currentRoute.query.keyword
      const date = this.date_date ? this.date_date : currentRoute.query.date

      this.onRetrieveDate({
        current_page,
        order,
        per_page,
        keyword,
        date
      })
    },
    onLoadTag() {
      const currentRoute = this.$route
      const current_page = this.tag_current_page ? this.tag_current_page : Number(currentRoute.query.current_page)
      const order = this.tag_order ? this.tag_order : currentRoute.query.order
      const per_page = this.tag_per_page ? this.tag_per_page : Number(currentRoute.query.per_page)
      const keyword = this.tag_keyword ? this.tag_keyword : currentRoute.query.keyword
      const tag = this.tag_tag ? this.tag_tag : currentRoute.query.tag

      this.onRetrieveTag({
        current_page,
        order,
        per_page,
        keyword,
        tag
      })
    },
    onLoadAuthor() {
      const currentRoute = this.$route
      const current_page = this.author_current_page ? this.author_current_page : Number(currentRoute.query.current_page)
      const order = this.author_order ? this.author_order : currentRoute.query.order
      const per_page = this.author_per_page ? this.author_per_page : Number(currentRoute.query.per_page)
      const keyword = this.author_keyword ? this.author_keyword : currentRoute.query.keyword
      const author = this.author_tag ? this.author_tag : currentRoute.query.author

      this.onRetrieveTag({
        current_page,
        order,
        per_page,
        keyword,
        author
      })
    },
    onLoadPost() {
      const currentRoute = this.$route

      this.onRetrievePost({
        slug: currentRoute.params.slug
      })
    },
    onLoad() {
      if (process.env.CLIENT) {
        switch (this.$route.name) {
          case 'home':
            this.onLoadHome()
            break;
          case 'category':
            this.onLoadCategory()
            break;
          case 'date':
            this.onLoadDate()
            break;
          case 'tag':
            this.onLoadTag()
            break;
          case 'author':
            this.onLoadAuthor()
            break;
          case 'post':
            this.onLoadPost()
            break;
        }
      }
    },
    scrollHandler(val) {
      this.positionY = val.position
      // console.log(val)
    },
    ...mapActions(useStoreHome, [
      'onRetrieve',
    ]),
    ...mapActions(useStoreCategory, [
      'onRetrieveCategories',
    ]),
    ...mapActions(useStoreDate, [
      'onRetrieveDate',
    ]),
    ...mapActions(useStoreTag, [
      'onRetrieveTag',
    ]),
    ...mapActions(useStoreAuthor, [
      'onRetrieveAuthor',
    ]),
    ...mapActions(useStorePost, [
      'onRetrievePost',
    ]),
    ...mapActions(useStoreGLOBAL, [
      'onGlobalCategories',
      'onGlobalTags',
      'onGlobalPost',
    ]),
  },
  created() {
    if (process.env.CLIENT) {
      if (
        this.items?.length <= 0 ||
        this.items_categories?.length <= 0 ||
        this.items_date?.length <= 0 ||
        this.items_tag?.length <= 0 ||
        this.items_author?.length <= 0 ||
        this.items_post?.length <= 0
      ) this.onLoad()
    }
  },
  mounted() {
    this.onGlobalCategories()
    // this.onGlobalTags()
    this.onGlobalPost()

    setInterval(() => {
      this.onGlobalPost()
    }, 10000);

    document.addEventListener('deviceready', function () {

      // if(vm.$q.platform.is.cordova) {
      try {

        // require('src/libs/cordova.js')
        FirebasePlugin = window.FirebasePlugin;

        // FirebasePlugin.grantPermission(function(hasPermission){
        //     console.log("Permission was " + (hasPermission ? "granted" : "denied"));
        // });

        // FirebasePlugin.hasPermission(function(hasPermission){
        //     console.log("Permission is " + (hasPermission ? "granted" : "denied"));
        // });

        // FirebasePlugin.isAutoInitEnabled(function(enabled){
        //     console.log("Auto init is " + (enabled ? "enabled" : "disabled"));
        // });

        // FirebasePlugin.setAutoInitEnabled(false, function(){
        //     console.log("Auto init has been disabled ");
        //     FirebasePlugin.unregister();
        // });

        FirebasePlugin.setBadgeNumber(1);

        // FirebasePlugin.onMessageReceived((message) => {
        // 	try {
        // 	  alert(`Notification received - ${message}`);
        // 	}
        // 	catch (error) {
        // 	  alert('error notification receive', error);
        // 	}
        // });

        FirebasePlugin.onMessageReceived(function (message) {
          console.log("Message type: " + message.messageType);
          // alert("Message type: " + (message));
          if (message.messageType === "notification") {
            console.log("Notification message received");
            if (message.tap) {
              // alert("Tapped in: " + (message.tap));
              router.push({ name: 'mobile_artikel', params: { slug: message.slug } })
              console.log("Tapped in " + message.tap);
            }
          }
          // alert("message: " + (message));
          console.dir(message);
        }, function (error) {
          console.error(error);
        });




        window.googletag = window.googletag || { cmd: [] };

        window.adsense_fluid_0;

        // window.adsense_728_90_0;
        // window.adsense_728_90_1;
        // window.adsense_728_90_2;
        // window.adsense_728_90_3;
        // window.adsense_728_90_4;
        // window.adsense_728_90_5;
        // window.adsense_728_90_6;
        // window.adsense_728_90_7;
        // window.adsense_728_90_8;
        // window.adsense_728_90_9;
        // window.adsense_728_90_10;

        window.adsense_728_90_layout_0;
        window.adsense_728_90_layout_1;
        window.adsense_728_90_layout_2;
        window.adsense_728_90_layout_3;
        window.adsense_728_90_layout_4;
        window.adsense_728_90_layout_5;


        window.adsense_728_90_artikel_0;
        window.adsense_728_90_artikel_1;
        window.adsense_728_90_artikel_2;
        window.adsense_728_90_artikel_3;
        window.adsense_728_90_artikel_4;
        window.adsense_728_90_artikel_5;
        window.adsense_728_90_artikel_6;


        window.adsense_728_90_widget_f_0;
        window.adsense_728_90_widget_f_1;

        window.adsense_300_250_left_0;
        window.adsense_300_250_left_1;
        window.adsense_300_250_left_2;
        window.adsense_300_250_left_3;

        window.adsense_300_250_right_0;
        window.adsense_300_250_right_1;
        window.adsense_300_250_right_2;
        window.adsense_300_250_right_3;
        window.adsense_300_250_right_4;


        window.adsense_250_200_0;

        window.adsense_200_150_0;

        window.adsense_150_100_0;

        window.adsense_750_200_0;

        const hsize_0 = vm.is_mobile_size ? [750, 200] : [750, 200]
        const hsize_1 = vm.is_mobile_size ? [728, 90] : [728, 90]


        googletag.cmd.push(function () {

          // window.adsense_fluid_0 = googletag.defineSlot('/6355419/Travel', ['fluid'], 'adsense_fluid_0')
          //         .setTargeting('test', 'lazyload')
          //         .setTargeting('test', 'refresh')
          //         .addService(googletag.pubads());


          // HORIZONTAL MODEL
          window.adsense_750_200_0 = googletag.defineSlot('/6355419/Travel/Europe', hsize_0, 'adsense_750_200_0')
            .setTargeting('test', 'refresh')
            .setTargeting("test", "responsive")
            .addService(googletag.pubads());


          window.adsense_728_90_artikel_0 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_0')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_artikel_1 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_1')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_artikel_2 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_2')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_artikel_3 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_3')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_artikel_4 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_4')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_artikel_5 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_5')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          // window.adsense_728_90_artikel_6 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_artikel_6')
          //         .setTargeting('test', 'lazyload')
          //         .setTargeting('test', 'refresh')
          //         .addService(googletag.pubads());


          window.adsense_728_90_layout_0 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_layout_0')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_layout_1 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_layout_1')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_layout_2 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_layout_2')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_layout_3 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_layout_3')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_layout_4 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_layout_4')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_layout_5 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_layout_5')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());

          window.adsense_728_90_widget_f_0 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_widget_f_0')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_728_90_widget_f_1 = googletag.defineSlot('/6355419/Travel', hsize_1, 'adsense_728_90_widget_f_1')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());


          // SQUARE MODEL
          window.adsense_300_250_left_0 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_left_0')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_left_1 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_left_1')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_left_2 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_left_2')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_left_3 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_left_3')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());

          window.adsense_300_250_right_0 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_right_0')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_right_1 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_right_1')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_right_2 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_right_2')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_right_3 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_right_3')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_right_4 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_right_4')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());
          window.adsense_300_250_right_5 = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], 'adsense_300_250_right_5')
            .setTargeting("test", "infinitescroll")
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .addService(googletag.pubads());


          /*
          window.adsense_250_200_0 = googletag.defineSlot('/6355419/Travel', [250, 200], 'adsense_250_200_0')
                  .setTargeting('test', 'lazyload')
                  .setTargeting('test', 'refresh')
                // .setTargeting("test", "responsive")
                // .setCollapseEmptyDiv(true)
                .addService(googletag.pubads());


          window.adsense_200_150_0 = googletag.defineSlot('/6355419/Travel', [200, 150], 'adsense_200_150_0')
                .setTargeting('test', 'refresh')
                .setTargeting("test", "responsive")
                // .setCollapseEmptyDiv(false)
                .addService(googletag.pubads());

         window.adsense_150_100_0 = googletag.defineSlot('/6355419/Travel', [150, 100], 'adsense_150_100_0')
                .setTargeting('test', 'refresh')
                .setTargeting("test", "responsive")
                // .setCollapseEmptyDiv(true, true)
                .addService(googletag.pubads());
          */

          window.googletag.defineSlot('/6355419/Travel', [320, 50], 'slot-mobile-0')
            .setTargeting('test', 'lazyload')
            .setTargeting('test', 'refresh')
            .setTargeting("test", "responsive")
            .addService(googletag.pubads());

          // googletag.defineSlot('/6355419/Travel', [320, 100], 'slot-mobile-1')
          //        .setTargeting('test', 'lazyload')
          //        .setTargeting('test', 'refresh')
          //        .setTargeting("test", "responsive")
          //        .addService(googletag.pubads());



          // Configure SRA
          window.googletag.pubads().enableSingleRequest();
          // googletag.pubads().disableInitialLoad();

          // Start ad fetching
          // sengaja dipanggil dari Footer component asumsinya terakhir di render
          // googletag.enableServices();

        });



      } catch (err) {

      }
      // }

    }, false);

  }
})
</script>
