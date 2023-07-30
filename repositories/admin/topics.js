const resource = '/apis/admin/topics/'
export default ($api) => ({
  fetchTopics(payload) {
    return $api.get(`${resource}/fetchTopics.php`, { params: { input: payload.input } })
  },
  fetchTopic(id) {
    return $api.get(`${resource}/fetchTopic.php?id=${id}`)
  },
  show(id) {
    return $api.get(`${resource}/${id}`)
  },

  createTopic(payload) {
    return $api.post(`${resource}/createTopic.php`, payload)
  },

  updateTopic(payload) {
    return $api.post(`${resource}/updateTopic.php`, payload)
  },

  delete(id) {
    return $api.delete(`${resource}/${id}`)
  }
})