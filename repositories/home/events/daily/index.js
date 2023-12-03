const resource = '/apis/client/events'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  voted(payload) {
    return $api.post(`${resource}/dailyVoted.php`, payload,)
  },
  fetchVotedDailyEventHistories(payload) {
    console.log("api");
    return $api.get(`${resource}/fetchVotedDailyEventHistories.php`, { params: { input: payload.input } },)
  },
})