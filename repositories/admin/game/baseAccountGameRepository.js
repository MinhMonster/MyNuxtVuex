export default ($api, resource) => ({
  index(payload) {
    return $api.get(resource, {
      params: payload.input,
    })
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

  restore(payload) {
    return $api.post(`${resource}/${payload.id}/restore`)
  },

  toggleDeposit(payload) {
    return $api.get(`${resource}/${payload.id}/toggle-deposit`)
  },

  toggleInstallments(payload) {
    return $api.get(`${resource}/${payload.id}/toggle-installments`)
  },
})
