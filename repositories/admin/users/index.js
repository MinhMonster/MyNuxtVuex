const resource = 'admin/users'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchUsers(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  fetchUser(payload) {
    return $api.get(`${resource}/fetchUser.php`, payload)
  },
  updateUser(payload) {
    return $api.post(`${resource}/updateUser.php`, payload)
  },
  updateCashUser(payload) {
    return $api.post(`${resource}/${payload.id}/top-up`, {
      amount: payload.input.amount,
      type: payload.input.type
    })
  },
})
