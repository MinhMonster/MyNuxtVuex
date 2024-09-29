const resource = '/apis/admin/topics/'
const baseResource = 'admin/products'

export default ($api_food) => ({
  adminFetchProducts(payload) {
    return $api_food.get(`${baseResource}`, { params: { input: payload.input } })
  },
  adminFetchProduct(id) {
    return $api_food.get(`${baseResource}/${id}`)
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
