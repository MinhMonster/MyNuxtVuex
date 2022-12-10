// import API from "@/apis/index"
import API from "@/apis/modules/client/index"

const headers = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
}
export default {
  register(credentials) {
    return API.post("/api/user", credentials);
  },
  // login(credentials) {
  //   return API.post("/api/auths/user_login", {
  //     email: credentials.email, password: credentials.password
  //   })
  // },

  login(credentials) {
    return API.post("/apis/auths/login.php", {
      username: credentials.email, 
      password: credentials.password
    }, headers)
  },


  logout(){
    return API.get("/apis/auths/logout.php")
  },
  profile() {
    return API.get("/api/user")
  },
  update(credentials) {
    return API.put("/api/user", credentials)
  },
  changeEmail(credentials) {
    return API.post("/api/user/change_email", credentials);
  },
  changePhone(credentials) {
    return API.post("/api/user/change_phone", credentials);
  },
  changePassword(credentials) {
    return API.post("/api/user/change_password", credentials);
  },
}