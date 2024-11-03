const resource = '/apis/admin/topics/'
const baseResource = 'admin/folders'

export default ($api_food) => ({
  adminFetchFolders() {
    return $api_food.get(`${baseResource}`)
  },
  adminCreateFolder(payload) {
    return $api_food.post(`${baseResource}`, payload)
  },
  adminCreateAndUpdateProduct(payload) {
    return $api_food.post(`${baseResource}`, payload)
  },
  adminDestroyTopic(payload) {
    return $api_food.get(`${baseResource}/adminDestroyTopic`, { params: { id: payload } })
  },
  adminUnDestroyTopic(payload) {
    return $api_food.get(`${baseResource}/adminUnDestroyTopic`, { params: { id: payload } })
  },
})
