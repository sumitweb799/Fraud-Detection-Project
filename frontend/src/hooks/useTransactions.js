import { useState, useEffect, useCallback } from 'react';
import { transactionService } from '../services/transactionService';

export const useTransactions = (autoFetch = true) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByStatus = useCallback(async (status) => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getByStatus(status);
      setTransactions(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions');
      console.error('Error fetching transactions by status:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateTransactions = useCallback(async (count = 1) => {
    try {
      await transactionService.generate(count);
      await fetchTransactions();
    } catch (err) {
      setError(err.message || 'Failed to generate transactions');
      console.error('Error generating transactions:', err);
      throw err;
    }
  }, [fetchTransactions]);

  useEffect(() => {
    if (autoFetch) {
      fetchTransactions();
    }
  }, [autoFetch, fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    refresh: fetchTransactions,
    fetchByStatus,
    generateTransactions
  };
};