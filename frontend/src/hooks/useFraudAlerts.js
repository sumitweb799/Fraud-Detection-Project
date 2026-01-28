import { useState, useEffect, useCallback } from 'react';
import { fraudService } from '../services/fraudService';

export const useFraudAlerts = (autoFetch = true) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fraudService.getAlerts();
      setAlerts(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch alerts');
      console.error('Error fetching alerts:', err);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const resolveAlert = useCallback(async (id, note) => {
    try {
      await fraudService.resolve(id, note);
      await fetchAlerts();
    } catch (err) {
      setError(err.message || 'Failed to resolve alert');
      console.error('Error resolving alert:', err);
      throw err;
    }
  }, [fetchAlerts]);

  const downloadPdf = useCallback(async (id) => {
    try {
      const blob = await fraudService.downloadPdf(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transaction_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message || 'Failed to download PDF');
      console.error('Error downloading PDF:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchAlerts();
    }
  }, [autoFetch, fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    refresh: fetchAlerts,
    resolveAlert,
    downloadPdf
  };
};
