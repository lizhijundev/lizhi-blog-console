import pinia from '@/store'
import { titleReverse, titleSeparator } from '@/config'
import { useSettingsStore } from '@/store/modules/settings'
import { i18n } from '@/i18n'
import { Composer } from 'vue-i18n'

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle: string | undefined) {
  const { getTitle } = useSettingsStore(pinia)
  let newTitles = []
  const { t } = i18n.global as Composer
  if (pageTitle) newTitles.push(t(pageTitle))
  // if (pageTitle) newTitles.push(pageTitle)
  if (getTitle) newTitles.push(getTitle)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
