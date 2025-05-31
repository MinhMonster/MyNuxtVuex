const resource = '/apis/client/settings';
export default ($api) => ({
  fetchNotification() {
    return $api.get(`/apis/client/settings/fetchNotification.php`)
  },
  updateNotification(payload) {
    return $api.post(`apis/admin/settings/updateNotification.php`, payload)
  },
})