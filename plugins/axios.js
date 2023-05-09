export default function ({ store, $axios, $toast, redirect, $swal }, inject) {

  const axiosConfig = { timeout: 60000 };
  axiosConfig.baseURL = process.env.apiUrl;

  const api = $axios.create(axiosConfig);

  api.onRequest(config => {
    const hideLoading = config.hideLoading;

    if (!hideLoading) {
      config.id =
        new Date().getTime() + Math.random().toString(36).substring(2, 15);
      store.dispatch("addRequest", config.id);
    }

    try {
      const namespace = _.get(store, "_vm.$nuxt.$data.layoutName", "");
      let authToken = null;

      // if (!config.noRequireToken) {
      switch (namespace) {
        case "clientLayout":
          store.dispatch("disableLoading");
          authToken = store.state.home.users.token;
          break;
        case "adminDev":
          authToken = store.state.admin.auth.token;
          break;
        default:
          authToken = null;
      }
      // }

      if (authToken) {
        config.headers = {
          Authorization: "Bearer " + authToken
        };
      }
    } catch { }

    const layout = _.get(store, "_vm.$nuxt.$data.layoutName", "");
    switch (layout) {
      case "clientLayout":
        break;
      case "adminDev":
        if (!store.state.admin.auth.token || !store.state.admin.auth.authenticated) {
          store.dispatch("admin/auth/logout");
          redirect('/admin/login')
        }
        break;
    }

    // return config;

  })

  api.onResponse((response) => {
    const code = response.data.code;
    const layout = _.get(store, "_vm.$nuxt.$data.layoutName", "");

    store.dispatch("admin/global/setValidationErrors", {});

    // store.dispatch("removeRequest", response.config.id);
    if (code && code === 200) {
      switch (layout) {
        case "clientLayout":
          $swal.fire(response.data.message, response.data.error_content, "success");
          break;
      }
    }
    if (code && code === 401) {
      switch (layout) {
        case "adminDev":
          store.dispatch("admin/auth/logout");
          redirect('/admin/login')
          break;
      }
      // store.dispatch("admin/auth/logout");
      // redirect('/admin/login')
    }
    if (code && code === 404) {
      redirect('/404')
    }
    if (code && code === 422) {

      switch (layout) {
        case "clientLayout":
          $swal.fire(response.data.message, response.data.error_content, "error");
          break;
        case "adminDev":
          $toast.error(response.data.message);
          break;
      }

      const errors = response.data.errors;

      if (response.data.errors) {
        store.dispatch("admin/global/setValidationErrors", errors ? errors || {} : {});

      }
      if (!response.data.errors) {
        store.dispatch("admin/global/setValidationErrors", {});
      }

      // const errors = response.data.errors;

      // if (errors && errors.length > 0) {
      //   errors.config = response.config;

      //   const errorMessage =
      //     response.config.toastErrorMessage ||
      //     _.get(errors[0], "message") ||
      //     GLOBAL_TOAST_ERROR_MESSAGE;
      //   if (!response.config.hideToastError) {
      //     store._vm.$nuxt.$toast.error(errorMessage);
      //   }

      //   // const findError = errors.find(
      //   //   (item) => item.error_messages && item.code === 422
      //   // );
      //   const findError = errors.find(
      //     (item) => item.error_messages && item.code === 422
      //   );
      //   store.dispatch(
      //     "admin/global/setValidationErrors",
      //     findError ? findError.error_messages || {} : {}
      //   );
      // }

    }
    setTimeout(() => {
      store.dispatch("disableLoading");
    }, 500);




  });

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    // const code = parseInt(error.response && error.response.status)

    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      store.dispatch("admin/auth/logout");
      redirect('/admin/login')
    }
    setTimeout(() => {
      store.dispatch("disableLoading");
    }, 500);
  })
  inject("api", api);
}