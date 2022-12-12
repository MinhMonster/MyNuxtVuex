import API from "@/apis/modules/admin/index"


const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}


export default {
  create(input) {
    return API.post("/apis/topics/create.php", input, headers)
  },
  getAll() {
    return API.get(`/apis/topics/getAll.php`)  
  },
  show(params) {
    return API.get(`/apis/topics/show.php`,params)
  },
  showEdit(params) {
    return API.get(`/apis/topics/show_edit.php`,params)
  },
  edit(input) {
    return API.post(`/apis/topics/edit.php`,input,headers)
  },
  delete(params) {
    return API.get(`/apis/topics/delete.php`, params)
  },
  
}