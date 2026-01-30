const resource = ''
export default ($api) => ({
  login(payload) {
    return $api.post(`${resource}/login`, payload);
  },
  loginFb() {
    return $api.get(`/login.php`);
  },
  logout() {
    return $api.get(`${resource}/logout`);
  },
  register(payload) {
    return $api.post(`${resource}/register`, payload);
  },
  getToken() {
    return $api.get(`${resource}/getToken.php`)
  },
  fetchUser() {
    return $api.get(`${resource}/user`)
  },
  depositCard(payload) {
    return $api.post(`${resource}/wallet/depositCard.php`, payload,)
  },
  fetchHistoryWalletDepositCards(payload) {
    return $api.get(`${resource}/wallet/fetchHistoryWalletDepositCards.php`, { params: { input: payload.input } },)
  },
  fetchHistoryWalletDepositCard(payload) {
    return $api.get(`${resource}/wallet/fetchHistoryWalletDepositCard.php?id=${payload}`)
  },
})
