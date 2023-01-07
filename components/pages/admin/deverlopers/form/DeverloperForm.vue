<template>
  <client-only>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Tiêu đề" v-model="deverloper.title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Đường link" v-model="deverloper.link"></v-text-field>
      </v-col>  
      <v-col cols="12" sm="12" md="12">
        <ContentEditer label="Đường link" v-model="deverloper.info"></ContentEditer>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
export default {
  components:{
    ContentEditer
  },
  props: {
    deverloper: {
      type: Object,
      required: true,
    },
  },
  name: "FormDeverloper",
};
</script>
