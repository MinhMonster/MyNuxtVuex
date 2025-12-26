export const queryAvatarConfigs = (state) => [
  {
    key: "id",
    type: "simple",
    routeType: "number",
    value: () => state.id,
  },
  {
    key: "username",
    type: "simple",
    routeType: "string",
    value: () => state.username,
  },
  {
    key: "sex",
    type: "simple",
    routeType: "string",
    value: () => state.sex,
  },
  {
    key: "cash",
    type: "range",
    routeType: "range",
    value: () => state.cash,
  },
  {
    key: "farm",
    type: "range",
    routeType: "range",
    value: () => state.farm,
  },
  {
    key: "page",
    type: "page",
    routeType: "page",
    value: () => state.page,
  },
];
