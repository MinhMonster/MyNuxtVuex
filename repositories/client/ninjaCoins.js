const resource = '/ninja-coins'

export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input });
  },
  fetch(slug) {
    return $api.get(`${resource}/${slug}`)
  },
  buyXuNinja(payload) {
    return $api.post(`${resource}/purchase`, payload,)
  },
  fetchXuNinjaPrices() {
    return $api.get(`${resource}/prices`);
  },
})
