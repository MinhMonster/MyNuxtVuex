<template>
  <client-only>
    <div>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <AvatarForm></AvatarForm>
          <br />
          <div class="d-flex">
            <v-spacer />
            <div class="text-right">
              <v-btn type="submit" color="" to="/admin/game/avatars">
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

import AvatarForm from "@/components/pages/admin/game/avatars/form/AvatarForm.vue";

import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: {
    AvatarForm,
  },
  layout: "adminDev",
  head() {
    return {
      title: this.titel,
      meta: [
        {
          hid: this.titel,
          name: this.titel,
          content: this.titel,
        },
      ],
    };
  },
  name: "NewAccountAvatar",
  props: {},
  data() {
    return {
      titel: `Admin: New Account Avatar`,
    };
  },
  methods: {
    ...mapActions("admin/game/avatars", ["createAccountAvatar"]),
    async create() {
      try {
        const res = await this.createAccountAvatar();
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
