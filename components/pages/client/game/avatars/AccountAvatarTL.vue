<template>
  <client-only>
    <div v-if="image" class="image-avatar">
      <img
        :src="image"
        alt="Image Account Avatar"
        title="Phóng to ảnh"
        class="image-account cursor-pointer"
        :class="{ full: accountAvatar?.full, 'avatar-detail': isDetail }"
        @click="$refs.modal.show()"
      />
      <ModalPayload
        classContent="modal-avatar"
        width="100%"
        max-width="1000px"
        ref="modal"
        title="Ảnh Nick Avatar"
        size="md"
        hiddenFooter
      >
        <template #content>
          <img
            :src="image"
            alt="Image Account Avatar"
            class="image-account w-100"
            :class="{ full: accountAvatar?.full }"
          />
        </template>
      </ModalPayload>
    </div>
  </client-only>
</template>

<script>
import ModalPayload from "@/components/common/ModalPayload";

export default {
  components: { ModalPayload },
  props: {
    accountAvatar: {
      type: Object,
      default: () => ({}),
    },
    isDetail: Boolean,
  },
  computed: {
    image() {
      const img = this.accountAvatar?.images?.[0];
      if (!img) return null;

      return img.includes("muabannick.pro")
        ? img
        : `https://muabannick.pro${img}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-avatar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  border-radius: 5px;

  .image-account {
    width: 120%;
    margin-left: -10%;
    height: 270px;
    border-radius: 7px;
    border: 1px solid #a4a4a4;

    &.full {
      width: 100%;
      margin-left: 0;
    }

    &.avatar-detail {
      height: 100% !important;
    }

    @media (min-width: 1500px), (max-width: 959px) {
      height: 400px;
    }

    @media (max-width: 599px) {
      height: 100%;
    }
  }
}

.account-ingame,
.account-cash-atm {
  position: absolute;
  top: 4px;
  font-size: 13px;
  font-weight: 450;
  border-radius: 5px;
  padding: 0 5px;
  color: #fff;
  background: #a21d0a;
  text-align: center;

  &.account-ingame {
    right: 4px;
  }

  &.account-cash-atm {
    left: 4px;
    font-size: 11px;
    font-weight: 700;
  }

  .v-btn--icon.v-size--default {
    height: 20px;
    width: 20px;
    margin: 0 -5px;

    i {
      height: 15px;
      width: 15px;
      line-height: 15px;
      font-size: 14px;
    }
  }
}

.account-tl {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  font-size: 13px;
  font-weight: 450;
  width: 5.5% !important;
  height: 10% !important;
  text-align: center;
  border-radius: 3px;
  padding: 0;
  color: #fff;
  background: #a21d0a;
}
</style>
