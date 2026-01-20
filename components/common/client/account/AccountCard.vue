<template>
  <v-col v-if="account" cols="12" sm="6" md="6" lg="4" class="pa-2">
    <div class="card-gaming-v3">
      <slot name="image"></slot>
      <div class="card-body-wrapper">
        <div class="account-description break-line-1">
          <span v-html="account.description"></span>
        </div>

        <div class="meta-info-grid">
          <div v-for="item in infoItems" :key="item.key" class="meta-column">
            <span class="meta-label">{{ item.label }}</span>
            <span class="meta-value">{{ item.value }}</span>
          </div>
        </div>
        <div class="action-footer-gaming">
          <div
            class="price-container-neon"
            :class="{ 'is-discount': hasDiscount }"
          >
            <div v-if="hasDiscount" class="sale-tag-badge">
              <span>-{{ account.active_discount }}%</span>
            </div>
            <div class="price-display">
              <span v-if="hasDiscount" class="price-old"
                >{{ format_number(account.selling_price) }}đ</span
              >
              <span class="price-current"
                >{{ finalPrice }} <small>Vnđ</small></span
              >
            </div>
          </div>

          <nuxt-link :to="detailLink" class="view-nick-link">
            <div class="btn-neon-purple">XEM NICK</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "AccountCard",
  props: {
    account: { type: Object, required: true },
    infoItems: {
      type: Array,
      default: () => [],
    },
    detailLink: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasDiscount() {
      return this.account.active_discount > 0;
    },
    finalPrice() {
      return this.format_number(this.account.price);
    },
  },
};
</script>

<style lang="scss" scoped>
/* Tổng thể Card */
.card-gaming-v3 {
  background: #151515; // Nền đen sâu
  border: 1px solid #bd00ff; // Viền tím mờ
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  height: 100%;

  &:hover {
    border-color: #bd00ff;
    box-shadow: 0 0 20px rgba(189, 0, 255, 0.4);
    transform: translateY(-5px);
  }
}

.card-body-wrapper {
  padding: 12px;
}

/* account  description */
.account-description {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  text-align: center;
  padding: 3px;
  height: 32px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 26px;
  margin-bottom: 12px;
}

/* Grid Thông số */
.meta-info-grid {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 15px;

  .meta-column {
    display: flex;
    flex-direction: column;
    align-items: center;

    .meta-label {
      color: #94a3b8; // Màu xám Slate cho label
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .meta-value {
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      margin-top: 2px;
    }
  }
}

/* Footer & Buttons */
.action-footer-gaming {
  display: flex;
  gap: 10px;
  align-items: center;
}

.price-container-neon {
  flex: 1.2;
  display: flex;
  align-items: center;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  height: 32px;
  overflow: hidden;

  &.is-discount {
    border-color: rgba(255, 23, 68, 0.4); // Viền đỏ mờ khi có giảm giá
  }
}

/* Badge Giảm giá tích hợp */
.sale-tag-badge {
  background: linear-gradient(180deg, #ff1744 0%, #b20000 100%);
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.3);

  span {
    color: #fff;
    font-weight: 900;
    font-size: 12px;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
}

.price-display {
  padding-left: 10px;
  display: flex;
  flex-direction: column;

  .price-old {
    text-decoration: line-through;
    color: #64748b;
    font-size: 10px;
    line-height: 1;
  }

  .price-current {
    color: #ffffff;
    font-weight: 800;
    font-size: 14px;
    line-height: 1.2;

    small {
      font-size: 10px;
      color: #94a3b8;
    }
  }
}

/* Nút Xem chi tiết */
.view-nick-link {
  flex: 1;
  text-decoration: none !important;
}
</style>
