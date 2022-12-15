<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <div class="form-group">
        <label>Content File</label>
        <textarea
          cols="80"
          rows="30"
          v-html="text"
          class="form-control bg-default"
        ></textarea>
        <p
          
          class="form-control bg-default"
        >{{text}}</p>
      </div>

      <app-reader @load="text = $event"></app-reader>
    </div>
    <div class="col-md-2"></div>
  </div>
</template>
   
  <script>
import FileReader from "../components/FileReader.vue";

export default {
  name: "app",
  data: () => ({ text: "" }),
  components: {
    appReader: FileReader,
  },
};
</script>
  