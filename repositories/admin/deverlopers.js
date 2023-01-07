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
  show_edit(payload) {
    return $api.get(`${resource}/show_edit.php`,payload)
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
  edit(payload) {
    return $api.post(`${resource}/edit.php`, payload)
  },

  update(id, payload) {
    return $api.post(`${resource}/${id}`, payload)
  },

  delete(payload) {
    return $api.get(`${resource}/delete.php`,payload)
  }
})