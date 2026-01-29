const resource = '/topics'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
  fetch(slug) {
    return $api.get(`${resource}/${slug}`)
  },
})
