<template>
  <client-only>
    <h1>Making CV</h1>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";


export default {
  layout: "adminDev",
  components: {

  },
  
  name: "MakingCv",
  data() {
    return {};
  },
  async mounted() {
  },
  computed: {
    ...mapFields("admin/game/ninjas", [
      "ninjas",

    ]),
  },
  methods: {
    ...mapActions("admin/game/ninjas", ["fetchAccountNinjas"]),
  },
};
</script>
<style >

</style>