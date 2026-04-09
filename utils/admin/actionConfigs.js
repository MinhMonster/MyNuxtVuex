import _ from 'lodash'

export const accountGameModalConfigs = () => _.cloneDeep({
  updateAccount: {
    store: { formItem: "formItemModal" },
  },
})

export const accountGameActions = () => _.cloneDeep([
  {
    type: "updateAccount",
    label: "Update Cash",
    icon: "mdi-lead-pencil",
    color: "blue",
    modal: true,
  },
  {
    type: "onDelete",
    label: "Delete",
    icon: "mdi-delete",
    color: "red",
    danger: true,
    condition: (row) => !row.deleted_at,
  },
  {
    type: "onRestore",
    method: "restore",
    label: "Restore",
    icon: "mdi-restore",
    color: "blue",
    condition: (row) => row.deleted_at,
  },
])
