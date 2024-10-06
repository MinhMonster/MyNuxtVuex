const resource = '/products'
export default ($api) => ({
  fetchProducts(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },)
  },
  fetchTopic(link) {
    return $api.get(`${resource}/fetchTopic.php?link=${link}`)
  },
})
