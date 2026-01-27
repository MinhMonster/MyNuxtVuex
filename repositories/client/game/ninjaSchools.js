const resource = '/ninjas'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
  fetch(code) {
    return $api.get(`${resource}/${code}`)
  },
})
