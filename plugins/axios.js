// const GLOBAL_TOAST_ERROR_MESSAGE =
//   "エラーが発生しました。ご確認をお願い致します。";

export default function ({ $axios, store, redirect, app }, inject) {
  const api = $axios.create({
    baseURL: process.env.VUE_APP_API_HOME
  }); 
  
  api.interceptors.request.use((config) => {
      console.log(store)
      config.headers = {
        // Authorization: "Bearer " + store,
        Authorization: "Bearer " + "admxinS"
    
      };
  
    
    return config;
  });
  
  
  
  api.interceptors.response.use((result) => {
    // Toasted.success("okok")
    console.log(result)
      if((result.data.status_code == 401)){
        window.location.href = "/"
        // router('/')
      }
   
    return result;
  })

  inject("api", api);
}