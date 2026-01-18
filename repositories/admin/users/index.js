const resource = 'admin/users'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  fetch(payload) {
    return $api.get(`${resource}/fetchUser.php`, payload)
  },
  update(payload) {
    return $api.post(`${resource}/${payload.id}/update`, payload.input)
  },
  updateCash(payload) {
    return $api.post(`${resource}/${payload.id}/update-cash`, {
      amount: payload.input.amount,
      direction: payload.input.direction
    })
  },
  updateStatus(payload) {
    return $api.post(`${resource}/${payload.id}/update-status`, { status: payload.status })
  },
})
