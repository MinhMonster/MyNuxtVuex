const resource = '/api/admin'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchSaleOffs(payload) {
    return $api.get(`${resource}/fetchSaleOffs`, { params: { input: payload.input } },
    )
  },
  fetchSaleOff(payload) {
    return $api.get(`${resource}/fetchSaleOff/${payload}`)
  },
  updateSaleOff(payload) {
    return $api.post(`${resource}/updateSaleOff`, payload)
  },
  setDefaultSaleOff(payload) {
    return $api.post(`${resource}/setDefaultSaleOff`, { id: payload.id, value: payload.value })
  },
})