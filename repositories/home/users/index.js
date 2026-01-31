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
  historyBuyAccounts(payload) {
    return $api.get(`${resource}/account-purchases`, { params: payload.input },)
  },
  historyBuyAccount(id) {
    return $api.get(`${resource}/account-purchases/${id}`)
  },
  buyAccount(payload) {
    return $api.post(`${resource}/account-purchases`, payload)

  },
  fetchWalletTransactions(payload) {
    return $api.get(`${resource}/account/transactions`, { params: payload.input },)
  },
  depositCard(payload) {
    return $api.post(`${resource}/wallet/depositCard.php`, payload,)
  },
  buyCarot(payload) {
    return $api.post(`${resource}/carrots/topup`, payload.input,)
  },
  createBankTopUp(payload) {
    return $api.post(`${resource}/top-up/transactions/bank`, payload)
  },
  getBankTopUpHistory(payload) {
    return $api.get(`${resource}/top-up/transactions/bank`, { params: { input: payload.input } },)
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
