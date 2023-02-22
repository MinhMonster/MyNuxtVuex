const resource = '/apis/files/'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({

  // upload(payload) {
  //   return $api.post(`${resource}/upload.php`, payload)
  // },
  upload(payload) {
    return $api.post(`${resource}/${payload.path}`, payload.data, headers)
  },
})

