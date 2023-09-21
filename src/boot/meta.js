export const metaData = function (post, title, description) {
  return {
    title: `${title} - ${description}`,
    // sets document title
    // title: 'Index Page',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    // titleTemplate: title => `${title} - ${post?.title?.rendered} - My Website`,

    // meta tags
    meta: {
      description: { name: 'description', content: `${description} - ${post?.excerpt?.rendered}` },
      keywords: { name: 'keywords', content: `${description} - ${post?.excerpt?.rendered}` },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      robots: { name: 'robots', content: "follow, index" },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogLocale: {
        property: 'og:locale',
        template(ogTitle) {
          return `id_ID`
        }
      },
      ogType: {
        property: 'og:type',
        template(ogTitle) {
          return `website`
        }
      },
      ogTitle: {
        property: 'og:title',
        template(ogTitle) {
          return `${ogTitle} ${title} - ${description}`
        }
      },
      ogKeyword: {
        property: 'og:keyword',
        template(ogTitle) {
          return `${description} - ${post?.excerpt?.rendered}`
        }
      },
      ogDescription: {
        property: 'og:description',
        template(ogTitle) {
          return `${description} - ${post?.excerpt?.rendered}`
        }
      },
      ogUrl: {
        property: 'og:url',
        template(ogTitle) {
          return `https://FreeUdemyCourse.com/`
        }
      },
      ogSiteName: {
        property: 'og:site_name',
        template(ogTitle) {
          return `FreeUdemyCourse`
        }
      },
    },

    link: {
      material: { rel: 'canonical', href: 'https://FreeUdemyCourse.com/' }
    },


    // CSS tags
    // link: {
    //   material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    // },

    // JS tags
    // script: {
    //   ldJson: {
    //     type: 'application/ld+json',
    //     innerHTML: `{ "@context": "http://schema.org" }`
    //   }
    // },

    // <html> attributes
    // htmlAttr: {
    //   'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">
    //   empty: undefined // generates <html empty>
    // },

    // <body> attributes
    // bodyAttr: {
    //   'action-scope': 'xyz', // generates <body action-scope="xyz">
    //   empty: undefined // generates <body empty>
    // },

    // <noscript> tags
    // noscript: {
    //   default: 'This is content for browsers with no JS (or disabled JS)'
    // }
  }
}

export const metaDataStatic = function (post, title, description) {
  return {
    title: `${title} - ${description}`,

    // meta tags
    meta: {
      description: { name: 'description', content: `${title} - ${description}` },
      keywords: { name: 'keywords', content: `${title} - ${description}` },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      robots: { name: 'robots', content: "follow, index" },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogLocale: {
        property: 'og:locale',
        template(ogTitle) {
          return `id_ID`
        }
      },
      ogType: {
        property: 'og:type',
        template(ogTitle) {
          return `website`
        }
      },
      ogTitle: {
        property: 'og:title',
        template(ogTitle) {
          return `${ogTitle} ${title} - ${description}`
        }
      },
      ogKeyword: {
        property: 'og:keyword',
        template(ogTitle) {
          return `${title} - ${description}`
        }
      },
      ogDescription: {
        property: 'og:description',
        template(ogTitle) {
          return `${title} - ${description}`
        }
      },
      ogUrl: {
        property: 'og:url',
        template(ogTitle) {
          return `https://FreeUdemyCourse.com/`
        }
      },
      ogSiteName: {
        property: 'og:site_name',
        template(ogTitle) {
          return `FreeUdemyCourse`
        }
      },
    },

    link: {
      material: { rel: 'canonical', href: 'https://FreeUdemyCourse.com/' }
    },
  }
}
