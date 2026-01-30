const resource = '/account/transactions'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
})
