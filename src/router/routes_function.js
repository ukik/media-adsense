import { useStore } from 'src/stores/GLOBAL';

export default function routes (store, cookies) {
  // const n = store;
  const _store = useStore(store)
  console.log(_store.locale)
  return [
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

          // pasang di Boot/i18n.js biar bahasanya singkron
          /*
          beforeEnter: async (to, from, next) => {
            switch (to.params.locale) {
              case 'id':
                await _store.setLocale('id-ID')
                break;
              case 'en':
                await _store.setLocale('en-US')
                break;
            }

            console.log(_store.locale)
            next()
          },
          */
          children: [
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
                  path: 'menu-categories',
                  name: 'menu_categories',
                  component: () => import('pages/menu_categories')
                },
                {
                  path: 'menu-tags',
                  name: 'menu_tags',
                  component: () => import('pages/menu_tags')
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
                  path: 'post/:id/:slug',
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
}

// export default routes
