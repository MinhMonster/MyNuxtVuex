<template>
  <NavAdmin
    title="New Account Ninja School"
    goBack
    next-page
    reload
    @reload="newAccountNinja()"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <form @submit.prevent="create()">
          <NinjaForm></NinjaForm>
          <br />
          <div class="d-flex">
            <v-spacer />
            <div class="text-right">
              <v-btn type="submit" color="" to="/admin/game/ninjas">
                Trở Về
              </v-btn>
              <v-btn type="submit" color="primary"> Thêm </v-btn>
            </div>
          </div>
        </form>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

import NinjaForm from "@/components/pages/admin/game/ninjas/form/NinjaForm.vue";
import mixins from "@/mixins/index";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";

export default {
  mixins: [mixins],
  components: {
    NinjaForm,
    NavAdmin,
  },
  layout: "adminDev",
  props: {},
  data() {
    return {
      titel: `Admin: New Account Ninja`,
    };
  },
  computed: {},
  async mounted() {
    await this.newAccountNinja();
  },
  methods: {
    ...mapActions("admin/game/ninjas", [
      "newAccountNinja",
      "createAccountNinja",
    ]),
    async create() {
      try {
        const res = await this.createAccountNinja();
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .CodeMirror {
    height: 500px;
    resize: horizontal;
  }
  .CodeMirror-wrap pre {
    word-break: break-word;
  }
}
</style>
