const resource = '/apis/users'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  login(payload) {
    return $api.post(`${resource}/login.php`, payload);
  },
  register(payload) {
    return $api.post(`${resource}/register.php`, payload);
  },
  fetchUser() {
    return $api.get(`${resource}/fetchUser.php`,)
  },
})