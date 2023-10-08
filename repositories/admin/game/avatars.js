const resource = '/apis/admin/game/avatars'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  createAccountAvatar(payload) {
    return $api.post(`${resource}/createAccountAvatar.php`, payload)
  },
  fetchAccountAvatars(payload) {
    return $api.get(`${resource}/fetchAccountAvatars.php`, { params: { input: payload.input } },
    )
  },
  fetchAccountAvatar(payload) {
    return $api.get(`${resource}/fetchAccountAvatar.php`, { params: { id: payload } })
  },
  updateAccountAvatar(payload) {
    return $api.post(`${resource}/updateAccountAvatar.php`, payload)
  },
  destroyAccountAvatar(payload) {
    return $api.get(`${resource}/destroyAccountAvatar.php`, { params: { id: payload } }
    )
  },
  unDestroyAccountAvatar(payload) {
    return $api.get(`${resource}/unDestroyAccountAvatar.php`, { params: { id: payload } })
  },
})