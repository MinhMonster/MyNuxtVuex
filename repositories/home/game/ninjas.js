const resource = '/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchAccountNinjas(payload) {
    return $api.get(`${resource}`,
      { params: { input: payload.input } },
      {
        hideLoading: true
      });
  },
  fetchAccountNinja(id) {
    return $api.get(`${resource}/${id}`)
  },
})
