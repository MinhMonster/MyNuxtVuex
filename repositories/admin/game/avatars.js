const resource = '/admin/game/avatars'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchAccountAvatars(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  fetchAccountAvatar(id) {
    return $api.get(`${resource}/${id}`)
  },
  createAccountAvatar(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  updateAccountAvatar(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  destroyAccountAvatar(payload) {
    return $api.post(`${resource}/destroy`, { id: payload })
  },
  unDestroyAccountAvatar(payload) {
    return $api.post(`${resource}/restore`, { id: payload })
  },
})