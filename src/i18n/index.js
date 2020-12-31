import en from './en'
import zh from './zh'
import store from '@/store'
import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const messages = {
  en: {
    ...en,
    ...enLocale,
  },
  zh: {
    ...zh,
    ...zhLocale,
  },
}

function getLanguage() {
  return store.getters['settings/language'] || 'zh'
}

let i18n

export function setupI18n(app) {
  i18n = createI18n({
    locale: getLanguage(),
    messages,
  })
  app.use(i18n)
}

export function getI18n() {
  return i18n
}
