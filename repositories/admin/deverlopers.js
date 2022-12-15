const resource = '/apis/deverloper/'
export default ($api) => ({
  all() {
    return $api.get(`${resource}/getAll.php`)
  },

  show(id) {
    return $api.get(`${resource}/show.php`,{
      params:{
        id: id
      }
    })
  },
  view(id) {
    return $api.get(`${resource}/view.php`,{
      params:{
        id: id
      }
    })
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