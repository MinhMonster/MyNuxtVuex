const resource = '/account-purchases'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input },)
  },
  show(id) {
    return $api.get(`${resource}/${id}`)
  },
  purchase(payload) {
    return $api.post(`${resource}`, payload)
  },
})
