

import API from "@/apis/modules/client/index"
import qs from "qs"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}


export default {


  showFile(params) {
    return API.get(`/apis/files/show-file.php`,params)
  },
  
}