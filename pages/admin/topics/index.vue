<template>
  <client-only>
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>Bài viết</v-card-title>
        </v-col>
        <v-spacer />
        <v-col
          ><v-btn class="right mgr-15px" color="primary" to="/admin/topics/new"
            >Viết bài
          </v-btn></v-col
        >
      </v-row>

      <div id="body-admin">
        <div v-if="!topics" class="">
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
              <tr v-for="(item, index) in topics" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td class="text-left">{{ item.link }}</td>

                <td class="text-center">
                  <v-btn light icon :to="`/admin/topics/${item.ID}/edit`">
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
import API from "@/apis/modules/admin/topics";
export default {
  layout: "adminDev",
  data() {
    return {
      title: "Admin: topics",
      topics: false,
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
        this.topics = res.data.topics;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
