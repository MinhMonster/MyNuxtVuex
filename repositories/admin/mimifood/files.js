const baseResource = 'admin/files'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api_food) => ({
  uploads(payload) {
    return $api_food.post(`${baseResource}/uploads?folder_id=${payload.folder ? payload.folder.id : null}`,
      payload.data,
      headers
    )
  },
  fetchFiles(payload) {
    return $api_food.post(`${baseResource}${payload.folder ? `?folder_id=${payload.folder.id}` : ''}`)
  },
  deleteFile(id) {
    return $api_food.delete(`${baseResource}/${id}/delete`)
  },
})

