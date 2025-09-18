const resource = '/avatars'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchAccountAvatars(payload) {
    return $api.get(`${resource}`,
      { params: { input: payload.input } },
      {
        hideLoading: true
      });
  },
  fetchAccountAvatar(id) {
    return $api.get(`${resource}/${id}`)
  },
})