<template>
  <q-no-ssr>
    <SearchBoxHome />
  </q-no-ssr>
  <div class="col-12 q-pa-md text-h5">Contact Us</div>

  <q-form @submit="onSubmit" @keyup.enter="onSubmit" class="col-12 q-pr-md q-ml-none q-mb-lg row q-col-gutter-md">
    <div class="col-12">
      <q-input clearable outlined placeholder="Name" v-model="name" lazy-rules
        :rules="[val => !!val || 'Name is required']" counter maxlength="100" hint=""></q-input>
    </div>
    <div class="col-12">
      <q-input clearable outlined placeholder="Email" type="email" v-model="email" lazy-rules
        :rules="[val => !!val || 'Email is required']" counter maxlength="100" hint=""></q-input>
    </div>
    <div class="col-12">
      <q-input clearable outlined placeholder="Subject" counter maxlength="255" v-model="subject"></q-input>
    </div>
    <div class="col-12">
      <q-input clearable outlined type="textarea" v-model="description" placeholder="Write message here..." lazy-rules
        :rules="[val => !!val || 'Message is required']" hint="" autogrow
        input-style="min-height: 250px; height: 250px;"></q-input>
    </div>
    <div class="col-12">
      <q-no-ssr>
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
          Data has been sent, thanks.
        </q-banner>

      </q-no-ssr>
      <q-btn type="submit" icon="send" class="q-mt-lg" color="primary" unelevated label="Submit" />
    </div>
  </q-form>

</template>


<script>
import { defineComponent } from 'vue'

import { createMetaMixin } from 'quasar'
import { metaDataStatic } from "boot/meta"
import axios from 'axios'
export default defineComponent({
  mixins: [
    createMetaMixin(function () {
      return metaDataStatic(this.web_title, this.web_description, this.web_keyword)
    })
  ],
  name: 'ContactIndex',
  data() {
    return {
      form_id: 451, // wordpress plugin CF7 to API

      loading: false,
      send: false,

      name: '',
      email: '',
      subject: '',
      description: '',

      recaptcha: '',
    }
  },
  methods: {
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

      if (!vm.name) {
        vm.notify('Name is required')
        return
      }
      if (!vm.email) {
        vm.notify('Email is required')
        return
      }
      if (!vm.subject) {
        vm.notify('Subject is required')
        return
      }
      if (!vm.description) {
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

      formData.append('locale', vm.$route.params.locale)

      formData.append('form_id', vm.form_id)
      formData.append('name', vm.name)
      formData.append('email', vm.email)
      formData.append('subject', vm.subject)
      formData.append('description', vm.description)

      formData.append('recaptcha', vm.recaptcha)

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      await axios.post(this.host_laravel + 'contact',
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

          vm.name = ''
          vm.email = ''
          vm.subject = ''
          vm.description = ''

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

    }

  }
})
</script>
