<template>
  <client-only>
    <div class="btn-groups">
      <v-btn
        v-for="(type, index) in typeOptions"
        :key="index"
        @click="addAction(type)"
        color="primary"
      >
        Add {{ type.name }}
      </v-btn>
    </div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogm1: "",
      dialog: false,
      typeCode: {},
      typeOptions: [
        {
          name: "Vue",
          type: "vue",
          mode: "text/x-vue",
        },
        {
          name: "Ruby",
          type: "ruby",
          mode: "text/x-ruby",
        },
        {
          name: "PHP",
          type: "php",
          mode: "application/x-httpd-php",
        },
        {
          name: "Javascipt",
          type: "javascipt",
          mode: "text/x-java",
        },
        {
          name: "Css",
          type: "css",
          mode: "text/css",
        },
        {
          name: "React",
          type: "react",
          mode: "text/jsx",
        },
      ],
    };
  },
  methods: {
    ...mapActions("admin/deverlopers", ["addAction"]),
  },
};
</script>
