const resource = '/admin/wallet-transactions'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchWalletTransactions(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
})
