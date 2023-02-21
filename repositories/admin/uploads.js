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
  upload(input) {
    return $api.post(`${resource}/upload.php`, input.file, headers)
  },
})

