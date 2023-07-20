<template>
  <client-only>
    <v-row class="bg-editor">
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Tiêu đề" v-model="title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Đường link" v-model="link"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <b-form-group>
          <ContentEditer label="Chi tiết" v-model="content"></ContentEditer>
        </b-form-group>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

export default {
  components: {
    FormValidator,
    ContentEditer,
  },
  props: {
    // topic: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields("admin/topics", {
      topic: "topic",
      title: "topic.title",
      link: "topic.link",
      content: "topic.content",
    }),
  },
  name: "FormTopic",
  created() {},
  methods: {},
};
</script>
