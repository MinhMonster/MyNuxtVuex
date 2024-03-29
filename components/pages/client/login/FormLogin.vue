<template>
  <form class="form-login">
    <!-- <div id="content" class="title text-main text-center bold">Đăng Nhập</div> -->
    <div class="field">
      <form-validator name="username">
        <input
          v-model="username"
          type="text"
          class="v-input"
          placeholder="Tài Khoản"
          @keyup.enter="loginUser()"
        />
      </form-validator>
    </div>
    <div id="sign-in-button"></div>
    <div class="field">
      <form-validator name="password">
        <input
          v-model="password"
          type="password"
          class="v-input"
          placeholder="Mật khẩu"
          @keyup.enter="loginUser()"
        />
      </form-validator>
    </div>
    <div class="content">
      <div class="checkbox">
        <input type="checkbox" id="remember" checked />
        <label for="remember">Lưu đăng nhập</label>
      </div>
      <span @click="showModalLoginRegister('register')">Đăng Ký</span>
    </div>
    <input type="hidden" id="confirm" name="confirm" />
    <div class="field submit">
      <v-btn size="sm" class="btn-login" @click="loginUser()">
        <Loading v-if="isLoading" button></Loading>
        <span v-else> Đăng nhập </span>
      </v-btn>
    </div>
    <!-- <div class="signin">----------- Hoặc -----------</div>
    <ButtonLoginFacebook /> -->
  </form>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";
import FormValidator from "@/components/global/form/FormValidator";
// import ButtonLoginFacebook from "@/components/common/client/button/ButtonLoginFacebook";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  data() {
    return {
      isLoading: false,
      username: "",
      password: "",
    };
  },
  components: {
    Loading,
    FormValidator,
    // ButtonLoginFacebook,
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ...mapActions(["login", "logout", "fetchUser", "loginFb"]),
    async loginUser() {
      this.isLoading = true;
      const res = await this.login({
        input: {
          username: this.username,
          password: this.password,
        },
      });
      if (this.token) {
        this.fetchUser();
        this.$emit("close");
        this.showSwal({
          icon: "success",
          title: "Đăng nhập Thành công",
          html: "Cảm ơn bạn đã sử dụng dịch vụ!",
        });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-login {
  height: 100%;
  max-height: calc(100vh - 140px);
  text-align: center;
}

.account-box {
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  padding: 0px;
}

// .wrapper {
//   border-radius: 15px;
//   box-shadow: 0px 15px 20px rgb(0 0 0 / 10%);
//   user-select: none;
// .title {
//   font-size: 30px;
//   font-weight: 600;
//   text-align: center;
//   line-height: 40px;
//   color: #ffcf9c;
//   user-select: none;
//   border-radius: 15px 15px 0 0;
//   background: linear-gradient(-135deg, #e28637, #561d00);
// }
form {
  padding: 10px;
  background: #ffefa3;
  border: none;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  .field {
    height: 40px;
    width: 100%;
    margin-top: 20px;
    position: relative;

    &.submit {
      margin-top: 0px;
    }

    input:valid ~ label {
      top: 0%;
      font-size: 16px;
      color: #4158d0;
      background: none;
      transform: translateY(-50%);
    }

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
        height: 40px;
        border: 1px solid #e28637;
        color: #663019 !important;
      }
    }

    label {
      position: absolute;
      top: 50%;
      left: 20px;
      color: #999999;
      font-weight: 400;
      font-size: 17px;
      pointer-events: none;
      transform: translateY(-50%);
      transition: all 0.3s ease;
    }

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

@media (min-width: 450px) {
  .account-box {
    margin: 7% auto;
  }
}

@media (max-width: 380px) {
  .account-box {
    padding: 0px;
  }
}

#home-page {
  max-width: 400px;
}
</style>
