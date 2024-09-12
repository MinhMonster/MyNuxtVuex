const resource = '/apis/admin/histories/game_account'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchGameAccountSolds(payload) {
    return $api.get(`${resource}/fetchGameAccountSolds.php`, { params: { input: payload.input } },
    )
  },
  fetchGameAccountSold(payload) {
    return $api.get(`${resource}/fetchGameAccountSold.php`, { params: { id: payload } })
  },
  updateGameAccountSold(payload) {
    return $api.post(`${resource}/updateGameAccountSold.php`, payload)
  },
})