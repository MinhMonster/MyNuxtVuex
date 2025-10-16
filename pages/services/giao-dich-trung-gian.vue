<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      table
    >
      <template v-if="ready" #body>
        <GdtgInfo />
      </template>

      <template #table>
        <GdtgTable :histories="histories" />
      </template>
    </HomePage>
  </client-only>
</template>


<script>
import Loading from "@/components/global/molecules/common/Loading";
import GdtgTable from "@/components/pages/services/GdtgTable";
import GdtgInfo from "@/components/pages/services/GdtgInfo";
import HomePage from "@/components/pages/home/HomePage";

import { mapFields } from "vuex-map-fields";

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    Loading,
    GdtgTable,
    GdtgInfo,
  },
  data() {
    return {
      title: "Giao Dịch Trung Gian",
      histories: [
        {
          from: "10000",
          to: "100000",
          fee: "10000",
          fee_2: "15000",
        },
        {
          from: "100001",
          to: "300000",
          fee: "15000",
          fee_2: "20000",
        },
        {
          from: "300001",
          to: "1999999",
          fee: "20000",
          fee_2: "30000",
        },
        {
          from: "2000000",
          to: "2999999",
          fee: "30000",
          fee_2: "40000",
        },
        {
          from: "3000000",
          to: "3999999",
          fee: "40000",
          fee_2: "50000",
        },
        {
          from: "4000000",
          to: "4999999",
          fee: "50000",
          fee_2: "65000",
        },
        {
          from: "5000000",
          to: "7499999",
          fee: "60000",
          fee_2: "75000",
        },
        {
          from: "7500000",
          to: "9999999",
          fee: "75000",
          fee_2: "100000",
        },
        {
          type: "other",
          from: ">= 10 Triệu đồng",
          fee: "1",
          fee_2: "1",
        },
      ],
    };
  },

  computed: {
    ...mapFields("global", { ready: "ready" }),
  },
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 500);
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>

