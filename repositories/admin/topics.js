const resource = '/admin/topics'
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
  destroy(payload) {
    return $api.post(`${resource}/destroy`, { id: payload })
  },
})
