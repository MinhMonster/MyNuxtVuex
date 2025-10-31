const resource = '/apis/client/settings';
export default ($api) => ({
  fetchNotification() {
    return $api.get(`${resource}/fetchNotification.php`)
  },
})
