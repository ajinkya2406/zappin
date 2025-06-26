import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const orderService = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get orders by status
  getOrdersByStatus: async (status) => {
    try {
      const response = await api.get(`/orders/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Assign delivery boy
  assignDeliveryBoy: async (orderId, deliveryBoy) => {
    try {
      const response = await api.patch(`/orders/${orderId}/assign`, { deliveryBoy });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async (formData) => {
    try {
      const response = await api.post('/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (id, formData) => {
    try {
      const response = await api.put(`/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const outletService = {
  // Outlet Locations
  createOutletLocation: async (data) => {
    return api.post('/outlets/locations', data);
  },
  getOutletLocations: async () => {
    return api.get('/outlets/locations');
  },

  // Pincode Assignments
  createPincodeAssignment: async (data) => {
    return api.post('/outlets/pincodes', data);
  },
  getPincodeAssignments: async () => {
    return api.get('/outlets/pincodes');
  },
  deletePincodeAssignment: async (id) => {
    return api.delete(`/outlets/pincodes/${id}`);
  },
};

export const subCategoryService = {
  createSubCategory: async (formData) => {
    return api.post('/sub-categories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getSubCategories: async () => {
    return api.get('/sub-categories');
  },
  updateSubCategory: async (id, formData) => {
    return api.put(`/sub-categories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteSubCategory: async (id) => {
    return api.delete(`/sub-categories/${id}`);
  },
};

export const productService = {
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
};

export const settingsService = {
  getSettings: async () => {
    return api.get('/settings');
  },
  updateSettings: async (settingsData) => {
    return api.post('/settings', settingsData);
  },
};

export const offerService = {
  getAllOffers: async () => {
    try {
      const response = await api.get('/offers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createOffer: async (formData) => {
    try {
      const response = await api.post('/offers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOffer: async (id, formData) => {
    try {
      const response = await api.put(`/offers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteOffer: async (id) => {
    try {
      const response = await api.delete(`/offers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const expenseService = {
  addExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },
  getExpenses: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },
};

export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
}; 