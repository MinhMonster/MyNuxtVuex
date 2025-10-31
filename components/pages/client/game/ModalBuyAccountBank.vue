
<template>
  <div>
    <ModalPayload
      :title="`HD Mua Nick = ATM-MOMO`"
      ref="modal"
      size="md"
      hiddenFooter
      @hide="close()"
    >
      <template #content>
        <div class="page-body">
          <v-row>
            <v-col cols=12 sm="12" md="12">
              <AccountNumbeAdmin />
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <BuyAccountInstructions
                :account="account"
                :account-type="accountType"
              />
            </v-col>
          </v-row>
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
  
<script>
import ModalPayload from "@/components/common/ModalPayload";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import BuyAccountInstructions from "@/components/common/BuyAccountInstructions";

export default {
  components: {
    ModalPayload,
    AccountNumbeAdmin,
    BuyAccountInstructions,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    accountType: {
      type: String,
      default: "",
    },
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    close() {
      this.$emit("hide");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.row {
  padding: 0;
  margin: 0px;
  .col-md-12 {
    margin: 0px;
    padding: 0px;
    .info-atm-momo {
      border: 1px solid #663019;
      background: #ffcf9c;
      margin: 5px;
      padding: 5px;
      line-height: 25px;
      font-size: 14px;
    }
  }
}
</style>
