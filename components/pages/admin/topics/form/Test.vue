<template>
  <div>
    <h1>Ok Test</h1>
  </div>
  <!-- <client-only>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          label="Tiêu đề"
          v-model="topic.title"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          label="Đường link"
          v-model="topic.link"
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <VueEditor
          id="editor"
          useCustomImageHandler
          v-model="topic.content"
          @image-added="handleImageAdded"
        />
      </v-col>
    </v-row> -->
  <!-- </client-only> -->
</template>

<script>
// import api_file from "@/apis/modules/admin/files";

export default {
  // components: { TopicForm },
  // layout: "admin",
  // props: ["topic{}"],
  data() {
    return {
      // input: {},
      // title: "Admin: Menus",
      // topic: {
      //   title: "",
      //   link: "",
      //   content: "",
      // },
    };
  },
  // head() {
  //   return {
  //     title: this.title,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: "Description de la page d'accueil",
  //       },
  //     ],
  //   };
  // },
  name: "Test",
  created() {},
  methods: {
    // async create() {
    //   // const input = {
    //   //   title: this.topic.title,
    //   //   link: this.topic.link,
    //   //   content: this.topic.content,
    //   // };
    //   const formData = new FormData();
    //   formData.append("title", this.topic.title);
    //   formData.append("link", this.topic.link);
    //   formData.append("content", this.topic.content);
    //   // const input = {
    //   //   data: formData,
    //   // };
    //   const res = await API.create(formData);
    //   this.$swal.fire(res.data.message, "", res.data.status);
    //   // this.$emit("reset");
    // },
    // async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   const input = {
    //     file: formData,
    //   };
    //   const res = await api_file.upload(input);
    //   const url = res.data.file;
    //   Editor.insertEmbed(cursorLocation, "image", url);
    //   resetUploader();
    // },
  },
};
</script>
