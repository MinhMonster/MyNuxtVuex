<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-text-field
        label="Tài Khoản"
        v-model="user.username"
        :rules="[rules.required]"
        outlined
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-text-field
        label="Mật Khẩu"
        v-model="user.password"
        type="password"
        :rules="[rules.required]"
        outlined
        clearable
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Không được để trống.",
      },
    };
  },
  name: "FormLogin",
};
</script>
