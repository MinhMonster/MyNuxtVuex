export default function ({ store, $axios, $toast, redirect, $swal }, inject) {
  const axiosConfig = { timeout: 60000 };

  axiosConfig.baseURL = process.env.apiUrl;

  const api = $axios.create(axiosConfig);

  api.onRequest(config => {
    const hideLoading = config.hideLoading;

    if (!hideLoading) {
      config.id =
        new Date().getTime() + Math.random().toString(36).substring(2, 15);
    }

    try {
      const namespace = _.get(store, "_vm.$nuxt.$data.layoutName", "");
      let authToken = null;

      switch (namespace) {
        case "clientLayout":
          authToken = store.state.home.users.token;
          break;
        default:
          authToken = null;
      }

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
    const isThemeRed = store.state.global.isThemeRed;
    const customClassSwal = {
      container: isThemeDark ? "swal-dark" : (isThemeRed ? "swal-red" : ""),
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
  });

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    const layout = _.get(store, "_vm.$nuxt.$data.layoutName", "");
    // const code = parseInt(error.response && error.response.status)
    const isThemeDark = store.state.global.isThemeDark;
    const customClassSwal = {
      container: isThemeDark ? "swal-dark" : "",
    }
    if (code === 400) {
      $swal.fire({
        title: "Đã có lỗi xảy ra",
        html: "Hãy liên hện Admin để kiểm tra <br/> Xin cảm ơn!",
        icon: "error",
        customClass: customClassSwal
      });
    }

    if (code === 404) {
      const account_type = error.response.data.account_type || null;
      if (account_type) {
        $swal.fire({
          title: "Tài khoản không tồn tại",
          html: "Tài khoản không tồn tại hoặc đã bán!<br/> Hãy chọn Tài khoản khác nhé!<br/> Cảm ơn bạn nhiều ❤️",
          icon: "error",
          customClass: customClassSwal
        });
        switch (account_type) {
          case 'ninja':
            redirect('/teamobi/ninja-school')
            break;
          case 'avatar':
            redirect('/teamobi/avatar')
            break;
          case 'dragon_ball':
            redirect('/teamobi/ngoc-rong')
        }
      } else {
        switch (layout) {
          case "clientLayout":
            redirect('/404')
            break;
        }
      }
    }


    if (code === 409) {
      $swal.fire({
        title: "Tài khoản này đã bán",
        html: "Hãy chọn mua Tài khoản khác <br/> Cảm ơn bạn nhiều nhé ❤️",
        icon: "error",
        customClass: customClassSwal
      }).then(() => {
        window.history.back();
      });
    }

    if (code === 419) {
      switch (layout) {
        case "clientLayout":
          store.dispatch("home/users/logout");
          redirect('/')
          break;
      }
    }

    if (code === 401) {
      switch (layout) {
        case "clientLayout":
          store.dispatch("home/users/logout");
          const dataCode = error?.response?.data?.code;
          if (['TOKEN_EXPIRED', 'TOKEN_INVALID', 'UNAUTHENTICATED'].includes(dataCode)) {
            redirect('/')
          }
          $swal.fire({
            title: "",
            html: error.response.data.message,
            icon: "error",
            customClass: customClassSwal
          });
          break;
      }
    }

    if (code === 402) {
      switch (layout) {
        case "clientLayout":
          $swal
            .fire({
              title: "Thất bại",
              text: error.response.data.message,
              confirmButtonColor: "#F64E60",
              cancelButtonColor: "#a4a4a4",
              showCancelButton: true,
              cancelButtonText: "Bỏ qua",
              confirmButtonText: "Nạp tiền",
              customClass: customClassSwal
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                redirect('/account/wallet/deposit/bank')
              }
            });
          break;
      }
    }

    if (code === 422) {
      const errors = error.response.data.errors;
      if (errors) {
        store.dispatch("global/setValidationErrors", errors ? errors || {} : {});

      } else {
        store.dispatch("global/setValidationErrors", {});
      }
    }

  })
  inject("api", api);
}
