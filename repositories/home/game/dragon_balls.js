const resource = '/apis/game/dragon_balls'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchAccountDragonBalls(payload) {
    return $api.get(`${resource}/fetchAccountDragonBalls.php`,
      { params: { input: payload.input } },
      {
        hideLoading: true
      });
  },
  fetchAccountDragonBall(payload) {
    return $api.get(`${resource}/fetchAccountDragonBall.php`, payload)
  },
})