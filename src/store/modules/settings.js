/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { isJson } from '@/utils/validate'
import {
  background,
  collapse as _collapse,
  columnStyle,
  fixedHeader,
  i18n,
  layout,
  logo,
  showFullScreen,
  showLanguage,
  showNotice,
  showProgressBar,
  showRefresh,
  showSearch,
  showTabs,
  showTabsIcon,
  showTheme,
  showThemeSetting,
  tabsBarStyle,
  themeName,
  title,
} from '@/config'

const defaultTheme = {
  background,
  columnStyle,
  fixedHeader,
  layout,
  showProgressBar,
  showTabs,
  tabsBarStyle,
  showTabsIcon,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFullScreen,
  showThemeSetting,
  themeName,
}
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value)
  } else {
    return false
  }
}
const { collapse } = getLocalStorage('collapse')
const { language } = getLocalStorage('language')
const state = () => ({
  logo,
  title,
  device: 'desktop',
  collapse: collapse || _collapse,
  language: language || i18n,
  theme: getLocalStorage('theme') || { ...defaultTheme },
  extra: { first: '' },
})
const getters = {
  logo: (state) => state.logo,
  title: (state) => state.title,
  device: (state) => state.device,
  collapse: (state) => state.collapse,
  language: (state) => state.language,
  theme: (state) => state.theme,
  extra: (state) => state.extra,
}
const mutations = {
  openSideBar(state) {
    state.collapse = false
  },
  foldSideBar(state) {
    state.collapse = true
  },
  toggleDevice(state, device) {
    state.device = device
  },
  toggleCollapse(state) {
    state.collapse = !state.collapse
    localStorage.setItem('collapse', `{"collapse":${state.collapse}}`)
  },
  changeLanguage(state, language) {
    state.language = language
    localStorage.setItem('language', `{"language":"${language}"}`)
  },
  saveTheme(state) {
    localStorage.setItem('theme', JSON.stringify(state.theme))
  },
  resetTheme(state) {
    state.theme = { ...defaultTheme }
    localStorage.removeItem('theme')
  },
  updateTheme(state) {
    document.getElementsByTagName(
      'body'
    )[0].className = `vab-theme-${state.theme.themeName}`
    let variables = require('@/vab/styles/variables/vab-blue-variables.scss')
    if (state.theme.themeName.includes('blue-'))
      variables = require('@/vab/styles/variables/vab-blue-variables.scss')
    if (state.theme.themeName.includes('green-'))
      variables = require('@/vab/styles/variables/vab-green-variables.scss')
    if (state.theme.themeName.includes('red-'))
      variables = require('@/vab/styles/variables/vab-red-variables.scss')
    const style = `
            --el-color-primary: ${variables['vab-color-primary']};
            --el-color-primary-light-1: ${variables['vab-color-primary-light-1']};
            --el-color-primary-light-2: ${variables['vab-color-primary-light-2']};
            --el-color-primary-light-3: ${variables['vab-color-primary-light-3']};
            --el-color-primary-light-4: ${variables['vab-color-primary-light-4']};
            --el-color-primary-light-5: ${variables['vab-color-primary-light-5']};
            --el-color-primary-light-6: ${variables['vab-color-primary-light-6']};
            --el-color-primary-light-7: ${variables['vab-color-primary-light-7']};
            --el-color-primary-light-8: ${variables['vab-color-primary-light-8']};
            --el-color-primary-light-9: ${variables['vab-color-primary-light-9']};
            --el-color-success: ${variables['vab-color-success']};
            --el-color-success-light: ${variables['vab-color-success-light']};
            --el-color-success-lighter: ${variables['vab-color-success-lighter']};
            --el-color-warning: ${variables['vab-color-warning']};
            --el-color-warning-light: ${variables['vab-color-warning-light']};
            --el-color-warning-lighter: ${variables['vab-color-warning-lighter']};
            --el-color-danger: ${variables['vab-color-danger']};
            --el-color-danger-light: ${variables['vab-color-danger-light']};
            --el-color-danger-lighter: ${variables['vab-color-danger-lighter']};
            --el-color-error: ${variables['vab-color-error']};
            --el-color-error-light: ${variables['vab-color-error-light']};
            --el-color-error-lighter: ${variables['vab-color-error-lighter']};
            --el-color-info: ${variables['vab-color-info']};
            --el-color-info-light: ${variables['vab-color-info-light']};
            --el-color-info-lighter: ${variables['vab-color-info-lighter']};
            --el-border-radius-base: ${variables['vab-border-radius-base']};
            `
    document.getElementsByTagName('body')[0].setAttribute('style', style)
    if (state.theme.background !== 'none') {
      document
        .getElementsByTagName('body')[0]
        .classList.add(state.theme.background)
    }
  },
}
const actions = {
  openSideBar({ commit }) {
    commit('openSideBar')
  },
  foldSideBar({ commit }) {
    commit('foldSideBar')
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device)
  },
  toggleCollapse({ commit }) {
    commit('toggleCollapse')
  },
  changeLanguage: ({ commit }, language) => {
    commit('changeLanguage', language)
  },
  saveTheme({ commit }) {
    commit('saveTheme')
  },
  resetTheme({ commit }) {
    commit('resetTheme')
    commit('updateTheme')
  },
  updateTheme({ commit }) {
    commit('updateTheme')
  },
}
export default { state, getters, mutations, actions }
