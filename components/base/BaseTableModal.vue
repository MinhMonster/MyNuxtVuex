<template>
  <BaseModal ref="modal" :title="title" size="md" :hiddenFooter="hiddenFooter">
    <template #content>
      <div class="page-body">
        <div>
          <table class="table text-center">
            <tbody>
              <tr
                v-for="(row, index) in itemInfos"
                :key="'row-' + index"
                v-show="!row.hidden"
              >
                <th class="info-nick">
                  {{ row.label }}
                </th>

                <td class="mua-nick">
                  <span v-if="row.type === 'number'">
                    {{ format_number(row.value) }}
                  </span>
                  <Status
                    v-else-if="row.type === 'status'"
                    :value="row.value"
                  />
                  <span v-else-if="row.html" v-html="row.value"></span>
                  <span v-else>
                    {{ row.value }}
                  </span>
                </td>
              </tr>
              <slot></slot>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import Status from "@/components/global/molecules/common/Status";

export default {
  name: "BaseTableModal",
  components: { Status },
  props: {
    title: {
      type: String,
      default: "Title",
    },
    hiddenFooter: Boolean,
    itemInfos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
  },
};
</script>
