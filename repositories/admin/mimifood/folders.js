const resource = '/apis/admin/topics/'
const baseResource = 'admin/folders'

export default ($api_food) => ({
  adminFetchFolders() {
    return $api_food.get(`${baseResource}`)
  },
  adminCreateFolder(payload) {
    return $api_food.post(`${baseResource}/create`, payload)
  },
  adminUpdateFolder(payload) {
    return $api_food.post(`${baseResource}/update`, payload)
  },
  adminDestroyTopic(payload) {
    return $api_food.get(`${baseResource}/adminDestroyTopic`, { params: { id: payload } })
  },
  adminUnDestroyTopic(payload) {
    return $api_food.get(`${baseResource}/adminUnDestroyTopic`, { params: { id: payload } })
  },
})
