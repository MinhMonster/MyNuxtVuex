const resource = '/apis/topics'
export default ($api) => ({
  fetchTopics(payload) {
    return $api.get(`${resource}/fetchTopics.php`, { params: { input: payload.input } },)
  },
  fetchTopic(link) {
    return $api.get(`${resource}/fetchTopic.php?link=${link}`)
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