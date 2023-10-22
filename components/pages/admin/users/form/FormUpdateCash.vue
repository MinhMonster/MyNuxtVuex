<template>
  <v-dialog v-model="dialog" scrollable max-width="300px" light>
    <v-card v-if="user">
      <v-card-title class="title-modal">{{ user.Ffname }}</v-card-title>
      <v-card-text style="height: 300px">
        <div class="modal-body">
          <v-row class="bg-editor bg-account row" justify="center">
            <v-col cols="12">
              <form-validator name="ID">
                <v-text-field
                  label="Số Dư"
                  disabled
                  :value="format_number(user.sodu) + 'đ'"
                ></v-text-field>
              </form-validator>
            </v-col>
            <v-col cols="12">
              <form-validator name="ID">
                <v-text-field label="Cộng Tiền" v-model="cash"></v-text-field>
              </form-validator>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions class="text-right right gap-10">
        <v-btn color="red" class="text-white" @click="dialog = false">
          Đóng
        </v-btn>
        <v-btn color="primary" class="text-white" @click="update(cash)">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapFields } from "vuex-map-fields";

import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
export default {
  components: { FormValidator },
  props: {},
  data() {
    return {
      dialog: false,
      cash: 0,
    };
  },
  computed: {
    ...mapFields("admin/users", {
      user: "user",
    }),
  },
  methods: {
    async update() {
      console.log("update");
      const res = await this.$repositories.adminUsers.updateCashUser({
        input: {
          uid: this.user.uid,
          cash: this.cash,
        },
      });
      if (res.data.user) {
        this.user = res.data.user;
        this.cash = 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
  /* border: 1px solid rgba(255, 255, 255, 0.12); */
}

/* .v-card.v-sheet.theme--dark {
  background: #fff !important;
} */
.v-card__title.title-modal {
  color: #fff;
  border-left: 2px solid #272727;
  border-right: 2px solid #272727;
  background: #333;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-dialog--scrollable > .v-card > .v-card__text {
  position: relative;
  border: 2px solid #272727;
  background: #f2f2f2;
  padding: 10px;
  .modal-body {
    background: #fff;
    height: 100%;
  }
}
.v-dialog > .v-card > .v-card__actions {
  border: 2px solid #272727;
  background: #333;
  border-top: none;
  display: flex;
  flex-direction: row;
  justify-content: right;
  justify-content: end;
  align-content: flex-end;
}

</style>