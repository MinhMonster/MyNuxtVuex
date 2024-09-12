const resource = '/apis/admin/users'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchUsers(payload) {
    return $api.get(`${resource}/fetchUsers.php`, { params: { input: payload.input } },
    )
  },
  fetchUser(payload) {
    return $api.get(`${resource}/fetchUser.php`, payload)
  },
  updateUser(payload) {
    return $api.post(`${resource}/updateUser.php`, payload)
  },
  updateCashUser(payload) {
    return $api.post(`${resource}/updateCashUser.php`, payload)
  },
})