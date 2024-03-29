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
    }
  })

  api.onResponse((response) => {
    const code = response.data.code;
    const layout = _.get(store, "_vm.$nuxt.$data.layoutName", "");

    store.dispatch("global/setValidationErrors", {});

    //check theme dark
    const isThemeDark = store.state.global.isThemeDark;
    const customClassSwal = {
      container: isThemeDark ? "swal-dark" : "",
    }

    // store.dispatch("removeRequest", response.config.id);
    if (code && code === 200) {
      switch (layout) {
        case "clientLayout":
          if (response.data.message) {
            $swal.fire({
              title: response.data.message,
              html: response.data.content,
              icon: "success",
              customClass: customClassSwal
            });
          }
          break;
      }
    }
    if (code && code === 1) {
      switch (layout) {
        case "clientLayout":
          $swal
            .fire({
              title: response.data.message,
              text: response.data.error_content,
              confirmButtonColor: "#F64E60",
              cancelButtonColor: "#a4a4a4",
              showCancelButton: true,
              cancelButtonText: "Bỏ qua",
              confirmButtonText: "Nạp tiền",
              customClass: customClassSwal
              // icon: "error",
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                redirect('/nap-tien')
              }
            });
          break;
      }
    }
    if (code && code === 401) {
      switch (layout) {
        case "clientLayout":
          $swal
            .fire({
              title: response.data.message,
              text: response.data.error_content,
              confirmButtonColor: "#F64E60",
              cancelButtonColor: "#a4a4a4",
              showCancelButton: true,
              cancelButtonText: "Bỏ qua",
              confirmButtonText: "Đăng nhập",
              customClass: customClassSwal
            })
            .then(async (result) => {
              store.dispatch("home/users/logout");
              if (result.isConfirmed) {
                store.dispatch("global/openModalLogin");
              } else {
                redirect('/')
              }
            });

          break;
      }
    }
    if (code && code === 404) {
      switch (layout) {
        case "clientLayout":
          redirect('/404')
          if (response.data.message) {
            $swal.fire({
              title: response.data.message,
              html: response.data.error_content,
              icon: "error",
              customClass: customClassSwal
            });
          }
          break;
      }
    }
    if (code && code === 422) {

      switch (layout) {
        case "clientLayout":
          $swal.fire({
            title: response.data.message,
            html: response.data.error_content,
            icon: "error",
            customClass: customClassSwal
          });


          break;
      }

      const errors = response.data.errors;

      if (response.data.errors) {
        store.dispatch("global/setValidationErrors", errors ? errors || {} : {});

      }
      if (!response.data.errors) {
        store.dispatch("global/setValidationErrors", {});
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
      //     "global/setValidationErrors",
      //     findError ? findError.error_messages || {} : {}
      //   );
      // }

    }
    setTimeout(() => {
      store.dispatch("disableLoading");
    }, 50);

  });

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    // const code = parseInt(error.response && error.response.status)

    if (code === 400) {
      redirect('/400')
    }

    setTimeout(() => {
      store.dispatch("disableLoading");
    }, 50);
  })
  inject("api", api);
}