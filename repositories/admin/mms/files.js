const baseResource = 'admin/files'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api_mms) => ({
  uploads(payload) {
    return $api_mms.post(`${baseResource}/uploads?folder_id=${payload.folder ? payload.folder.id : null}`,
      payload.data,
      headers
    )
  },
  fetchFiles(payload) {
    return $api_mms.post(`${baseResource}${payload.folder ? `?folder_id=${payload.folder.id}` : ''}`)
  },
  deleteFile(id) {
    return $api_mms.delete(`${baseResource}/${id}/delete`)
  },
})

