const resource = '/admin/discounts'
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
    return $api.get(`${resource}/${payload}`)
  },
  modify(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  active(id) {
    return $api.get(`${resource}/${id}/active`)
  },
})
