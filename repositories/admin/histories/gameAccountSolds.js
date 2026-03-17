const resource = '/admin/account-purchases'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input },
    )
  },
  fetch(id) {
    return $api.get(`${resource}/${id}`)
  },
  update(payload) {
    return $api.post(`${resource}/${payload.id}/update`, payload.input)
  },
  updateAccount(payload) {
    return $api.post(`${resource}/${payload.id}/update-account`, payload.input)
  },
  destroy(payload) {
    return $api.get(`${resource}/destroyGameAccountSold.php`, { params: { id: payload } })
  },
})
