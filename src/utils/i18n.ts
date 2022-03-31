import i18n from '@/i18n'

export function translateTitle(title: string) {
  const { t, te } = i18n.global
  if (te(`vabI18n.${title}`)) return t(`vabI18n.${title}`)
  return title
}
