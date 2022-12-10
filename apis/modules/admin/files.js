import API from "../admin/index"
// import qs from "qs"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}

export default {
  create(input) {
    return API.post("/apis/files/create.php", input, headers)
  },
  getAll(params) {
    return API.get(`/apis/files/getAll.php`, params)
  },
  getAllList(queryParams) {
    return API.get(`/api/admins/files`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  show(params) {
    return API.get(`/apis/files/show.php`,params)
  },
  edit(input) {
    return API.post(`/apis/files/edit.php`,input,headers)
  },
  delete(params) {
    return API.get(`/apis/files/delete.php`, params)
  },
  upload(input) {
    return API.post(`/apis/files/upload.php`, input.file, headers)
  },
  deleteFile(params) {
    return API.get(`/apis/files/delete-file.php`, params)
  },
}