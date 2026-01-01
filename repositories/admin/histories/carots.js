const resource = '/apis/admin/histories/carots'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchCarots(payload) {
    return $api.get(`${resource}/fetchCarots.php`, { params: { input: payload.input } },
    )
  },
  confirmCarot(payload) {
    return $api.post(`${resource}/confirmCarot.php`, { input: payload.input },
    )
  },
})
