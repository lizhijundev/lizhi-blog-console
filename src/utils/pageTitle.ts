import i18n from '@/i18n'
import pinia from '@/store'
import { useSettingsStore } from '@/store/modules/settings'
import { titleReverse, titleSeparator } from '@/config'

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle: string | undefined) {
  const { getTitle } = useSettingsStore(pinia)
  const { t, te } = i18n.global
  if (te(`vabI18n.${pageTitle}`)) pageTitle = t(`vabI18n.${pageTitle}`)
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (getTitle) newTitles.push(getTitle)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
