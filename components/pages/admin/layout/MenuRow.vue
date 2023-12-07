<template>
  <v-sheet
    class="mx-auto"
    :clipped-left="clipped"
    :clipped-right="clipped"
    fixed
  >
    <v-slide-group multiple show-arrows>
      <v-slide-item>
        <v-btn icon to="/admin">
          <v-icon>mdi-home-circle</v-icon>
        </v-btn>
      </v-slide-item>
      <v-slide-item
        v-for="(item, i) in items"
        :key="i"
        v-slot="{ active, toggle }"
        :class="[$route.path.includes(`${item.to}`) ? 'v-btn--active' : '']"
      >
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class=" white--text"
          depressed
          rounded
          @click="toggle"
          :to="item.to"
        >
          {{ item.title }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "MenuRow",
  components: {},
  data() {
    return {
      clipped: true,
      items: [
        {
          icon: "mdi-file-document-edit",
          title: "Dev",
          to: "/admin/deverlopers",
        },
        {
          icon: "mdi-file-document-edit",
          title: "Finances",
          to: "/admin/finances",
        },
        {
          icon: "mdi-playlist-edit",
          title: "Menus",
          to: "/admin/menus",
        },
        {
          icon: "mdi-file-document-edit",
          title: "Topics",
          to: "/admin/topics",
        },
        {
          icon: "mdi-image",
          title: "Medias",
          to: "/admin/medias",
        },
        {
          icon: "mdi-image",
          title: "Sale Off",
          to: "/admin/sale-offs",
        },
        {
          icon: "mdi-image",
          title: "Events",
          to: "/admin/events/daily",
        },
        {
          icon: "mdi-image",
          title: "Users",
          to: "/admin/users",
        },
        {
          icon: "mdi-image",
          title: "History",
          to: "/admin/history/game-account-sold",
        },
        {
          icon: "mdi-image",
          title: "Banks",
          to: "/admin/history/bank-deposits",
        },
        {
          icon: "mdi-image",
          title: "Ninja",
          to: "/admin/game/ninjas",
        },
        {
          icon: "mdi-image",
          title: "Avatar",
          to: "/admin/game/avatars",
        },
      ],
    };
  },
};
</script>