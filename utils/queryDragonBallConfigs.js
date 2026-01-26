export const queryDragonBallConfigs = (state) => [
  {
    key: "code",
    type: "simple",
    routeType: "number",
    value: () => state.code,
  },
  {
    key: "username",
    type: "simple",
    routeType: "string",
    value: () => state.username,
  },
  {
    key: "server",
    type: "simple",
    routeType: "number",
    max: 9,
    value: () => state.server
  },
    {
    key: "class",
    type: "simple",
    routeType: "number",
    max: 3,
    value: () => state.accountClass
  },
  {
    key: "cash",
    type: "range",
    routeType: "range",
    value: () => state.cash,
  },
  {
    key: "page",
    type: "page",
    routeType: "page",
    value: () => state.page,
  },
];
