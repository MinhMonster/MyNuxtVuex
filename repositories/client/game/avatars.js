const resource = '/avatars'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
  fetch(code) {
    return $api.get(`${resource}/${code}`)
  },
})
