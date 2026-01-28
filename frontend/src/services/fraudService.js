import api from './api';

export const fraudService = {
  getAlerts: async () => {
    const response = await api.get('/fraud/alerts');
    return response.data;
  },

  getScore: async (id) => {
    const response = await api.get(`/fraud/score/${id}`);
    return response.data;
  },

  resolve: async (id, note) => {
    const response = await api.put(`/fraud/resolve/${id}`, null, {
      params: { note }
    });
    return response.data;
  },

  downloadPdf: async (id) => {
    const response = await api.get(`/fraud/download/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  manualTest: async (transactionData) => {
    const response = await api.post('/fraud/manual-test', transactionData);
    return response.data;
  }
};