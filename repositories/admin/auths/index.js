const resource = '/apis/admin/auths'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  login(payload) {
    return $api.post(`${resource}/login.php`, payload);
  },
  logout() {
    return $api.get(`${resource}/logout.php`);
  }
})