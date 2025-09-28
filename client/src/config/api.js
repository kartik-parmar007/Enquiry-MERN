// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'https://enquiry-mern-1.onrender.com'
  },
  production: {
    baseURL: 'https://enquiry-mern-1.onrender.com'
  }
};

// Determine current environment
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// Export the base URL
export const API_BASE_URL = API_CONFIG[environment].baseURL;

// API endpoints
export const API_ENDPOINTS = {
  enquiries: {
    list: `${API_BASE_URL}/api/enquiries/list`,
    insert: `${API_BASE_URL}/api/enquiries/insert`,
    update: (id) => `${API_BASE_URL}/api/enquiries/update/${id}`,
    delete: (id) => `${API_BASE_URL}/api/enquiries/delete/${id}`
  }
};