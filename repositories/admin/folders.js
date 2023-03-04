const resource = '/apis/folders'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  fetchFolders() {
    return $api.get(`${resource}/index.php`)
  },
  createFolder(payload) {
    return $api.post(`${resource}/create.php`, payload)
  },
  editNameFolder(payload) {
    return $api.post(`${resource}/edit_name_folder.php`, payload)
  },
  deleteMedia(id) {
    return $api.get(`${resource}/delete.php?id=${id}`)
  }
})