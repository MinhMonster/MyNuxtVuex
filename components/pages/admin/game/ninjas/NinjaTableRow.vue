<template>
  <tr>
    <td>{{ ninja.ID }}</td>
    <td class="text-left">{{ ninja.taikhoan }}</td>
    <td class="text-center">
      {{ format_number(ninja.giatien) }}
    </td>
    <td class="text-center">
      {{ classNinja(ninja.class) }}
    </td>
    <td class="text-center">
      {{ ninja.level }}
    </td>
    <td class="text-center">
      {{ serverNinja(ninja.server) }}
    </td>
    <td class="text-center">
      {{ typeNinja(ninja.loainick) }}
    </td>
    <td class="text-center">
      <v-btn light icon :to="`/admin/game/ninjas/${ninja.ID}`">
        <v-icon>mdi-pencil-box-multiple-outline</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  props: {
    ninja: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // computedThumbnail() {
    //   return {
    //     backgroundImage: "url('" + this.image.url + "')",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center",
    //     backgroundSize: "contain",
    //     width: "50px",
    //     height: "50px",
    //     minWidth: "50px",
    //   };
    // },
  },
  methods: {},
};
</script>
<style scoped>
.td-misc {
  position: relative;
  z-index: 1;
}
</style>