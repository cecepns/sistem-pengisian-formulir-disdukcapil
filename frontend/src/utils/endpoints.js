export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
  },
  TEMPLATES: {
    LIST: "/templates",
    DETAIL: (slug) => `/templates/${slug}`,
  },
  REGIONS: {
    PROVINCES: "/regions/provinces",
    CITIES: (provinceId) => `/regions/cities/${provinceId}`,
    DISTRICTS: (cityId) => `/regions/districts/${cityId}`,
    VILLAGES: (districtId) => `/regions/villages/${districtId}`,
  },
  SUBMISSIONS: {
    CREATE: "/submissions",
    TRACK: (tracking_number) => `/submissions/track/${tracking_number}`,
    LIST_ADMIN: "/submissions", // GET with pagination
    DETAIL: (id) => `/submissions/${id}`,
    UPDATE: (id) => `/submissions/${id}`,
    UPDATE_STATUS: (id) => `/submissions/${id}/status`,
    DELETE: (id) => `/submissions/${id}`,
  },
  DASHBOARD: {
    STATS: "/dashboard/stats"
  }
};
