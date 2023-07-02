const resource = '/apis/admin/game/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  createAccountNinja(payload){
    return $api.post(`${resource}/createAccountNinja.php`, payload)
  },
  fetchAccountNinjas() {
    return $api.get(`${resource}/fetchAccountNinjas.php`)
  },
  fetchAccountNinja(payload){
    return $api.get(`${resource}/fetchAccountNinja.php`, payload)
  },
  updateAccountNinja(payload){
    return $api.post(`${resource}/updateAccountNinja.php`, payload)
  },
  destroyAccountNinja(payload){
    return $api.get(`${resource}/destroyAccountNinja.php`, payload)
  },
})