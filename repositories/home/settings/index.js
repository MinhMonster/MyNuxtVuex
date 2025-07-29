const resource = '';
export default ($api) => ({
  fetchNotification() {
    return $api.get(`${resource}/notification`)
  },
})
