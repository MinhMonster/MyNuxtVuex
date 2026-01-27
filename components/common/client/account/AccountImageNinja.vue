<template>
  <client-only>
    <div v-if="account?.code" class="ninja-image-card">
      <img
        :src="
          account.images[0].includes('muabannick.pro')
            ? account.images[0]
            : `https://muabannick.pro${account.images[0]}`
        "
        alt="Ninja School"
        class="ninja-img"
        :class="{ 'img-full': account.is_full_image }"
      />

      <template v-if="!account.is_full_image">
        <div class="ninja-top-meta">
          <span class="meta-tag tag-lv">Lv: {{ account.level }}</span>
          <span class="meta-tag tag-sv"
            >Sv: {{ serverNinjaNumber(account.server) }}</span
          >
          <span class="meta-tag tag-name"
            >@{{ account.character_name }}</span
          >
        </div>

        <span
          v-if="account.tl_1"
          class="equip-stat pos-r"
          style="top: 19%"
          >{{ account.tl_1 }}</span
        >
        <span
          v-if="account.tl_2"
          class="equip-stat pos-r"
          style="top: 30.5%"
          >{{ account.tl_2 }}</span
        >
        <span
          v-if="account.tl_3"
          class="equip-stat pos-r"
          style="top: 42%"
          >{{ account.tl_3 }}</span
        >
        <span
          v-if="account.tl_4"
          class="equip-stat pos-r"
          style="top: 53%"
          >{{ account.tl_4 }}</span
        >
        <span
          v-if="account.tl_5"
          class="equip-stat pos-r"
          style="top: 64%"
          >{{ account.tl_5 }}</span
        >

        <span
          v-if="account.tl_6"
          class="equip-stat pos-l"
          style="top: 19%"
          >{{ account.tl_6 }}</span
        >
        <span
          v-if="account.tl_7"
          class="equip-stat pos-l"
          style="top: 30.5%"
          >{{ account.tl_7 }}</span
        >
        <span
          v-if="account.tl_8"
          class="equip-stat pos-l"
          style="top: 42%"
          >{{ account.tl_8 }}</span
        >
        <span
          v-if="account.tl_9"
          class="equip-stat pos-l"
          style="top: 53%"
          >{{ account.tl_9 }}</span
        >
        <span
          v-if="account.tl_10"
          class="equip-stat pos-l"
          style="top: 64%"
          >{{ account.tl_10 }}</span
        >

        <span
          v-if="account.tl_11"
          class="equip-stat"
          style="left: 44.5%; top: 62%"
          >{{ account.tl_11 }}</span
        >
        <span
          v-if="account.tl_12"
          class="equip-stat"
          style="left: 56.5%; top: 62%"
          >{{ account.tl_12 }}</span
        >

        <span
          v-if="account.item_7"
          class="item-badge pos-l"
          style="top: 19%"
          >{{ account.item_7 }}</span
        >
        <span
          v-if="account.item_8"
          class="item-badge pos-l"
          style="top: 30.5%"
          >{{ account.item_8 }}</span
        >
        <span
          v-if="account.item_9"
          class="item-badge pos-l"
          style="top: 42%"
          >{{ account.item_9 }}</span
        >
        <span
          v-if="account.item_10"
          class="item-badge pos-l"
          style="top: 53%"
          >{{ account.item_10 }}</span
        >
        <span
          v-if="account.item_11"
          class="item-badge pos-l"
          style="top: 64%"
          >{{ account.item_11 }}</span
        >
        <span
          v-if="account.item_12"
          class="item-badge pos-l"
          style="top: 75%"
          >{{ account.item_12 }}</span
        >

        <span
          v-if="account.item_1"
          class="item-badge pos-r"
          style="top: 19%"
          >{{ account.item_1 }}</span
        >
        <span
          v-if="account.item_2"
          class="item-badge pos-r"
          style="top: 30.5%"
          >{{ account.item_2 }}</span
        >
        <span
          v-if="account.item_3"
          class="item-badge pos-r"
          style="top: 42%"
          >{{ account.item_3 }}</span
        >
        <span
          v-if="account.item_4"
          class="item-badge pos-r"
          style="top: 53%"
          >{{ account.item_4 }}</span
        >
        <span
          v-if="account.item_5"
          class="item-badge pos-r"
          style="top: 64%"
          >{{ account.item_5 }}</span
        >
        <span
          v-if="account.item_6"
          class="item-badge pos-r"
          style="top: 75%"
          >{{ account.item_6 }}</span
        >

        <div v-if="account.item_13" class="banner-mounts-minimal">
          <div class="line top"></div>
          <div class="text-glow">{{ account.item_13 }}</div>
          <div class="line bottom"></div>
        </div>
      </template>
    </div>
  </client-only>
</template>
<script>
export default {
  name: "AccountImageNinja",
  components: {},
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.ninja-image-card {
  position: relative;
  background: #000;
  overflow: hidden;
  border-bottom: 1px solid rgba(189, 0, 255, 0.4);

  .ninja-img {
    width: 108%;
    display: block;
    &.img-full {
      width: 100%;
    }
  }
}
/* Header Info - Phong cách mờ dần và 2 vạch kẻ */
.meta-tag {
  position: absolute;
  top: 4px; // Đưa sát lên trên một chút cho thoáng
  height: 12%;
  line-height: 1;
  display: flex;
  align-items: center;
  // z-index: 20;

  color: #fff;
  font-size: 13px;
  font-weight: 800;
  text-shadow: 1px 1px 2px #000;

  /* Cấu trúc 2 vạch kẻ trên dưới */
  border-top: 1px solid;
  border-bottom: 1px solid;

  /* Level: Mờ dần từ trái sang phải */
  &.tag-lv {
    left: 4px;
    padding-left: 6px;
    padding-right: 20px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    border-left: 1px solid;
    border-image: linear-gradient(90deg, #bd00ff 0%, transparent 100%) 1; // Vạch kẻ trắng mờ dần
  }

  /* Server: Mờ đều sang 2 bên (Tâm điểm) */
  &.tag-sv {
    left: 50%;
    transform: translateX(-50%);
    padding: 0 15px;
    min-width: 80px;
    justify-content: center;
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.95) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    /* Vạch kẻ tím mờ dần 2 đầu */
    border-image: linear-gradient(
        90deg,
        transparent 0%,
        #bd00ff 50%,
        transparent 100%
      )
      1;
  }

  /* Tên nhân vật: Mờ dần từ phải sang trái */
  &.tag-name {
    right: 4px;
    padding-right: 6px;
    padding-left: 20px;
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.9) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    border-right: 1px solid;
    border-image: linear-gradient(270deg, #bd00ff 0%, transparent 100%) 1; // Vạch kẻ xanh Cyan mờ dần
  }
}

/* Các ô số (+5, +9...) */
.equip-stat {
  position: absolute;
  width: 5.5% !important;
  height: 10% !important;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(189, 0, 255, 0.7);
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  border-radius: 2px;
  // z-index: 10;
  padding: 0 2px;
  &.pos-r {
    right: 24.5%;
  }
  &.pos-l {
    left: 25.5%;
  }
}
/* Các nhãn vật phẩm sát mép với hiệu ứng mờ dần và 2 vạch kẻ */
.item-badge {
  position: absolute;
  height: 10%; // Cố định chiều cao thay vì dùng % để tránh méo chữ
  line-height: 1;
  display: flex;
  align-items: center;
  // z-index: 15;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 800;
  text-shadow: 1px 1px 2px #000;

  /* Tạo 2 vạch kẻ trên dưới */
  border-top: 1px solid;
  border-bottom: 1px solid;

  /* Xử lý riêng cho vật phẩm bên trái */
  &.pos-l {
    left: 4px; // Sát mép trái tuyệt đối
    padding-left: 6px;
    padding-right: 25px; // Khoảng thở rộng để gradient mờ dần mượt mà

    /* Nền đen mờ dần sang phải */
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    border-left: 1px solid;
    /* Vạch kẻ tím mờ dần sang phải */
    border-image: linear-gradient(90deg, #bd00ff 0%, transparent 100%) 1;
  }

  /* Xử lý riêng cho vật phẩm bên phải */
  &.pos-r {
    right: 4px; // Sát mép phải tuyệt đối
    padding-right: 6px;
    padding-left: 25px;

    /* Nền đen mờ dần sang trái */
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.9) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    border-right: 1px solid;

    /* Vạch kẻ tím mờ dần sang trái */
    border-image: linear-gradient(270deg, #bd00ff 0%, transparent 100%) 1;
  }
}

/* Giữ nguyên logic Banner Mounts nhưng tinh chỉnh nhẹ */
.banner-mounts-minimal {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  // z-index: 20;

  .line {
    height: 1px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #bd00ff 50%,
      transparent 100%
    );
  }

  .text-glow {
    /* Nền đậm trung tâm tỏa ra */
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.95) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    color: #fff;
    font-size: 11.5px;
    font-weight: 800;
    text-align: center;
    padding: 2px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 0 4px #000;
  }
}
</style>
