const resource = '/admin/top-up-transactions'
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
  confirm(payload) {
    return $api.post(`${resource}/update`, payload)
  },
})
