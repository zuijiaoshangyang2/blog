const { reverse, sortBy } = require('lodash')

module.exports = {
    title: '云匿博客',
    base: '/',
    description: '记录一些基础但有用的玩机指南，然后我想写啥写啥，希望这里有适合你的内容',
    theme: require.resolve('../../'),
    plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-C7JDHRCBP0' // UA-00000000-0
      }
    ]
  ],
    head: [
        ['script', {
            defer: true,
            'data-domain': 'tj.naaa.top',
            src: 'https://tj.naaa.top/js/script.js'
        }],
        ['script', {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-C7JDHRCBP0'
        }],
        ['link', {
            rel: 'icon',
            href: `/mylogo.png`
        }],
        ['link', {
            rel: 'manifest',
            href: '/manifest.json'
        }],
        ['meta', {
            name: 'theme-color',
            content: '#2c3e50'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ['link', {
            rel: 'apple-touch-icon',
            href: '/mylogo.png'
        }],
        ['link', {
            rel: 'mask-icon',
            href: '/mylogo.png',
            color: '#3eaf7c'
        }],
        ['meta', {
            name: 'msapplication-TileImage',
            content: '/mylogo.png'
        }],
        ['meta', {
            name: 'msapplication-TileColor',
            content: '#000000'
        }],
        ['meta', {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0'
        }]
    ],
    themeConfig: {
        logo: '/avatars/mylogo.png',
        pwa: false,
        authors: [
            {
                name: 'yuniee',
                avatar: '/avatars/myicon.png',
                link: 'https://www.yuniee.de/',
                linktext: 'Follow',
            },
            {
                name: 'gosh',
                avatar: '/avatars/rodber.png',
                link: 'https://github.com',
                linktext: 'GitHub',
            },
            {
                name: 'Sape',
                avatar: '/avatars/sape.jpg',
                link: 'https://rodolfoberrios.com/',
                linktext: 'EL RODO SAPEE!',
            },
            {
                name: 'OMA',
                avatar: '/avatars/oma.jpg',
                link: 'https://chevereto.com/',
                linktext: 'Chevereto.com',
            }
        ],
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com',
                },
                {
                    type: 'mail',
                    link: 'mailto:mail@yuniee.de',
                },
                {
                    type: 'globe',
                    link: 'https://yuniee.de',
                },
            ],
            copyright: [
                 {
                   text: '网站访问统计',
                   link: 'https://tj.naaa.top/tj.naaa.top',
                 },
            ],
        },
        sitemap: {
            hostname: 'https://www.yuniee.de/'
        },
        comment: {
          service: 'disqus',
          shortname: 'demowebsite',
        },
        // newsletter: {
        //   endpoint: '/'
        // },
        feed: {
            canonical_base: 'https://www.yuniee.de/',
            sort: (entries) => reverse(sortBy(entries, 'date')),
        },
        smoothScroll: true
    },
}
