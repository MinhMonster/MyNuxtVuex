const resource = ''
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
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
  historyBuyAccounts(payload) {
    return $api.get(`${resource}/account-purchase-histories`, { params: { input: payload.input } },)
  },
  historyBuyAccount(id) {
    return $api.get(`${resource}/account-purchase-histories/${id}`)
  },
  buyAccount(payload) {
    return $api.post(`${resource}/account-purchase`, payload)

  },
  historyChangeMoneys(payload) {
    return $api.get(`${resource}/account/transactions`, { params: { input: payload.input } },)
  },
  depositVnd(payload) {
    return $api.post(`${resource}/top-up/bank`, payload)
  },
  depositCard(payload) {
    return $api.post(`${resource}/wallet/depositCard.php`, payload,)
  },
  buyCarot(payload) {
    return $api.post(`${resource}/services/buyCarot.php`, payload,)
  },
  fetchHistoryBuyCarots(payload) {
    return $api.get(`${resource}/services/fetchHistoryBuyCarots.php?`, { params: { input: payload.input } },)
  },
  buyXuNinja(payload) {
    return $api.post(`${resource}/services/buyXuNinja.php`, payload,)
  },
  fetchHistoryBuyXuNinjas(payload) {
    return $api.get(`${resource}/services/fetchHistoryBuyXuNinjas.php?`, { params: { input: payload.input } },)
  },
  historyWalletDepositVnds(payload) {
    return $api.get(`${resource}/top-up/bank/histories`, { params: { input: payload.input } },)
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
