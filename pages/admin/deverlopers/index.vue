<template>
  <client-only>
    <div class="">
      <div class="d-flex" align="center">
        <div>
          <v-card-title>Deverlopers</v-card-title>
        </div>
        <v-spacer />
        <div class="mgr-15px right middle">
          <v-btn icon class="primary right" to="/admin/deverlopers/new">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>

      <div id="body-admin">
        <div v-if="!deverlopers" class="">
          <div class=""></div>
        </div>
        <v-simple-table class="table" dark>
          <template v-slot:default>
            <thead>
              <tr class="w-100">
                <th class="w-10 text-center">STT</th>
                <th class="w-60 text-left">Tên hiển thị</th>
                <th class="w-20 text-left">Đường dẫn</th>
                <th class="w-10 text-center">Thao tác</th>
              </tr>
            </thead>
            <draggable
              v-model="deverlopers"
              ghost-class="ghost"
              @change="changeByDrag"
              handle=".handle"
              tag="tbody"
            >
              <tr
                v-for="(item, index) in deverlopers"
                :key="index"
                class="text-middle"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td>
                  <nuxt-link :to="`/admin/deverlopers/${item.ID}/show`">{{
                    item.title
                  }}</nuxt-link>
                  <!-- <v-btn light icon :to="`/admin/deverlopers/${item.ID}/show`"> -->
                  <!-- {{ item.title }} -->
                  <!-- </v-btn> -->
                </td>
                <td class="text-center">
                  <v-btn light icon class="">
                    <v-icon>mdi-chevron-double-up</v-icon>
                  </v-btn>
                  <v-btn light icon class="handle">
                    |<v-icon>mdi-menu</v-icon>|
                  </v-btn>
                  <v-btn light icon class="">
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </td>

                <td class="text-center">
                  <v-btn light icon :to="`/admin/deverlopers/${item.ID}/edit`">
                    <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </draggable>
          </template>
        </v-simple-table>
      </div>
      <!-- <div v-if="is_edit" class="popup">
      <div class="body-popup abs">
        <b @click="closed" class="cancel abs">x</b>
        <edit :IDProps="IDEdit" @reset="getAll"></edit>
      </div>
      <div class="modal-backdrop in"></div>
    </div>
    <div v-if="is_create" class="popup">
      <div class="body-popup abs">
        <b @click="closed" class="cancel abs">x</b>
        <create @reset="getAll"></create>
      </div>
      <div class="modal-backdrop in"></div>
    </div> -->
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";
// import { cloneDeep } from "lodash";

export default {
  layout: "adminDev",
  components: {
    draggable,
  },

  data() {
    return {
      // list_deverlopers:[],
    };
  },
  head() {
    return {
      title: "Admin: Deverlopers",
      meta: [
        {
          hid: "Admin: Deverlopers",
          name: "Admin: Deverlopers",
          content: "Admin: Deverlopers",
        },
      ],
    };
  },
  name: "Deverlopers",
  async mounted() {
    await this.get_deverlopers();
  },
  computed: {
    ...mapFields("admin/deverlopers", ["deverlopers"]),
  },
  methods: {
    ...mapActions("admin/deverlopers", ["get_deverlopers", "change_positions"]),
    changeByDrag(event) {
      console.      this.updatePosition(event.moved.element.ID, event.moved.newIndex);
    },
    updatePosition(id, newIndex) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("newIndex", newIndex);
      this.change_positions(formData);
    },
  },
};
</script>
<style>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item,
.handle {
  cursor: move;
}
</style>
