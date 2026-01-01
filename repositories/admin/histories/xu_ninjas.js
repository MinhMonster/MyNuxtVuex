const resource = '/apis/admin/histories/xu_ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchXuNinjas(payload) {
    return $api.get(`${resource}/fetchXuNinjas.php`, { params: { input: payload.input } },
    )
  },
  confirmXuNinja(payload) {
    return $api.post(`${resource}/confirmXuNinja.php`, { input: payload.input },
    )
  },
})
