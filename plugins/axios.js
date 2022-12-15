export default function ({store, $axios, redirect }, inject) {

  const axiosConfig = { timeout: 60000 };
  axiosConfig.baseURL = process.env.apiUrl;

  const api = $axios.create(axiosConfig);

  api.onRequest(config => {
    // console.log('Making request to ' + config.url)
    config.headers = {  
      Authorization: "Bearer " + store.state.admin.auth.token
    };
  })

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      redirect('/logout')

    }
  })
  inject("api", api);
}