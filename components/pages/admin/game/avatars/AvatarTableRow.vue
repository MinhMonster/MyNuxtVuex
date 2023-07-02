<template>
  <tr>
    <td>{{ account.ID }}</td>
    <td class="text-left">{{ account.username }}</td>
    <td class="text-center">
      {{ format_number(account.giatien) }}
    </td>
    <td class="text-center">
      {{ account.dat }}
    </td>
    <td class="text-center">
      {{ account.ga }}
    </td>
    <td class="text-center">
      {{ account.ca }}
    </td>
    <td class="text-center">
      <v-btn light icon :to="`/admin/game/avatars/${account.ID}`">
        <v-icon>mdi-pencil-box-multiple-outline</v-icon>
      </v-btn>
      <v-btn light color="blue" icon :to="`/teamobi/avatar/${account.ID}`">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  props: {
    account: {
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