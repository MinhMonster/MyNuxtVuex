const resource = '/apis/game/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({

  fetchNickNinjas() {
    return $api.get(`${resource}/fetchNickNinjas.php`)
  },
  fetchAccountNinja(payload){
    return $api.get(`${resource}/fetchAccountNinja.php`, payload)
  },
})