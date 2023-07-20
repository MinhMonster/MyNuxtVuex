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
  logout() {
    return $api.get(`${resource}/logout.php`);
  },
  register(payload) {
    return $api.post(`${resource}/register.php`, payload);
  },
  getToken() {
    return $api.get(`${resource}/getToken.php`,)
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
  buyAccountAvatar(payload) {
    return $api.post(`${resource}/buy/buyAccountAvatar.php`, payload)

  },
  buyAccountDragonBall(payload) {
    return $api.post(`${resource}/buy/buyAccountDragonBall.php`, payload)

  },
  historyChangeMoneys(payload) {
    return $api.get(`${resource}/history/historyChangeMoneys.php`, { params: { input: payload.input } },)
  },
  depositVnd(payload) {
    return $api.post(`${resource}/wallet/depositVnd.php`, payload,)
  },
  depositCard(payload) {
    return $api.post(`${resource}/wallet/depositCard.php`, payload,)
  },
  historyWalletDepositVnds(payload) {
    return $api.get(`${resource}/history/historyWalletDepositVnds.php`, { params: { input: payload.input } },)
  },
  fetchHistoryWalletDepositVnd(payload) {
    return $api.get(`${resource}/wallet/fetchHistoryDepositVnd.php?id=${payload}`)
  },
  fetchHistoryWalletDepositCards(payload) {
    return $api.get(`${resource}/wallet/fetchHistoryWalletDepositCards.php`, { params: { input: payload.input } },)
  },
  fetchHistoryWalletDepositCard(payload) {
    return $api.get(`${resource}/wallet/fetchHistoryWalletDepositCard.php?id=${payload}`)
  },
})