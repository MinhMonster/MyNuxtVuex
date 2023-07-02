const resource = '/apis/admin/game/avatars'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  createAccountAvatar(payload){
    return $api.post(`${resource}/createAccountAvatar.php`, payload)
  },
  fetchAccountAvatars() {
    return $api.get(`${resource}/fetchAccountAvatars.php`)
  },
  fetchAccountAvatar(payload){
    return $api.get(`${resource}/fetchAccountAvatar.php`, payload)
  },
  updateAccountAvatar(payload){
    return $api.post(`${resource}/updateAccountAvatar.php`, payload)
  },
  destroyAccountAvatar(payload){
    return $api.get(`${resource}/destroyAccountAvatar.php`, payload)
  },
})