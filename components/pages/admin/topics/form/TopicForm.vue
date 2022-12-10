<template>
  <client-only>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Tiêu đề" v-model="topic.title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Đường link" v-model="topic.link"></v-text-field>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  name: "FormTopic",
  created() {},
  methods: {},
};
</script>
