<template>
  <client-only>
    <div class="page-body mt-6">
      <label v-if="isLogin" for="">
        <i class="mdi mdi-history"></i> Lịch sử nạp Lượng, Carot của
        <font color="red">{{ userInfo.name }}</font></label
      >
      <br />
      <small id="fileHelp" class="form-text text-muted"
        >Xem lại các Giao dịch gần nhất.</small
      >
      <div class="table-responsive">
        <table style="font-size: 14px" class="table table-striped table-border">
          <thead>
            <tr>
              <th class="trading-code">Mã GD</th>
              <th class="info-history" v-if="!isMobile">Game</th>
              <th class="info-history" v-if="!isMobile">Tài khoản</th>
              <th class="info-history" v-if="!isMobile">Server</th>
              <th class="info-history">Carot</th>
              <th class="info-history" v-if="!isMobile">Giá</th>
              <!-- <th v-if="!isMobile" class="info-history">Tiền cộng</th> -->
              <th v-if="!isMobile" class="info-history">Thời gian</th>
              <th class="info-history">Trạng thái</th>
              <th class="holder-action">Chi tiết</th>
            </tr>
          </thead>
          <tbody v-if="histories.length">
            <tr v-for="(history, index) in histories" :key="index">
              <td class="text-middle">{{ history.ID }}</td>
              <td class="text-middle" v-if="!isMobile">
                {{ history.game_type }}
              </td>
              <td class="text-middle" v-if="!isMobile">
                {{ history.username }}
              </td>
              <td class="text-middle" v-if="!isMobile">
                {{ history.server }}
              </td>
              <td class="text-middle">{{ format_number(history.amount) }} đ</td>
              <td class="text-middle" v-if="!isMobile">
                {{ format_number(history.price) }} đ
              </td>
              <td v-if="!isMobile" class="text-middle">
                {{ history.created_at }}
              </td>
              <td class="text-middle">
                <v-btn
                  :color="history.status.value"
                  class="btn-sm pd-5px"
                  :class="
                    history.status.value === 'danger'
                      ? 'text-white'
                      : 'text-black'
                  "
                >
                  {{ history.status.text }}
                </v-btn>
              </td>
              <td class="text-middle">
                <v-btn
                  color="info"
                  class="btn-sm pd-10px"
                  @click="$emit('show', history)"
                >
                  Xem
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!histories.length" class="text-center">
        <span>Bạn chưa có giao dịch nào!</span>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    histories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

