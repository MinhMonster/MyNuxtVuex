const resource = '/dragon-balls'

export default ($api) => ({
  fetchAccountDragonBalls(payload) {
    return $api.get(`${resource}`,
      { params: payload.input },
      {
        hideLoading: true
      });
  },
  fetchAccountDragonBall(code) {
    return $api.get(`${resource}/${code}`)
  },
})
