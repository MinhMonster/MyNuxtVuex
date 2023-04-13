<template>
  <client-only>
    <div class="view">
      <v-row align="center">
        <v-col>
          <v-card-title>{{ deverloper_view.title }}</v-card-title>
        </v-col>
        <!-- <v-spacer /> -->
        <!-- <v-col
          ><v-btn class="right mgr-15px" color="primary" :to="`/admin/deverlopers/${deverloper_view.level_1}/show`"
            >Quay lại
          </v-btn></v-col
        > -->
      </v-row>

      <div id="body-admin">
        <div v-if="!deverloper_view" class="">
          <div class=""></div>
        </div>

        <div class="ck-content">
          <div class="bg-view view_htm">
            <div v-html="deverloper_view.info"></div>
            <div v-for="(action, index) in actions" :key="index">
              <CodeView :index="index"></CodeView>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import CodeView from "@/components/pages/admin/deverlopers/form/CodeView.vue";

export default {
  layout: "adminDev",
  head() {
    return {
      title:
        "Admin: Deverlopers - " +
        this.paramType +
        " - " +
        this.deverloper_view.title,
      meta: [
        {
          hid:
            "Admin: Deverlopers - " +
            this.paramType +
            " - " +
            this.deverloper_view.title,
          name:
            "Admin: Deverlopers - " +
            this.paramType +
            " - " +
            this.deverloper_view.title,
          content:
            "Admin: Deverlopers - " +
            this.paramType +
            " - " +
            this.deverloper_view.title,
        },
      ],
    };
  },
  name: "View_Deverloper",
  components: { CodeView },

  async mounted() {
    await this.get_deverloper_view({
      params: {
        link: this.paramLink,
        type: this.paramType,
      },
    });
  },
  computed: {
    ...mapState("admin/deverlopers", ["deverloper", "deverloper_view"]),
    ...mapFields("admin/deverlopers", ["deverlopers", "actions"]),

    paramType() {
      return this.$route.params.type;
    },
    paramLink() {
      return this.$route.params.link;
    },
  },
  methods: {
    ...mapActions("admin/deverlopers", ["get_deverloper_view"]),
  },
};
</script>
<style scoped>
.view .v-card__title {
  background: #212529;
  margin: 0 16px;
  margin-top: 15px;
  color: #fff;
}
</style>
