const resource = '/admin/game/dragon-balls'
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
  destroyAccountDragonBall(payload) {
    return $api.post(`${resource}/destroy`, { id: payload })
  },
  unDestroyAccountDragonBall(payload) {
    return $api.post(`${resource}/restore`, { id: payload })
  },
})
