const resource = '/apis/game/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchAccountNinjas(payload) {
    return $api.get(`${resource}/fetchAccountNinjas.php`,
      { params: { input: payload.input } },
      {
        hideLoading: true
      });
  },
  fetchAccountNinja(payload) {
    return $api.get(`${resource}/fetchAccountNinja.php`, payload)
  },
})