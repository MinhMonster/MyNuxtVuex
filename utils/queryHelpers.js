export function getQueryObject(queryFieldConfig, $route) {
  const result = {};
  queryFieldConfig.forEach(field => {
    const key = field.key;
    const routeType = field.routeType;
    const maxAllowed = field.maxAllowed;

    if (routeType === "number") {
      let val = Number($route.query[key]) || null;
      if (field.max !== undefined && val > field.max) val = null;
      result[key] = val;
    } else if (routeType === "string") {
      result[key] = $route.query[key] || null;
    } else if (routeType === "range") {
      const min = Number($route.query[`${key}Min`]);
      const max = Number($route.query[`${key}Max`]);
      const range = {};
      if (!isNaN(min) && (!maxAllowed || min <= maxAllowed)) range.min = min;
      if (!isNaN(max) && (!maxAllowed || max <= maxAllowed)) range.max = max;
      result[key] = Object.keys(range).length ? range : null;
    } else if (routeType === "page") {
      result[key] = field.value();
    }
  });
  return result;
}

export function buildQueryString(queryFieldConfig) {
  return queryFieldConfig
    .map(field => {
      const key = field.key;
      const type = field.type;
      const value = field.value();

      if (value === undefined || value === null || value === "") return "";

      switch (type) {
        case "page":
          return Number(value) > 1 ? `${key}=${value}` : "";
        case "simple":
          return `&${key}=${value}`;
        case "range":
          let query = `&${key}Min=${value.min}`;
          if (value.max !== undefined && value.max !== null) query += `&${key}Max=${value.max}`;
          return query;
        default:
          return "";
      }
    })
    .join("");
}

export function cleanQuery(query) {
  const cleaned = {
    ...query,
    q: { ...query.q },
  };

  Object.keys(cleaned.q).forEach((key) => {
    const value = cleaned.q[key];
    if (value === null || value === undefined || value === "") {
      delete cleaned.q[key];
    }
  });

  return cleaned;
}
