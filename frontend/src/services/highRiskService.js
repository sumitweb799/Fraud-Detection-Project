import api from './api';

export const highRiskService = {
  getAll: async () => {
    const response = await api.get('/high-risk/all');
    return response.data;
  },

  add: async (accountNumber, reason) => {
    const response = await api.post('/high-risk/add', { accountNumber, reason });
    return response.data;
  },

  remove: async (accountNumber) => {
    const response = await api.delete(`/high-risk/remove/${accountNumber}`);
    return response.data;
  },

  isHighRisk: async (accountNumber) => {
    try {
      const accounts = await this.getAll();
      return accounts.some(acc => acc.accountNumber === accountNumber);
    } catch (error) {
      console.error('Error checking high risk status:', error);
      return false;
    }
  }
};