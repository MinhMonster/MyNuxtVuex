const resource = '/apis/admin/histories/bank_deposits'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchBankDeposits(payload) {
    return $api.get(`${resource}/fetchBankDeposits.php`, { params: { input: payload.input } },
    )
  },
  confirmBankDeposit(payload) {
    return $api.post(`${resource}/confirmBankDeposit.php`, { input: payload.input },
    )
  },
})