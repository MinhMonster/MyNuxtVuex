const resource = '/apis/files'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  upload(payload) {
    return $api.post(`${resource}/${payload.path}?folder=${payload.folder}`, payload.data, headers)
  },
  fetchFiles(payload) {
    return $api.get(`${resource}/get_files.php?folder=${payload}`)
  },
  deleteFile(payload) {
    return $api.post(`${resource}/delete_file.php`, payload)
  },
})

