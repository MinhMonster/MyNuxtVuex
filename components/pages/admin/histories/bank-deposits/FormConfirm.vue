<template>
  <v-dialog v-model="dialog" scrollable max-width="300px" light>
    <v-card v-if="record">
      <v-card-title class="title-modal">{{
        "Deposit " + (record.status === "0" ? "Confirmation" : "Infomation")
      }}</v-card-title>
      <v-btn icon class="close" color="red" @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text style="height: 335px">
        <div class="modal-body">
          <v-simple-table class="table" dark>
            <template v-slot:default>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{{ format_number(record.id) }}</td>
                </tr>
                <tr>
                  <th>ID User</th>
                  <td>{{ record.id_nap }}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{{ record.name }}</td>
                </tr>
                <tr>
                  <th>Money</th>
                  <td>{{ format_number(record.sotien) }} đ</td>
                </tr>
                <tr>
                  <th>Change</th>
                  <td>{{ format_number(record.tiennhan) }} đ</td>
                </tr>
                <tr>
                  <th>Wallet</th>
                  <td>{{ record.hinhthuc }}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{{ record.nguoinap }}</td>
                </tr>
                <tr>
                  <th>Card Number</th>
                  <td>{{ record.stk }}</td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>{{ record.time }}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td><StatusDeposit :status="record.status" /></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card-text>
      <v-card-actions
        v-if="record.status === '0'"
        class="text-right right gap-10"
      >
        <v-btn color="red" class="text-white" @click="confirm(false)">
          Cancel
        </v-btn>
        <v-btn color="primary" class="text-white" @click="confirm(true)">
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import StatusDeposit from "@/components/pages/admin/histories/bank-deposits/StatusDeposit";

export default {
  components: { FormValidator, StatusDeposit },
  props: {
    record: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      dialog: false,
      cash: 0,
    };
  },
  computed: {},
  methods: {
    async confirm(value) {
      try {
        const res =
          await this.$repositories.adminBankDeposits.confirmBankDeposit({
            input: {
              id: this.record.id,
              confirm: value,
            },
          });

        this.$toasted[res.data.response ? "success" : "error"](
          res.data.response ? "Success" : "Failed"
        );
      } catch (e) {
        console.log(e);
      }
      this.$emit("confirmed");

      this.dialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card {
  position: relative;
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
    border: 1px solid #f44336;
    background: #f44336;
    color: #fff !important;
    height: 20px;
    width: 20px;
    z-index: 10000000;
    opacity: 1;
    // i {
    //   height: 16px;
    //   width: 16px
    // }
  }
  .v-btn--icon.v-size--default .v-icon,
  .v-btn--fab.v-size--default .v-icon {
    height: 16px;
    font-size: 16px;
    width: 16px;
  }
  .v-sheet.theme--dark {
    border: 1px solid #a4a4a4;
    /* border: 1px solid rgba(255, 255, 255, 0.12); */
  }
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
#admin .modal-body {
  padding: 0;
  .v-data-table table {
    th,
    td {
      height: 30px !important;
      vertical-align: middle;
      border: 1px solid #a4a4a4 !important;
    }
    th {
      width: 40%;
    }
  }
}
</style>