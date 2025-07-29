const resource = '/admin/settings';
export default ($api) => ({
  fetchNotification() {
    return $api.get(`${resource}`)
  },
  updateNotification(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
})