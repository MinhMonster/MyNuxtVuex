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
  cancelAndRefund(payload) {
    return $api.get(`${resource}/${payload.id}/cancel-and-refund`)
  },
  updateAccount(payload) {
    return $api.post(`${resource}/${payload.id}/update-account`, payload.input)
  },
  updateStatus(payload) {
    return $api.post(`${resource}/${payload.id}/update-status`, { status: payload.status })
  },
  destroy(id) {
    return $api.delete(`${resource}/${id}/destroy`)
  },
  restore(id) {
    return $api.patch(`${resource}/${id}/restore`)
  }
})
