<template>
  <client-only>
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>Deverloper | {{ this.deverloper.title }}</v-card-title>
        </v-col>
        <v-spacer />
        <v-col
          ><v-btn class="right mgr-15px" color="primary" :to="`/admin/deverlopers/${this.routeId}/new`"
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
                <th class="w-45 text-left">Danh sách</th>
                <th class="w-15 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in deverloper.items" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td class="text-left">
                  <ul>
                    <li v-for="info in item.items" :key="info.ID" >
                      <nuxt-link :to="`/admin/deverlopers/${info.link}/view?id=${info.ID}}` ">{{info.title}}</nuxt-link>

                      <hr/>
                    </li>
                  </ul>

                </td>

                <td class="text-center">
                  <v-btn light icon :to="`/admin/deverlopers/${item.ID}/new`">
                    <v-icon>mdi-plus-box-multiple-outline</v-icon>
                  </v-btn>
                  <v-btn light icon :to="`/admin/deverlopers/${item.ID}/edit`">
                    <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
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
import { mapActions, mapState } from 'vuex'
export default {
  layout: "adminDev",
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
    await this.get_deverloper({
      params:{
      id: this.routeId}
  });
  },
  computed: {
    ...mapState('admin/deverlopers',["deverloper"]),
    routeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverloper"]),
  },
};
</script>
<style>
#admin td ul li{
padding: 10px 0;
}
</style>