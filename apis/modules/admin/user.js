

import API from "@/apis/modules/client/index"
import qs from "qs"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}


export default {
  create(input) {
    return API.post("/apis/users/create.php", input, headers)
  },
  getAll() {
    return API.get(`/apis/users/getAll.php`)
  },
  show(params) {
    return API.get(`/apis/users/show.php`, params)
  },
  lock(params) {
    return API.get(`/apis/users/lock.php`, params)
  },
  unLock(params) {
    return API.get(`/apis/users/unLock.php`, params)
  },
  edit(input) {
    return API.post(`/apis/users/edit.php`, input, headers)
  },
  delete(params) {
    return API.get(`/apis/users/delete.php`, params)
  },

}