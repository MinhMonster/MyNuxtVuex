<template>
  <client-only>
    <div class="page-body">
      <div class="page-info">
        <label><i class="mdi mdi-table"></i> Bảng giá nạp Lượng, Carot </label
        ><br />
        <small id="fileHelp" class="form-text text-muted text-warning"
          >Số lượng nhận được sẽ phụ thuộc vào CTKM của Game.</small
        >
        <div class="table-responsive">
          <table
            style="font-size: 14px"
            class="table table-striped table-border"
          >
            <thead>
              <tr>
                <th>Carot</th>
                <th>ATM</th>
                <th>Lượng</th>
                <th>GOLD</th>
                <th>KMx2</th>
                <th>KMx3</th>
                <th>KMKC</th>
              </tr>
            </thead>
            <tbody v-if="cards.length">
              <tr v-for="(card, index) in cards" :key="index">
                <td class="text-middle">
                  {{ card.label }}
                </td>
                <td class="text-middle text-success">
                  {{ card.price_label }}
                </td>
                <td class="text-middle text-warning">
                  {{ format_number(card.nomal) }}
                </td>
                <td class="text-middle text-warning">
                  {{ format_number(card.promotion_x2) }}
                </td>
                <td class="text-middle text-warning">
                  {{ format_number(card.promotion_gold) }}
                </td>

                <td class="text-middle text-warning">
                  {{ format_number(card.promotion_x3) }}
                </td>
                <td class="text-middle text-warning">
                  {{ format_number(card.promotion_diamond) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

