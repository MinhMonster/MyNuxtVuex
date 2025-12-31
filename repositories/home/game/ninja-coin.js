const resource = '/ninja-coin'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchXuNinjaPrices() {
    return $api.get(`${resource}/prices`);
  },
  buyXuNinja(payload) {
    return $api.post(`${resource}/buy`, payload,)
  },
  fetchHistoryBuyXuNinjas(payload) {
    return $api.get(`${resource}/histories?`, { params: { input: payload.input } },)
  },
})
