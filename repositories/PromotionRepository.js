const resource = '/apis/topics/getAll.php'
export default ($api) => ({
  all() {
    return $api.get(`${resource}`)
  },

  show(id) {
    return $api.get(`${resource}/${id}`)
  },

  create(payload) {
    return $api.post(`${resource}`, payload)
  },

  update(id, payload) {
    return $api.post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $api.delete(`${resource}/${id}`)
  }
})