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
                  <v-btn light icon :to="`/admin/topics/${item.ID}`">
                    <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <Pagination
          v-if="metaTopics && metaTopics.pages > 1"
          :meta="metaTopics"
          @change="onPageChange"
        ></Pagination>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/global/molecules/common/Pagination";

export default {
  layout: "adminDev",
  components: {
    Pagination,
  },
  data() {
    return {
      ready: true,
    };
  },
  computed: {
    ...mapState("admin/topics", ["topics", "metaTopics"]),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
  },
  mounted() {
    this.onPageChange(this.queryPage);
  },
  methods: {
    ...mapActions("admin/topics", ["fetchTopics", "setQuery", "resetQuery"]),
    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.fetchTopics();
      page == 1 || !page
        ? await this.$router.push(`/admin/topics`)
        : await this.$router.push(`/admin/topics?page=${page}`);
      this.ready = true;
    },
  },
};
</script>
