const resource = '/admin/settings';
export default ($api) => ({
  fetch() {
    return $api.get(`${resource}`)
  },
  modify(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
})
