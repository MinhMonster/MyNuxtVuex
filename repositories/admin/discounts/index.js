const resource = '/admin/discounts'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchSaleOffs(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  fetchSaleOff(payload) {
    return $api.get(`${resource}/${payload}`)
  },
  createSaleOff(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  updateSaleOff(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  setDefaultSaleOff(payload) {
    return $api.post(`${resource}/setDefaultSaleOff`, { id: payload.id, input: payload.input })
  },
})