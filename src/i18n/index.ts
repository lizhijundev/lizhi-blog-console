import pinia from '@/store'
import { useSettingsStore } from '@/store/modules/settings'
import en from './en'
import zh from './zh'
import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const messages: any = {
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
  const { getLanguage } = useSettingsStore(pinia)
  return getLanguage || 'zh'
}

const i18n = createI18n({
  locale: getLanguage(),
  messages,
})

export default i18n
