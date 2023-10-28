import { defineConfigWithTheme } from 'vitepress'

/**
 * Create Simple Link
 * @param title
 * @param url
 */
const createLink = (title: string, url: string) => {
    return { text: title, link: url }
}

const nav = []

export const sidebar = {}

// Placeholder of the i18n config for @vuejs-translations.
const i18n = {
    toc: '页内导航'
}

export default defineConfigWithTheme({
    lang: 'zh-CN',
    title: 'Poppy Js Util',
    srcDir: 'src/docs',
    srcExclude: [],
    scrollOffset: 'header',
    mpa: false,
    themeConfig: {
        search: {
            provider: 'local'
        },
        logo: 'https://file.wulicode.com/static/images/logo.png',
        nav,
        sidebar,
        // Placeholder of the i18n config for @vuejs-translations.
        i18n,
        footer: {
            copyright: `Copyright © 2015-${new Date().getFullYear()} wulicode.com`
        },
        outline: {
            level: 'deep',
            label: '大纲'
        },
    },
    vite: {
        server: {
            port: 5172
        }
    }
})
