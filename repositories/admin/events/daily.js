const resource = '/api/admin'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchVotedDailyEvents(payload) {
    return $api.get(`${resource}/fetchVotedDailyEvents`, { params: { input: payload.input } },
    )
  },
})