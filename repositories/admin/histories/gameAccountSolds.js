const resource = '/admin/account-purchase-histories'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchGameAccountSolds(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  fetchGameAccountSold(payload) {
    return $api.get(`${resource}/fetchGameAccountSold.php`, { params: { id: payload } })
  },
  update(payload) {
    return $api.post(`${resource}/${payload.id}/update`, payload.input)
  },
  updateAccount(payload) {
    return $api.post(`${resource}/${payload.id}/update-account`, payload.input)
  },
  destroyGameAccountSold(payload) {
    return $api.get(`${resource}/destroyGameAccountSold.php`, { params: { id: payload } })
  },
})
