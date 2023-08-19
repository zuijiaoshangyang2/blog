const { reverse, sortBy } = require('lodash')

module.exports = {
    title: '云匿博客',
    base: '/',
    description: '记录一些有用但基础的玩机指南',
    theme: require.resolve('../../'),
    head: [
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
                linktext: 'Subscribe',
            },
            {
                name: 'rodber',
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
                // {
                //   text: '',
                //   link: '',
                // },
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
