import { getI18n } from '@/i18n'

export function translateTitle(title) {
  const { t, te } = getI18n().global
  if (te(`vabI18n.${title}`)) return t(`vabI18n.${title}`)
  return title
}
