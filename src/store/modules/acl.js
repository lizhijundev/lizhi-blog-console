export const useAclStore = defineStore('acl', {
  state: () => ({
    admin: false,
    role: [],
    permission: [],
  }),
  getters: {
    getAdmin: (state) => state.admin,
    getRole: (state) => state.role,
    getPermission: (state) => state.permission,
  },
  actions: {
    setFull(admin) {
      this.admin = admin
    },
    setRole(role) {
      this.role = role
    },
    setPermission(permission) {
      this.permission = permission
    },
  },
})
