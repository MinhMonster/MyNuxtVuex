<template>
  <client-only>
    <div>
      <ul class="topics-list">
        <li v-for="(item, index) in dataSource" :key="index">
          <nuxt-link :to="`/topics/${item.slug}`">
            <v-row>
              <v-col cols="4" md="3">
                <div
                  class="image-topic"
                  :style="{
                    backgroundImage: `url('${item.thumbnail}')`,
                  }"
                ></div>
              </v-col>
              <v-col cols="8" md="9">
                <div class="text-main text-14-700">
                  {{ item.title }}
                </div>
                <div
                  class="break-line-2 text-main text-13-400"
                  :class="isMobile ? 'break-line-2' : 'break-line-3'"
                >
                  <div v-html="item.description"></div>
                </div>
              </v-col>
            </v-row>
          </nuxt-link>
        </li>
      </ul>
      <div v-if="!isLoadingSearch && !dataSource.length" class="mt-4">
        <h1 class="text-center bold text-danger">
          Không tìm thấy bài viết nào!
        </h1>
      </div>
      <div
        v-if="isLoadingSearch"
        class="center mgt--50px mgb--50px loading-resoult"
      >
        <Loading></Loading>
      </div>
      <Pagination
        v-if="meta && meta.pages > 1"
        class="mt-4"
        :meta="meta"
        @change="onChangePage"
      ></Pagination>
    </div>
  </client-only>
</template>

<script>
import clientCrud from "@/mixins/clientCrud";
import Pagination from "@/components/global/molecules/common/Pagination";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  mixins: [clientCrud],
  components: { Pagination, Loading },
  props: {
    params: {
      type: Array,
      default: () => [],
      require: false,
    },
  },
  async created() {
    await this.storeDispatch("passDataFromQuery", {
      stateName: this.storeQueryItems,
      query: this.$route.query,
    });
    await this.storeDispatch("clearResponse", this.storeQueryItems);
    this.fetchDataIndex();
  },
};
</script>
