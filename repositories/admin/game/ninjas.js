const resource = '/apis/admin/game/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  createAccountNinja(payload) {
    return $api.post(`${resource}/createAccountNinja.php`, payload)
  },
  fetchAccountNinjas(payload) {
    return $api.get(`${resource}/fetchAccountNinjas.php`, { params: { input: payload.input } },
    )
  },
  fetchAccountNinja(payload) {
    return $api.get(`${resource}/fetchAccountNinja.php`, { params: { id: payload } })
  },
  updateAccountNinja(payload) {
    return $api.post(`${resource}/updateAccountNinja.php`, payload)
  },
  destroyAccountNinja(payload) {
    return $api.get(`${resource}/destroyAccountNinja.php`, { params: { id: payload } })
  },
  unDestroyAccountNinja(payload) {
    return $api.get(`${resource}/unDestroyAccountNinja.php`, { params: { id: payload } })
  },
})