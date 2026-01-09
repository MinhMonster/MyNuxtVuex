const baseResource = 'admin/files'
const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default ($api) => ({
  uploads(payload) {
    return $api.post(`${baseResource}/uploads?folder_id=${payload.folder ? payload.folder.id : null}`,
      payload.data,
      headers
    )
  },
  fetchFiles(payload) {
    return $api.post(`${baseResource}${payload.folder ? `?folder_id=${payload.folder.id}` : ''}`)
  },
  fetchMedias(payload) {
    return $api.post(`${baseResource}`, { params: { input: payload.input } })
  },
  deleteFile(id) {
    return $api.delete(`${baseResource}/${id}/delete`)
  },
})

