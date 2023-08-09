<template>
  <client-only>
    <div>
      <div id="body-admin">
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
    </div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";

import NinjaForm from "@/components/pages/admin/game/ninjas/form/NinjaForm.vue";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: {
    NinjaForm,
  },
  layout: "adminDev",
  props: {},
  data() {
    return {
      titel: `Admin: New Account Ninja`,
    };
  },
  methods: {
    ...mapActions("admin/game/ninjas", ["createAccountNinja"]),
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
