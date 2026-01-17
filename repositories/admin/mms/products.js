const resource = '/apis/admin/topics/'
const baseResource = 'admin/products'

export default ($api_mms) => ({
  adminFetchProducts(payload) {
    return $api_mms.get(`${baseResource}`, { params: { input: payload.input } })
  },
  adminFetchProduct(id) {
    return $api_mms.get(`${baseResource}/${id}`)
  },
  adminCreateAndUpdateProduct(payload) {
    return $api_mms.post(`${baseResource}`, payload)
  },
})
