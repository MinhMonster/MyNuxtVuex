

import API from "@/apis/modules/client/index"
import qs from "qs"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}


export default {
  create(input) {
    return API.post("/apis/project/create.php", input, headers)
  },
  getAll(params) {
    return API.get(`/apis/project/getAll.php`, params)
  },
  getAllList(queryParams) {
    return API.get(`/api/admins/species`, {
      params: queryParams, paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },
  show(params) {
    return API.get(`/apis/project/show.php`,params)
  },
  edit(input) {
    return API.post(`/apis/project/edit.php`,input,headers)
  },
  delete(params) {
    return API.get(`/apis/project/delete.php`, params)
  },
  upload(input) {
    return API.post(`/apis/project/upload.php`, input.file, headers)
  },
  deleteFile(params) {
    return API.get(`/apis/files/delete.php`, params)
  },
}