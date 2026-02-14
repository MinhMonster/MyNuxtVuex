const resource = '/admin/ninja-coins'
export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  updateStatus(payload) {
    return $api.post(`${resource}/update-status`, payload)
  },
})
