<template>
  <client-only>
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>Bài viết</v-card-title>
        </v-col>
        <v-spacer />
        <v-col
          ><v-btn class="right mgr-15px" color="primary" to="/admin/deverlopers/new"
            >Viết bài
          </v-btn></v-col
        >
      </v-row>

      <div id="body-admin">
        <div v-if="!deverlopers" class="">
          <div class=""></div>
        </div>
        <h3>Draggable {{ this.draggingInfo }}</h3>

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
            v-model="list_deverlopers"
            ghost-class="ghost"

            @change="changeByDrag"
            handle=".handle"
            tag="tbody"
          >
              <tr v-for="(item, index) in list_deverlopers" :key="index" class="text-middle">
                <td class="text-center">{{ index + 1 }}</td>
                <td>
                  <nuxt-link :to="`/admin/deverlopers/${item.ID}/show`">{{ item.title }}</nuxt-link>
                  <!-- <v-btn light icon :to="`/admin/deverlopers/${item.ID}/show`"> -->
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
import { mapActions, mapState } from 'vuex'
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";


export default {
  layout: "adminDev",
  components: {
    draggable
  },
  
  data() {
    return {
      list_deverlopers:[],
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
  async fetch() {
    await this.get_deverlopers()
  },
  created(){
this.list_deverlopers = cloneDeep(this.deverlopers)
  },
  computed: {
    ...mapFields('admin/deverlopers',["deverlopers"]),
    //  list_deverlopers(){
    //   // tests.value = cloneDeep(deverlopers);

    //   return cloneDeep(this.deverlopers)
    //  },
     draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    

  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverlopers", "change_positions"]),
    // add: function() {
    //   this.list_deverlopers.push({ name: "Juan " + index, index: index++ });
    // },
    // replace: function() {
    //   this.list_deverlopers = [{ name: "Edgard", index: index++ }];
    // },
    // checkMove: function(e) {
    //   // window.console.log("Future index: " + e.draggedContext.futureIndex);
    //   console.log(e)
    // },
    changeByDrag(event) {
      console.log(event);
      this.updatePosition(event.moved.element.ID, event.moved.newIndex);
    },
    updatePosition(id, newIndex) {
      // console.log(id,newIndex);
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
}</style>
