const resource = '/apis/deverloper/'
export default ($api) => ({
  scroll(payload) {
    return $api.get(`${resource}/scroll.php`,payload)
  },
  all() {
    return $api.get(`${resource}/getAll.php`)
  },

  show(payload) {
    return $api.get(`${resource}/show.php`,payload)
  },
  view(payload) {
    return $api.get(`${resource}/view.php`,payload)
  },
  change_positions(payload) {
    return $api.post(`${resource}/change_positions.php`, payload)
  },

  create(payload) {
    return $api.post(`${resource}/create.php`, payload)
  },

  update(id, payload) {
    return $api.post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $api.delete(`${resource}/${id}`)
  }
})