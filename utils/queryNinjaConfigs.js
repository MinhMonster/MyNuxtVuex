export const queryFieldConfig = (state) => [
  {
    key: "code",
    type: "simple",
    routeType: "number",
    max: undefined,
    value: () => state.code
  },
  {
    key: "ingame",
    type: "simple",
    routeType: "string",
    value: () => state.ingame
  },
  {
    key: "class",
    type: "simple",
    routeType: "number",
    max: 6,
    value: () => state.classNinjas
  },
  {
    key: "server",
    type: "simple",
    routeType: "number",
    max: 9,
    value: () => state.server
  },
  {
    key: "level",
    type: "range",
    routeType: "range",
    maxAllowed: 160,
    value: () => state.level
  },
  {
    key: "cash",
    type: "range",
    routeType: "range",
    value: () => state.cash
  },
  {
    key: "family",
    type: "simple",
    routeType: "number",
    value: () => state.family
  },
  {
    key: "page",
    type: "page",
    routeType: "page",
    value: () => state.page
  }
];
