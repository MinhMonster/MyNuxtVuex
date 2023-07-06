<template>
  <div class="signin mt-4" @click="loginFb()">
    <b-button class="btn btn-lg btn-primary text-white btn-login-fb"
      ><i class="fab fa-facebook-f"></i> Đăng nhập bằng Facebook</b-button
    >
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");

export default {
  computed: {
    ...mapState(["token", "user"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["loginFb"]),
  },
};
</script>
<style lang="scss" scoped>
</style>