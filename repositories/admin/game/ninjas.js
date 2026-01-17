const resource = '/admin/game/ninjas'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: { input: payload.input } },
    )
  },
  fetch(id) {
    return $api.get(`${resource}/${id}`)
  },
  modify(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  destroyAccountNinja(id) {
    return $api.post(`${resource}/destroy`, { id: id })
  },
  unDestroyAccountNinja(id) {
    return $api.post(`${resource}/restore`, { id: id })
  },
})
