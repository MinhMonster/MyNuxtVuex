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
  loginFb() {
    return $api.get(`/login.php`);
  },
  register(payload) {
    return $api.post(`${resource}/register.php`, payload);
  },
  fetchUser() {
    return $api.get(`${resource}/fetchUser.php`,)
  },
  historyBuyAccounts(payload) {
    return $api.get(`${resource}/history/historyBuyAccounts.php`, { params: { input: payload.input } },)
  },
  historyBuyAccount(payload) {
    return $api.get(`${resource}/history/historyBuyAccount.php?id=${payload}`)
  },
  buyAccountNinja(payload) {
    return $api.post(`${resource}/buy/buyAccountNinja.php`, payload)

  },
  historyChangeMoneys(payload) {
    return $api.get(`${resource}/history/historyChangeMoneys.php`, { params: { input: payload.input } },)
  },
})