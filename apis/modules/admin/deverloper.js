import API from "@/apis/modules/admin/index"


const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}


export default {
  create(input) {
    return API.post("/apis/deverloper/create.php", input, headers)
  },
  getAll() {
    return API.get(`/apis/deverloper/getAll.php`)  
  },
  show(params) {
    return API.get(`/apis/topdeverloperics/show.php`,params)
  },
  showEdit(params) {
    return API.get(`/apis/deverloper/show_edit.php`,params)
  },
  edit(input) {
    return API.post(`/apis/deverloper/edit.php`,input,headers)
  },
  delete(params) {
    return API.get(`/apis/deverloper/delete.php`, params)
  },
  
}