import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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