<template>
  <client-only>
    <div class="page-body">
      <div class="page-info">
        <label><i class="mdi mdi-table"></i> Bảng giá xu Ninja School </label
        ><br />
        <small id="fileHelp" class="form-text text-muted text-warning"
          >Số xu nhận được sẽ phụ thuộc vào Server và giá tại thời điểm mua.</small
        >
        <div class="table-responsive">
          <table
            style="font-size: 14px"
            class="table table-striped table-border"
          >
            <thead>
              <tr>
                <th>Sv\Giá</th>
                <th>10K</th>
                <th>50k</th>
                <th>200k</th>
                <th>500k</th>
                <th>1000k</th>
              </tr>
            </thead>
            <tbody v-if="cards.length">
              <tr v-for="(card, index) in cards" :key="index">
                <td class="text-middle">
                  {{ card.name }}
                </td>
                <td class="text-middle text-success">
                  x{{ card.amount_10000 }}
                </td>
                <td class="text-middle text-warning">
                  x{{ format_number(card.amount_50000) }}
                </td>
                <td class="text-middle text-warning">
                  x{{ format_number(card.amount_200000) }}
                </td>
                <td class="text-middle text-warning">
                  x{{ format_number(card.amount_500000) }}
                </td>

                <td class="text-middle text-warning">
                  x{{ format_number(card.amount_1000000) }}
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

