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
                <th class="w-75 text-left">Danh sách</th>
                <th class="w-15 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody v-if="deverloper">
              <tr v-for="(item, index) in deverloper.items" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-left">
                  <ul>
                    <li class="bold">
                      {{ item.title }}
                    </li>
                    <li v-for="info in item.items" :key="info.ID" >
                      <nuxt-link :to="`/admin/deverlopers/${info.type}/${info.link}` ">{{info.title}}</nuxt-link>
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
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  layout: "adminDev",
  head() {
    return {
      title: "Admin: Deverlopers - " + this.paramType,  
      meta: [
        {
          hid: "Admin: Deverlopers - " + this.paramType,
          name: "Admin: Deverlopers - " + this.paramType,
          content: "Admin: Deverlopers - " + this.paramType,
        },
      ],
    };
  },
  name: "Deverlopers",
  async mounted() {
    await this.get_deverloper({
      params:{
        type: this.paramType
      }
    });
  },
  computed: {
    ...mapState('admin/deverlopers',["deverloper"]),
    paramType() {
      return this.$route.params.type;
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
