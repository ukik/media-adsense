// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const defaultStep = 'id'
const routes = [
  {
    path: '/',
    // name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter(to, from, next) { // WAJIB ADA
      console.log('xxxxxxx', to?.params?.locale)
      if(!to?.params?.locale) {
        next({
          name: 'home',
          params: {
            locale: 'id'
          }
        })
      } else {
        next()
      }
    },
    children: [
      {
        path: '/:locale(id|en)',
        children: [
          // { path: '', component: () => import('pages/IndexPage.vue') },
          {
            path: '',
            // name: 'home',
            component: () => import('layouts/MainSubLayout.vue'),
            children: [
              {
                path: '',
                name: 'home',
                component: () => import('pages/home')
              },
              {
                path: 'category/:slug',
                name: 'category',
                component: () => import('pages/category')
              },
              {
                path: 'tag/:slug',
                name: 'tag',
                component: () => import('pages/tag')
              },
              {
                path: 'author/:slug',
                name: 'author',
                component: () => import('pages/author')
              },
              // {
              //   path: '/date/:slug',
              //   name: 'date',
              //   component: () => import('pages/date')
              // },
              {
                path: 'date/:slug',
                name: 'date',
                component: () => import('pages/date')
              },
              {
                path: 'post/:slug',
                name: 'post',
                component: () => import('pages/post')
              },
              {
                path: 'contact',
                name: 'contact',
                component: () => import('pages/contact')
              },

              {
                path: 'disclaimer',
                name: 'disclaimer',
                component: () => import('pages/disclaimer')
              },
              {
                path: 'privacy-policy',
                name: 'privacy',
                component: () => import('pages/privacy')
              },
              {
                path: 'terms-of-use',
                name: 'terms',
                component: () => import('pages/terms')
              },
            ]
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
