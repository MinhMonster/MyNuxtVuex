<template>
  <div>
    <ModalPayload
      ref="modal"
      title="User Info"
      text-close="Close"
      hiddenFooter
      max-width="300px"
      classContent="bg-content"
      size="md"
    >
      <template #content>
        <v-simple-table class="table" dark>
          <template v-slot:default>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{{ format_number(user.id) }}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{{ user.name }}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{{ user.phone }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th>Cash</th>
                <td>{{ format_number(user.cash) }} đ</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{{ user.created_at }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";
export default {
  components: { ModalPayload },
  props: {
    user: {
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
    show() {
      this.$refs.modal.show();
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
// ::v-deep {
  .v-dialog .v-card .modal-body {
    background: #f2f2f2 !important;
  }

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
  .v-card > .v-card__text {
    position: relative;
    border: 2px solid #272727;
    background: #f2f2f2 !important;
    padding: 10px;
    &.modal-body {
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
// }

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
