const baseResource = 'admin/folders'

export default ($api_mms) => ({
  adminFetchFolders(payload) {
    return $api_mms.get(`${baseResource}`,  { params: { input: payload.input } })
  },
  adminCreateFolder(payload) {
    return $api_mms.post(`${baseResource}/create`, payload)
  },
  adminUpdateFolder(payload) {
    return $api_mms.post(`${baseResource}/update`, payload)
  },
  adminDestroyTopic(payload) {
    return $api_mms.get(`${baseResource}/adminDestroyTopic`, { params: { id: payload } })
  },
  adminUnDestroyTopic(payload) {
    return $api_mms.get(`${baseResource}/adminUnDestroyTopic`, { params: { id: payload } })
  },
})
