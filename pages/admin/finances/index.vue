<template>
  <client-only>
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>Finances</v-card-title>
        </v-col>
        <v-spacer />
        <v-col
          ><v-btn class="right mgr-15px" color="primary" to="/admin/finances/new"
            >Thêm mới
          </v-btn></v-col
        >
      </v-row>

      <div id="body-admin">
        <div v-if="!finances" class="">
          <div class=""></div>
        </div>
        <v-simple-table class="table" dark>
          <template v-slot:default>
            <thead>
              <tr class="w-100">
                <th class="w-60 text-left">Year</th>
                <th class="w-20 text-left">Position</th>
                <th class="w-10 text-center">Thao tác</th>
              </tr>
            </thead>
            <draggable
            v-model="finances"
            ghost-class="ghost"

            @change="changeByDrag"
            handle=".handle"
            tag="tbody"
          >
              <tr v-for="(item, index) in finances" :key="index" class="text-middle">
                <td>
                  <nuxt-link :to="`/admin/finances/${item.year}`">{{ item.title }}</nuxt-link>
                  <!-- <v-btn light icon :to="`/admin/finances/${item.ID}/show`"> -->
                    <!-- {{ item.title }} -->
                  <!-- </v-btn> -->
                </td>
                <td class="text-center">
                  <v-btn light icon class="">
                   <v-icon 
                  >mdi-chevron-double-up</v-icon>
                  </v-btn>
                  <v-btn light icon class="handle">
                    |<v-icon 
                  >mdi-menu</v-icon>|
                  </v-btn>
                  <v-btn light icon class="">
                   <v-icon 
                  >mdi-chevron-double-down</v-icon>
                  </v-btn>
                 </td>

                <td class="text-center">
                  <v-btn light icon :to="`/admin/finances/${item.ID}/edit`">
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
import { mapActions, mapState } from 'vuex'
import draggable from "vuedraggable";
// import { cloneDeep } from "lodash";


export default {
  layout: "adminDev",
  components: {
    draggable
  },
  
  data() {
    return {
      // list_finances:[],
    };
  },
  head() {
    return {
      title: "Admin: finances",
      meta: [
        {
          hid: "Admin: finances",
          name: "Admin: finances",
          content: "Admin: finances",
        },
      ],
    };
  },
  name: "finances",
  async mounted() {
    await this.get_finances();
  },
  computed: {
    ...mapFields('admin/finances',["finances"]),
  },
  methods: {
    ...mapActions('admin/finances',["get_finances", "change_positions"]),
    changeByDrag(event) {
      this.updatePosition(event.moved.element.ID, event.moved.newIndex);
    },
    updatePosition(id, newIndex) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("newIndex", newIndex);
      this.change_positions(formData)
    }    
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
.list-group-item, .handle {
    cursor: move;
}
</style>
