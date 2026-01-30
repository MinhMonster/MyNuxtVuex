const resource = '/carrots'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
  create(payload) {
    return $api.post(`${resource}/topup`, payload.input,)
  },
  fetch(slug) {
    return $api.get(`${resource}/${slug}`)
  },
})
