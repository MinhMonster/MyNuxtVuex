const resource = '/account-purchases'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input },)
  },
  show(id) {
    return $api.get(`${resource}/${id}`)
  },
  cancel(id) {
    return $api.get(`${resource}/${id}/cancel`)
  },
  payRemaining(id) {
    return $api.get(`${resource}/${id}/pay-remaining`)
  },
  purchase(payload) {
    return $api.post(`${resource}`, payload)
  },
})
