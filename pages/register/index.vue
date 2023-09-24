<template>
  <client-only>
    <HomePage
      :title="title"
      full-screen
      goBack
      goHome
      :loading="!ready"
      reload
      @reload="reload()"
    >
      <template v-if="!token" #body>
        <form class="form">
          <div id="content"></div>
          <b-row>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="name">
                  <input
                    v-model="user.name"
                    id="name"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                  />
                  <label for="name" class="form-label"
                    >Tên hiển thị
                    <small
                      >(<span style="color: red">*</span> VD: Nguyễn Văn
                      An)</small
                    ></label
                  >
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="username">
                  <input
                    v-model="user.username"
                    id="username"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                  />
                  <label for="username" class="form-label"
                    >Tài Khoản
                    <small
                      >(<span style="color: red">*</span> VD:
                      NguyenVanAn)</small
                    ></label
                  >
                </form-validator>
              </div></b-col
            >
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="password">
                  <input
                    v-model="user.password"
                    type="password"
                    placeholder=" "
                    class="v-input form-input"
                  />
                  <label class="form-label"
                    >Mật Khẩu
                    <small
                      >(<span style="color: red">*</span> ********)</small
                    ></label
                  >
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="re_password">
                  <input
                    v-model="user.rePassword"
                    type="password"
                    placeholder=" "
                    class="v-input form-input"
                  />
                  <label class="form-label"
                    >Nhập lại Mật khẩu
                    <small>(<span style="color: red">*</span>)</small></label
                  >
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="phone">
                  <input
                    v-model="user.phone"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                  />
                  <label class="form-label"
                    >Số điện thoại
                    <small>(<span style="color: red">*</span> )</small></label
                  >
                </form-validator>
              </div>
            </b-col>
            <b-col cols="12" sm="6" class="middle">
              <div class="field">
                <form-validator name="email">
                  <input
                    v-model="user.email"
                    type="text"
                    placeholder=" "
                    class="v-input form-input"
                  />
                  <label class="form-label"
                    >Email
                    <small>(<span style="color: red">*</span> )</small></label
                  >
                </form-validator>
              </div>
            </b-col>
          </b-row>

          <!-- <div id="sign-in-button"></div> -->

          <div class="content">
            <div class="checkbox">
              <input type="checkbox" id="remember" checked />
              <label for="remember">Lưu đăng nhập</label>
            </div>
            <nuxt-link to="/login">Đăng Nhập</nuxt-link>
          </div>
          <input type="hidden" id="confirm" name="confirm" />
          <div class="field submit">
            <b-button size="sm" class="btn-login" @click="registerUser()">
              <Loading v-if="isLoading" button></Loading>
              <span v-else> Đăng Ký </span>
            </b-button>
          </div>
          <div class="signin">----------- Hoặc -----------</div>
          <ButtonLoginFacebook />
        </form>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import HomePage from "@/components/pages/home/HomePage";

import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import ButtonLoginFacebook from "@/components/common/client/button/ButtonLoginFacebook";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  layout: "clientLayout",
  data() {
    return {
      isLoading: false,
      user: {
        name: "",
        username: "",
        password: "",
        rePassword: "",
        phone: "",
        email: "",
      },
      title: "Đăng Ký Thành Viên",
    };
  },
  components: { HomePage, Loading, FormValidator, ButtonLoginFacebook },
  computed: {
    ...mapState(["token"]),
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  mounted() {
    if (this.token) {
      this.$router.push("/account/profile");
    } else {
      this.reload();
    }
  },
  methods: {
    ...mapActions(["register", "loginFb"]),
    async registerUser() {
      this.isLoading = true;
      const res = await this.register({
        input: this.user,
      });
      if (this.token) {
        this.$router.push("/account/profile");
      }
      this.isLoading = false;
    },

    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
::v-depp {
  .has-error .validation {
    margin-top: 15px !important;
  }
}
.account-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px;
}
// .wrapper {
//   border-radius: 15px;
//   box-shadow: 0px 15px 20px rgb(0 0 0 / 10%);
//   user-select: none;
//   .title {
//     font-size: 30px;
//     font-weight: 600;
//     text-align: center;
//     line-height: 40px;
//     color: #ffcf9c;
//     user-select: none;
//     border-radius: 15px 15px 0 0;
//     background: linear-gradient(-135deg, #e28637, #561d00);
//   }
form {
  // padding: 10px 30px 30px;
  background: #ffefa3;
  // border: 1px solid #663019;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  .field {
    height: 40px;
    width: 100%;
    margin-top: 15px;
    position: relative;
    &.submit {
      margin-top: 0px;
    }
    // input:valid ~ label {
    //   top: 0%;
    //   font-size: 16px;
    //   color: #4158d0;
    //   background: none;
    //   transform: translateY(-50%);
    // }
    input {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 20px;
      border: 1px solid lightgrey;
      border-radius: 4px;
      transition: all 0.3s ease;
      background: #fff;
      &.v-input {
        z-index: 999999999;
        height: 35px;
        border: 1px solid #e28637;
        color: #663019 !important;
      }
    }
    // label {
    //   position: absolute;
    //   top: 50%;
    //   left: 20px;
    //   color: #999999;
    //   font-weight: 400;
    //   font-size: 17px;
    //   pointer-events: none;
    //   transform: translateY(-50%);
    //   transition: all 0.3s ease;
    // }
    input[type="submit"],
    .btn-login {
      width: 100%;
      border-radius: 20px;
      color: #ffcf9c;
      border: none;
      padding-left: 0;
      // font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      background: linear-gradient(-135deg, #e28637, #561d00);
      transition: all 0.3s ease;
    }
  }
  .signin {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    color: #663019;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 16px;
    align-items: center;
    justify-content: space-around;
    input {
      width: 15px;
      height: 15px;
      background: red;
    }
    span {
      white-space: nowrap;
      color: #4158d0 !important;
      cursor: pointer;
    }
  }
}
// }
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  float: left;
  // width: 100% !important;
  user-select: none;
  white-space: nowrap;
  padding-top: 10px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
    margin: 0;
  }
  label {
    display: inline-block;
    color: #e28637;
    font-size: 16px;
    max-width: 100%;
    position: relative;
    padding-left: 35px;
    height: 2em;
    min-height: 20px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
  }

  label:before,
  label:after {
    top: 2px;
    width: 17px !important;
    height: 17px !important;
  }
}
.checkbox input[type="checkbox"] + label::before {
  content: " ";
  position: absolute;
  border: 1px solid #e28637;
  top: 2px;
  left: 0;
  width: 17px !important;
  height: 17px !important;
  border-radius: 2px;
}
.checkbox input[type="checkbox"]:checked + label::before {
  content: " ";
  background: linear-gradient(#e28637, #663019);
}
input[type="checkbox"]:checked + label::after {
  content: "\2714";
  top: -0.5px;
  left: 0;
  position: absolute;
  z-index: 2;
  transition: 0.25s all ease;

  width: 17px !important;
  height: 17px !important;

  line-height: 1.5;
  text-align: center;
  color: #fff;
}

form {
  padding: 30px 10px 10px 10px;
  // border: 1px solid #333;
  // background: #ffffff;
}

// .form-field {
//  margin: 20px;
// }

.form-input {
  border: 1px solid #333;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  transform: 0.25s ease;
}

.form-input:focus {
  border-color: blue;
}

// .form-field {
//  position: relative;
// }

.form-label {
  color: #a4a4a4;
  position: absolute;
  top: 20px;
  //  top: 35%;
  font-size: 14px;
  transform: translateY(-50%);
  left: 21px;
  user-select: none;
  pointer-events: none;
  transition: 0.25s ease;
  z-index: 1;
  // background: #000;
}

.form-input:not(:placeholder-shown) + .form-label,
.form-input:focus + .form-label {
  top: -9px;
  left: 11px;
  padding: 0 10px;
  display: inline-block;
  background: none !important;
  color: #663019;
  z-index: 9999;
}

@media (min-width: 450px) {
  .account-box {
    margin: 7% auto;
  }
}
@media (max-width: 599px) {
  .account-box {
    max-width: 390px;
    .wrapper form .field {
      height: auto;
      margin-top: 0px;
    }
  }
}
@media (max-width: 380px) {
  .account-box {
    padding: 0px;
  }
}
#home-page {
  max-width: 800px;
}
</style>