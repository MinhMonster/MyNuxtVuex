const resource = '/apis/finances/'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  scroll(payload) {
    return $api.get(`${resource}/scroll.php`,payload)
  },
  all() {
    return $api.get(`${resource}/index.php`)
  },

  show(payload) {
    return $api.get(`${resource}/show.php`,payload)
  },
  show_edit(payload) {
    return $api.get(`${resource}/show_edit.php`,payload)
  },
  show_month(payload) {
    return $api.get(`${resource}/show_month.php`,payload)
  },
  show_day(payload) {
    return $api.get(`${resource}/show_day.php`,payload)
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
  new_day(payload) {
    return $api.post(`${resource}/new_day.php?year=2023&month=2`, payload)
  },
  update_day(payload) {
    return $api.post(`${resource}/update_day.php`, payload)
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