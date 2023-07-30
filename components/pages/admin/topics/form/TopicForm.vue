<template>
  <client-only>
    <v-row v-if="topic" class="bg-editor">
      <v-col cols="12" sm="12" md="6">
        <v-card-title>{{ label }}</v-card-title>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="text-left">
        <b-form-checkbox
          v-model="status"
          name="check-button"
          value="yes"
          unchecked-value="no"
          switch
          dark
          >Trạng thái
        </b-form-checkbox>
      </v-col>
      <v-col cols="12" sm="12" md="12" class="text-left">
        <UploadImage
          @changeImage="changeImage"
          :images-props="image ? [image] : []"
        ></UploadImage>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Tiêu đề" v-model="title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Đường link" v-model="link"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          v-model="description"
          label="Mô tả"
          auto-grow
          variant="outlined"
          rows="3"
          row-height="25"
          shaped
        ></v-textarea>
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
import UploadImage from "@/components/pages/admin/topics/form/UploadImage";
export default {
  components: {
    FormValidator,
    ContentEditer,
    UploadImage,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields("admin/topics", {
      topic: "topic",
      status: "topic.status",
      title: "topic.title",
      link: "topic.link",
      content: "topic.content",
      image: "topic.image",
      description: "topic.description",
    }),
  },
  name: "FormTopic",
  async mounted() {},
  methods: {
    changeImage(images) {
      this.image = images[0];
    },
  },
};
</script>
