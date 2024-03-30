import pinia from '@/store'
import { titleReverse, titleSeparator } from '@/config'
import { useSettingsStore } from '@/store/modules/settings'
import { transApp } from '@/i18n'

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle: string | undefined) {
  const { getTitle } = useSettingsStore(pinia)
  let newTitles = []
  // if (pageTitle) newTitles.push(transApp(pageTitle))
  if (pageTitle) newTitles.push(pageTitle)
  if (getTitle) newTitles.push(getTitle)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
