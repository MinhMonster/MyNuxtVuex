<template>
  <v-row class="contact-action-row">
    <v-col cols="6">
      <a
        href="https://zalo.me/0961646828"
        target="_blank"
        class="contact-btn zalo"
      >
        <BaseSvg content="Inbox Zalo" name="next-right" />
      </a>
    </v-col>
    <v-col cols="6">
      <a
        href="https://messenger.com/t/minh.docong.7"
        target="_blank"
        class="contact-btn messenger"
      >
        <BaseSvg content="Messenger" name="next-right" />
      </a>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.contact-action-row {
  margin-top: 8px;
}

.contact-btn {
  height: 40px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  text-decoration: none;
  font-weight: 800;
  font-size: 13px;
  color: #fff;
  border: 1px solid transparent;
  transition: all 0.25s ease;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.15);
  }
}

.contact-btn .icon {
  background: rgba(255, 255, 255, 0.18); // dịu hơn
  border: 1px solid rgba(255, 255, 255, 0.25);
}

/* Zalo */
.contact-btn.zalo {
  background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
  border-color: rgba(0, 198, 255, 0.6);
  // box-shadow: 0 0 15px rgba(0, 198, 255, 0.35);
}

/* Messenger */
.contact-btn.messenger {
  background: linear-gradient(135deg, #bd00ff 0%, #4a00e0 100%);
  border-color: rgba(189, 0, 255, 0.6);
  // box-shadow: 0 0 15px rgba(189, 0, 255, 0.35);
}
</style>
