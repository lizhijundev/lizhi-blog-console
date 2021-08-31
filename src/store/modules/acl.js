const state = () => ({
  admin: false,
  role: [],
  permission: [],
})
const getters = {
  admin: (state) => state.admin,
  role: (state) => state.role,
  permission: (state) => state.permission,
}
const mutations = {
  setFull(state, admin) {
    state.admin = admin
  },
  setRole(state, role) {
    state.role = role
  },
  setPermission(state, permission) {
    state.permission = permission
  },
}
const actions = {
  setFull({ commit }, admin) {
    commit('setFull', admin)
  },
  setRole({ commit }, role) {
    commit('setRole', role)
  },
  setPermission({ commit }, permission) {
    commit('setPermission', permission)
  },
}
export default { state, getters, mutations, actions }
