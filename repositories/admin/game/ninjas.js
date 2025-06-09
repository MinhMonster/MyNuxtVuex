const resource = '/admin/game/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api_mms) => ({
  fetchAccountNinjas(payload) {
    return $api_mms.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  createAccountNinja(payload) {
    return $api_mms.post(`${resource}/modify`, payload)
  },
  fetchAccountNinja(id) {
    return $api_mms.get(`${resource}/${id}`)
  },
  updateAccountNinja(payload) {
    return $api_mms.post(`${resource}/modify`, payload)
  },
  destroyAccountNinja(payload) {
    return $api_mms.post(`${resource}/destroy`, { id: payload } )
  },
  unDestroyAccountNinja(payload) {
    return $api_mms.post(`${resource}/restore`, { id: payload } )
  },
})