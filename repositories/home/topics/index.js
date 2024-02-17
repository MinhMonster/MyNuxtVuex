const resource = '/apis/topics'
export default ($api) => ({
  fetchTopics(payload) {
    return $api.get(`${resource}/fetchTopics.php`, { params: { input: payload.input } },)
  },
  fetchTopic(link) {
    return $api.get(`${resource}/fetchTopic.php?link=${link}`)
  },
})