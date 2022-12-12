

import API from "../admin/index"

// import qs from "qs"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}


export default {
  create(input) {
    return API.post("/apis/menu/create.php", input, headers)
  },
  getAll() {
    return API.get(`/apis/menu/getAll.php`)
  },
  show(params) {
    return API.get(`/apis/menu/show.php`,params)
  },
  edit(input) {
    return API.post(`/apis/menu/edit.php`,input,headers)
  },
  delete(params) {
    return API.get(`/apis/menu/delete.php`, params)
  },
  
}