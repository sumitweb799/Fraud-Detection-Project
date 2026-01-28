import api from './api';

export const transactionService = {
  getAll: async () => {
    const response = await api.get('/transactions/all');
    return response.data;
  },

  getByStatus: async (status) => {
    const response = await api.get(`/transactions/status/${status.toLowerCase()}`);
    return response.data;
  },

  generate: async (count = 1) => {
    const endpoint = count === 1
      ? '/transactions/generate'
      : `/transactions/generate/${count}`;
    const response = await api.post(endpoint);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  }
};
