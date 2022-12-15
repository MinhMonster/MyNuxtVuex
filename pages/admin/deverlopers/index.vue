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
            <tbody>
              <tr v-for="(item, index) in deverlopers" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td>
                  <nuxt-link :to="`/admin/deverlopers/${item.ID}/show`">{{ item.title }}</nuxt-link>
                  <!-- <v-btn light icon :to="`/admin/deverlopers/${item.ID}/show`"> -->
                    <!-- {{ item.title }} -->
                  <!-- </v-btn> -->
                </td>
                <td class="text-left">{{ item.link }}</td>

                <td class="text-center">
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
  layout: "admin",
  
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
  computed: {
    ...mapState('admin/deverlopers',["deverlopers"]),
  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverlopers"]),
  },
};
</script>
