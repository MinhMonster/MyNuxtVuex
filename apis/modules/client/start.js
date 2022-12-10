

import API from "./index"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}

export default {
  start() {
    return API.get(`/apis/start/index.php`)
  },
}