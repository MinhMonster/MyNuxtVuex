const resource = '/apis/deverloper/'
export default ($api) => ({
  scroll(payload) {
    return $api.get(`${resource}/scroll.php`,payload)
  },
  all() {
    return $api.get(`${resource}/getAll.php`)
  },

  show(type) {
    return $api.get(`${resource}/show.php`,{
      params:{
        type: type
      }
    })
  },
  view(input) {
    return $api.get(`${resource}/view.php`,{
      params:{
        type: input.type,
        link: input.link,
      }
    })
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