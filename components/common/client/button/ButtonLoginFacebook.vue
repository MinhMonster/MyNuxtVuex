<template>
  <div class="signin mt-4" @click="loginFb()">
    <v-btn class="btn btn-lg btn-primary text-white btn-login-fb">
      <i class="fab fa-facebook-f"></i> Đăng nhập bằng Facebook
    </v-btn>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("home/users");

export default {
  methods: {
    ...mapActions(["loginFb"]),
  },
};
</script>
