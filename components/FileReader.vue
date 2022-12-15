<template>
  <div class="form-group">
      <input type="file" @change="loadTextFromFile" class="btn btn-success">
  </div>
</template>

<script>
export default {
methods: {
  loadTextFromFile(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = e => this.$emit("load", e.target.result);
    reader.readAsText(file);
  }
}
};
</script>
