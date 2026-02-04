const resource = '/admin/game/avatars'
export default ($api) => ({
  index(payload) {
    return $api.get(`${resource}`, { params: payload.input },
    )
  },
  fetch(id) {
    return $api.get(`${resource}/${id}`)
  },
  modify(payload) {
    return $api.post(`${resource}/modify`, payload)
  },
  destroy(id) {
    return $api.post(`${resource}/${id}/destroy`)
  },
  restore(item) {
    return $api.post(`${resource}/${item.id}/restore`)
  },
})
