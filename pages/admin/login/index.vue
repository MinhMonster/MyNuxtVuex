<template>
  <v-row justify="center" align="center" class="form-login-admin">
    <v-col cols="12" sm="8" md="8">
      <div class="login-border-box">
        <div class="border-animate top"></div>
        <div class="border-animate right"></div>
        <div class="border-animate bottom"></div>
        <div class="border-animate left"></div>

        <v-card class="box-admin-login">
          <v-card-title class="text-white">Login Admin</v-card-title>
          <form @submit.prevent="submit">
            <LoginForm :user="user" />
            <div class="text-right mt-4">
              <!-- <v-btn type="button" to="/">Trang chủ</v-btn> -->
              <v-btn type="submit" color="primary">Login</v-btn>
            </div>
          </form>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>




<script>
import API from "@/apis/modules/admin/auths";
import LoginForm from "@/components/pages/admin/login/form/LoginForm.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("admin/auth");

export default {
  middleware: ["un_authentication"],
  components: { LoginForm },
  layout: "LoginAdmin",
  name: "LoginAdmin",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ...mapActions(["authRequest", "login"]),
    async submit() {
      this.login(this.user);
      this.$router.push("/admin");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-login-admin {
  max-width: calc(100% - 40px);
  margin: 0 auto;

  .v-card__title {
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
  }

  form {
    background: #1e1e1e !important;
    padding: 20px;
    border-radius: 8px;
  }
}
.login-border-box {
  position: relative;
  padding: 6px;
  border-radius: 4px;
  overflow: hidden;

  .box-admin-login {
    position: relative;
    z-index: 2;
    padding: 40px;
    background: #1e1e1e;
    border-radius: 0px;
  }

  .border-animate {
    position: absolute;
    z-index: 1;
    background: transparent;
  }

  // TOP
  .top {
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(
      to right,
      red 0%,
      transparent 25%,
      green 50%,
      transparent 75%,
      blue 100%
    );
    background-size: 200% auto;
    animation: animate-top 4s linear infinite;
  }

  // RIGHT
  .right {
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      green 0%,
      transparent 25%,
      blue 50%,
      transparent 75%,
      red 100%
    );
    background-size: auto 200%;
    animation: animate-right 4s linear infinite;
  }

  // BOTTOM
  .bottom {
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(
      to left,
      blue 0%,
      transparent 25%,
      green 50%,
      transparent 75%,
      red 100%
    );
    background-size: 200% auto;
    animation: animate-bottom 4s linear infinite;
  }

  // LEFT
  .left {
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(
      to top,
      blue 0%,
      transparent 25%,
      red 50%,
      transparent 75%,
      green 100%
    );
    background-size: auto 200%;
    animation: animate-left 4s linear infinite;
  }
}

// Animations
@keyframes animate-top {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes animate-right {
  0% {
    background-position: 0 200%;
  }
  100% {
    background-position: 0 -200%;
  }
}

@keyframes animate-bottom {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes animate-left {
  0% {
    background-position: 0 -200%;
  }
  100% {
    background-position: 0 200%;
  }
}
</style>
