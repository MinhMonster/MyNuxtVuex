
<template>
  <div>
    <ModalPayload
      :title="`HD Mua Nick = ATM-MOMO`"
      ref="modal"
      size="md"
      @hide="close()"
    >
      <template #content>
        <div class="page-body">
          <b-row>
            <b-col sm="12" md="12">
              <AccountNumbeAdmin />
            </b-col>

            <b-col sm="12" md="12">
              <BuyAccountInstructions
                :account="account"
                :account-type="accountType"
              />
            </b-col>
          </b-row>
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
import mixins from "@/mixins/index";
import ModalPayload from "@/components/common/ModalPayload";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import BuyAccountInstructions from "@/components/common/BuyAccountInstructions";

export default {
  name: "ModalBuyAccountBank",
  mixins: [mixins],

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
  data() {
    return {};
  },
  async mounted() {},
  computed: {},
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
