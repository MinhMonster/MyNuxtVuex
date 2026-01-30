<template>
  <client-only>
    <div v-if="account?.code" class="ninja-image-card">
      <img
        :src="thumbnail"
        alt="Ninja School"
        class="ninja-img"
        :class="{ 'img-full': account.is_full_image }"
      />

      <template v-if="!account.is_full_image">
        <!-- Meta -->
        <div class="ninja-top-meta">
          <span class="meta-tag tag-lv">Lv: {{ account.level }}</span>
          <span class="meta-tag tag-sv">
            Sv: {{ serverNinjaNumber(account.server) }}
          </span>
          <span class="meta-tag tag-name"> @{{ account.character_name }} </span>
        </div>

        <!-- Equip stats -->
        <span
          v-for="stat in equipStats"
          :key="stat.key"
          class="equip-stat"
          :class="stat.side"
          :style="stat.style || { top: stat.top }"
        >
          {{ stat.value }}
        </span>

        <!-- Item badges -->
        <span
          v-for="item in itemBadges"
          :key="item.key"
          class="item-badge"
          :class="item.side"
          :style="{ top: item.top }"
        >
          {{ item.value }}
        </span>

        <!-- Mount banner -->
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
  props: {
    account: {
      type: Object,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    }
  },

  computed: {
    equipStats() {
      const tops = ["19%", "30.5%", "42%", "53%", "64%"];

      return [
        // right tl_1 -> tl_5
        ...tops.map((top, i) => ({
          key: `tl_${i + 1}`,
          value: this.account[`tl_${i + 1}`],
          side: "pos-r",
          top,
        })),

        // left tl_6 -> tl_10
        ...tops.map((top, i) => ({
          key: `tl_${i + 6}`,
          value: this.account[`tl_${i + 6}`],
          side: "pos-l",
          top,
        })),

        // center tl_11, tl_12
        {
          key: "tl_11",
          value: this.account.tl_11,
          style: { left: "44.5%", top: "62%" },
        },
        {
          key: "tl_12",
          value: this.account.tl_12,
          style: { left: "56.5%", top: "62%" },
        },
      ].filter((i) => i.value);
    },

    itemBadges() {
      const tops = ["19%", "30.5%", "42%", "53%", "64%", "75%"];

      return [
        // left items 7 -> 12
        ...tops.map((top, i) => ({
          key: `item_${i + 7}`,
          value: this.account[`item_${i + 7}`],
          side: "pos-l",
          top,
        })),

        // right items 1 -> 6
        ...tops.map((top, i) => ({
          key: `item_${i + 1}`,
          value: this.account[`item_${i + 1}`],
          side: "pos-r",
          top,
        })),
      ].filter((i) => i.value);
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
