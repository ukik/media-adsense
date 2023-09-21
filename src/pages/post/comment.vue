<template>
  <div class="q-mx-md q-mb-lg text-h6">Comments</div>

  <q-list separator bordered class="col-12 q-mx-md">
    <template v-for="(item, index) in items">

      <q-item>
        <q-item-section top avatar>
          <q-avatar :color="colors[(Math.floor(Math.random() * colors.length))]" text-color="white">
            {{ item?.author_name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">{{ item?.author_name }}</q-item-label>
          <q-item-label caption>{{ get_date(item?.date) }}</q-item-label>
          <q-item-label class="text-caption q-pt-sm">{{ item?.content.rendered }}</q-item-label>
        </q-item-section>

      </q-item>
    </template>
  </q-list>

  <div class="col-12 text-center" v-if="items.length > 0">
    <PaginationPostComment />
  </div>

  <q-separator class="q-mx-md" />

  <div class="q-mx-md text-h6 q-my-lg">Form Comment</div>

  <q-form @submit="onSubmit" @keyup.enter="onSubmit" class="col-12 q-mr-md q-ml-none q-mb-lg row q-col-gutter-md">
    <div class="col-12">
      <q-input clearable outlined placeholder="Name" v-model="comment_author" lazy-rules
        :rules="[val => !!val || 'Name is required']" counter maxlength="100" hint=""></q-input>
    </div>
    <div class="col-12">
      <q-input clearable outlined placeholder="Email" type="email" v-model="comment_author_email" lazy-rules
        :rules="[val => !!val || 'Email is required']" counter maxlength="100" hint=""></q-input>
    </div>
    <div class="col-12">
      <q-input clearable outlined placeholder="Website" counter maxlength="255" v-model="comment_author_url"></q-input>
    </div>
    <div class="col-12">
      <q-input clearable outlined type="textarea" v-model="comment_content" placeholder="Write message here..." lazy-rules
        :rules="[val => !!val || 'Message is required']" hint="" autogrow
        input-style="min-height: 250px; height: 250px;"></q-input>
    </div>
    <div class="col-12">

      <VueRecaptcha
        ref="recaptcha"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        sitekey="6LeWeA8oAAAAABHk3pZFJjd7vhFl6AYfNI2yshcc">
      </VueRecaptcha>

      <q-banner v-if="send" class="text-left q-mt-lg" rounded :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3']">
        <template v-slot:avatar>
          <q-icon name="check_circle" color="green" />
        </template>
        Data has been sent, your comment will be deleted if violence and offensive, thanks.
      </q-banner>

      <q-btn type="submit" icon="send" class="q-mt-lg" color="primary" unelevated label="Submit" />
    </div>
  </q-form>

  <q-separator class="q-mx-md" />
</template>


<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from 'src/stores/comment-store'

export default defineComponent({
  name: 'PostComment',
  props: ['id'],
  computed: {
    ...mapState(useStore, [
      'items',
    ]),
    // get_color() {
    //   let arr = ['primary','dark','orange','red','pink','cyan','teal','purple']
    //   return arr[(Math.floor(Math.random() * arr.length))]
    // },
  },
  data() {
    return {
      colors: ['primary', 'dark', 'orange', 'red', 'pink', 'cyan', 'teal', 'purple'],
      loading: false,
      send: false,

      comment_post_ID: '',
      comment_author: '',
      comment_author_email: '',
      comment_author_url: '',
      comment_author_IP: '',
      comment_date: '',
      comment_date_gmt: '',
      comment_content: '',
      comment_karma: '',
      comment_approved: '',
      comment_agent: '',
      comment_type: '',
      comment_parent: '',
      user_id: '',

      recaptcha: '',
    }
  },
  created() {
    this.onRetrieveComment({
      post_id: this.id
    })
  },
  watch: {
    id(val) {
      this.onRetrieveComment({
        post_id: val
      })

    }
  },
  methods: {
    ...mapActions(useStore, [
      'onRetrieveComment',
    ]),
    get_date(item) {
      if (!item) return 0

      const timeStamp = new Date(item);

      return date.formatDate(timeStamp, 'MMM, DD YYYY');
    },

    onCaptchaVerified: function (recaptchaToken) {
      this.recaptcha = recaptchaToken
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
      this.recaptcha = '';
    },
    notify(val) {
      this.$q.notify({
        message: "Warning",
        caption: val + " is required",
        icon: "warning",
        color: "orange"
      })
    },
    async onSubmit() {
      const vm = this

      if (!vm.comment_author) {
        vm.notify('Name is required')
        return
      }
      if (!vm.comment_author_email) {
        vm.notify('Email is required')
        return
      }
      if (!vm.comment_content) {
        vm.notify('Message is required')
        return
      }
      if (!vm.recaptcha) {
        vm.notify('reCAPTCHA')
        return
      }

      vm.$q.loading.show()
      vm.loading = true

      const formData = new FormData()

      formData.append('comment_post_ID', vm.id)
      formData.append('comment_author', vm.comment_author)
      formData.append('comment_author_email', vm.comment_author_email)
      formData.append('comment_author_url', vm.comment_author_url)
      formData.append('comment_content', vm.comment_content)

      formData.append('comment_agent', navigator.userAgent)

      formData.append('recaptcha', vm.recaptcha)

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      await vm.$axios.post(this.host_laravel + 'comment',
        formData,
        {
          // Config
        }
      )
        .then(response => {
          vm.$q.notify({
            message: "Success",
            caption: "data has been sent",
            icon: "check_circle",
            color: "green"
          })


          vm.comment_post_ID = ''
          vm.comment_author = ''
          vm.comment_author_email = ''
          vm.comment_author_url = ''
          vm.comment_author_IP = ''
          vm.comment_date = ''
          vm.comment_date_gmt = ''
          vm.comment_content = ''
          vm.comment_karma = ''
          vm.comment_approved = ''
          vm.comment_agent = ''
          vm.comment_type = ''
          vm.comment_parent = ''
          vm.user_id = ''

          vm.send = true

          setTimeout(() => {
            vm.send = false
          }, 10000);

          return response
        })
        .catch(error => {
          vm.$q.notify({
            message: "Failed",
            caption: "data was not sent",
            icon: "error",
            color: "red"
          })
          // this.errorMessage = error.message;
          console.log('errorNotify', error.response)
          console.error("There was an error!", error);
        });

      vm.$q.loading.hide()
      vm.loading = false

      vm.$refs.recaptcha.reset();
      vm.recaptcha = ''

      // vm.onRetrieveComment({
      //   post_id: vm.id
      // })

      // submitResult.value = data
    }

  }
})
</script>
