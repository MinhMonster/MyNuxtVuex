const resource = '/apis/game/avatars'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchAccountAvatars(payload) {
    return $api.get(`${resource}/fetchAccountAvatars.php`,
      { params: { input: payload.input } },
      {
        hideLoading: true
      });
  },
  fetchAccountAvatar(payload) {
    return $api.get(`${resource}/fetchAccountAvatar.php`, payload)
  },
})