const resource = '/top-up/bank'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
  create(payload) {
    return $api.post(`${resource}`, payload)
  },
})
