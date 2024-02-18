<template>
  <div class="signin mt-4" @click="loginFb()">
    <v-btn class="btn btn-lg btn-primary text-white btn-login-fb">
      <i class="fab fa-facebook-f"></i> Đăng nhập bằng Facebook
    </v-btn>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  computed: {
    ...mapState(["token", "user"]),
  },
  methods: {
    ...mapActions(["loginFb"]),
  },
};
</script>
<style lang="scss" scoped>
</style>