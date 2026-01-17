const resource = '/admin'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  login(payload) {
    return $api.post(`${resource}/login`, payload);
  },
  logout() {
    return $api.get(`${resource}/logout`);
  }
})