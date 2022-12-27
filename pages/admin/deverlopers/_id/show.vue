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
        <div v-if="!deverloper" class="">
          <div class=""></div>
        </div>
        <v-simple-table class="table" dark>
          <template v-slot:default>
            <thead>
              <tr class="w-100">
                <th class="w-10 text-center">STT</th>
                <th class="w-30 text-left">Tên hiển thị</th>
                <th class="w-50 text-left">Danh sách</th>
                <th class="w-10 text-center">Thao tác</th>
              </tr>
            </thead>
            <draggable
            v-model="deverloper"
            ghost-class="ghost"
            @remove="changeByDrag"
            @change="changeByDrag"
            handle=".handle"
            tag="tbody"
          >
              <tr v-for="(item, index) in deverloper" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td class="text-left ">
                 <ul>
                    <li v-for="info in item.items" :key="info.ID" >
                     
                      <div class="w-100 flex-row-space-between" >
                        <nuxt-link :to="`/admin/deverlopers/${info.ID}/view` ">{{info.title}}</nuxt-link>
                        <div>
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
                        </div>
                      </div>
                     

                        
                     
                    <hr/>
                    
                  </li>
                </ul>
                  
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
  layout: "adminDeverlopers",
  components: {
    draggable
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
  data(){
    return{
      list_deverloper:[]
    }
  },
  created(){
    // this.list_deverloper = cloneDeep(this.deverloper)
  },
  async fetch() { 
    await this.get_deverloper(this.routeId)
  // // },
  // // async fetch() { 
    await this.get_deverlopers()
  //   await this.get_deverloper_view(this.routeId)

   },
  computed: {
    ...mapFields('admin/deverlopers',["deverloper"]),
    routeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverloper", "get_deverlopers"]),
    changeByDrag(event) {
      console.log(event);
      // this.updatePosition(event.moved.element.ID, event.moved.newIndex);
    },
    updatePosition(id, newIndex) {
      console.log(id,newIndex);
      // const formData = new FormData();
      // formData.append("id", id);
      // formData.append("newIndex", newIndex);
      // this.change_positions(formData)
    }    
  },
};
</script>
<style>
#admin td ul li{
padding: 10px 0;
}
</style>
