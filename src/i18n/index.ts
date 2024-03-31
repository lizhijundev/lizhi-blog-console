import pinia from '@/store'
import { useSettingsStore } from '@/store/modules/settings'
import { createI18n } from 'vue-i18n'
import { LanguageType } from '/#/store'
import en from './locales/en.json'
import zh from './locales/zh.json'
import enLocale from 'element-plus/dist/locale/en'
import zhLocale from 'element-plus/dist/locale/zh-cn'

export { enLocale, zhLocale }

const messages: Record<LanguageType, any> = {
  en: {
    ...en,
  },
  zh: {
    ...zh,
  },
}

function getLanguage() {
  const { getLanguage } = useSettingsStore(pinia)
  return getLanguage
}

export const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  fallbackLocale: 'zh',
  messages,
})

export function setupI18n(app: any) {
  app.use(i18n)
  return i18n
}

export function transApp(message: string | undefined, namespace = '') {
  if (!message) {
    return ''
  }
  console.log('getLanguage()我看看', getLanguage(), message)
  return (
    [getLanguage(), namespace, message].reduce(
      (o, k) => (o || {})[k],
      messages as any
    ) || message
  )
}

export function translate(message: string | undefined) {
  if (!message) {
    return ''
  }
  return (
    [getLanguage(), 'vabI18n', message].reduce(
      (o, k) => (o || {})[k],
      messages as any
    ) || message
  )
}
