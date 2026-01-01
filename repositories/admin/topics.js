const resource = '/apis/admin/topics/'
const baseResource = '/api'

export default ($api) => ({
  adminFetchTopics(payload) {
    return $api.get(`${baseResource}/adminFetchTopics`, { params: { input: payload.input } })
  },
  adminFetchTopic(id) {
    return $api.get(`${baseResource}/adminFetchTopic?id=${id}`)
  },

  adminCreateTopic(payload) {
    return $api.post(`${baseResource}/adminCreateTopic`, payload)
  },

  adminUpdateTopic(payload) {
    return $api.post(`${baseResource}/adminUpdateTopic`, payload)
  },
  adminDestroyTopic(payload) {
    return $api.get(`${baseResource}/adminDestroyTopic`, { params: { id: payload } })
  },
  adminUnDestroyTopic(payload) {
    return $api.get(`${baseResource}/adminUnDestroyTopic`, { params: { id: payload } })
  },
})
