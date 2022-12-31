<template>
  <div class="">
    <div class="">
      <div class="">
        <!-- <b-button variant="primary left"> Quản lý Menu </b-button> -->
        <!-- <b-button variant="primary right" @click="openCreate">
          +Thêm mới
        </b-button> -->
      </div>

      <div class="">
        <div v-if="!menus" class="">
          <div class=""></div>
        </div>
        <v-simple-table class="table" dark>
          <template v-slot:default> 
            <thead>
              <tr class="w-100">
                <th  class="w-10 text-left">STT</th>
                <th  class="w-70 text-left">Tên hiển thị</th>
                <th  class="w-20 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in menus" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td class="text-right">{{ item.title }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
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
</template>

<script>
import API from "@/apis/modules/admin/menu";
export default {
  layout: "adminDev",
  data() {
    return {
      title: "Admin: Menus",
      menus: false,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Description de la page d'accueil",
        },
      ],
    };
  },
  name: "Index",
  created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      try {
        const res = await API.getAll();
        this.menus = res.data.menus;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
