<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center">
        
        <div id="body-admin">
          <v-card-title >Đăng nhập Hệ thống</v-card-title>
          <form @submit.prevent="login()">
            <LoginForm :user="user"></LoginForm>
            <div class="text-right">
              <v-btn type="submit" color="" to="/"> Trang chủ</v-btn>
              <v-btn type="submit" color="primary"> Đăng nhập </v-btn>
            </div>
          </form>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import API from "@/apis/modules/admin/auths";
import LoginForm from "@/components/pages/admin/login/form/LoginForm.vue";
// import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("admin/auth");

export default {
  components: { LoginForm },
  layout: "LoginAdmin",
  head() {
    return {
      title: "New Topic",
      meta: [
        {
          hid: "New Topic",
          name: "New Topic",
          content: "New Topic",
        },
      ],
    };
  },
  name: "Login Admin",
  data() {
    return {
      input: {},
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  created() {
  },
  methods: {
    ...mapActions(["authRequest"]),
    async login() {
      const formData = new FormData();
      formData.append("username", this.user.username);
      formData.append("password", this.user.password);
      const res = await API.login(formData);
      if (res.data.status === "success") {
        this.$toasted.success(res.data.message);
        this.$router.push('/admin')
      } else {
        this.$toasted.error(res.data.message);
      }
      this.authRequest(res.data);
    },
  },
};
</script>
