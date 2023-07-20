const resource = '/apis/admin/topics/'
export default ($api) => ({
  fetchTopics() {
    return $api.get(`${resource}/fetchTopics.php`)
  },
  fetchTopic(id) {
    return $api.get(`${resource}/fetchTopic.php?id=${id}`)
  },
  show(id) {
    return $api.get(`${resource}/${id}`)
  },

  create(payload) {
    return $api.post(`${resource}`, payload)
  },

  updateTopic(payload) {
    return $api.post(`${resource}/updateTopic.php`, payload)
  },

  delete(id) {
    return $api.delete(`${resource}/${id}`)
  }
})