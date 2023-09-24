export const metaData = function (post, title, description, keyword) {
  function getExtends(arr, type) {
    // type = category || post_tag
    let temp_arr = []
    for (let i = 0; i < arr?.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        // console.log(arr[i][j]['taxonomy'], type)
        if(arr[i][j]['taxonomy'] == type) {
          temp_arr.push(arr[i][j]['name'])
        }
      }
    }
    return temp_arr.toString()
  }

  return {
    title: `${title} - ${post?.title?.rendered}`,
    // sets document title
    // title: 'Index Page',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    // titleTemplate: title => `${title} - ${post?.title?.rendered} - My Website`,

    // meta tags
    meta: {
      description: { name: 'description', content: `${description} - ${post?.excerpt?.rendered}` },
      keywords: { name: 'keywords', content: `${keyword}, ${getExtends(post?.extends, 'category')}, ${getExtends(post?.extends, 'post_tag')}` },
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
          return `${title} - ${post?.title?.rendered}`
        }
      },
      ogKeyword: {
        property: 'og:keyword',
        template(ogTitle) {
          return `${keyword}, ${getExtends(post?.extends, 'category')}, ${getExtends(post?.extends, 'post_tag')}`
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
          return `https://musikalindo.com/`
        }
      },
      ogSiteName: {
        property: 'og:site_name',
        template(ogTitle) {
          return `musikalindo`
        }
      },
    },

    link: {
      material: { rel: 'canonical', href: 'https://musikalindo.com/' }
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

export const metaDataStatic = function (post, title, description, keyword) {
  return {
    title: `${title}`,

    // meta tags
    meta: {
      description: { name: 'description', content: `${description}` },
      keywords: { name: 'keywords', content: `${keyword}` },
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
          return `${title}`
        }
      },
      ogKeyword: {
        property: 'og:keyword',
        template(ogTitle) {
          return `${keyword}`
        }
      },
      ogDescription: {
        property: 'og:description',
        template(ogTitle) {
          return `${description}`
        }
      },
      ogUrl: {
        property: 'og:url',
        template(ogTitle) {
          return `https://musikalindo.com/`
        }
      },
      ogSiteName: {
        property: 'og:site_name',
        template(ogTitle) {
          return `musikalindo`
        }
      },
    },

    link: {
      material: { rel: 'canonical', href: 'https://musikalindo.com/' }
    },
  }
}
