const resource = '/admin/top-up-transactions'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchBankDeposits(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  confirmBankDeposit(payload) {
    return $api.post(`${resource}/update`, payload)
  },
})
