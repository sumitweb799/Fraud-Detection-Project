import { useState, useEffect, useCallback } from 'react';
import { highRiskService } from '../services/highRiskService';

export const useHighRiskAccounts = (autoFetch = true) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await highRiskService.getAll();
      setAccounts(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch accounts');
      console.error('Error fetching accounts:', err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = useCallback(async (accountNumber, reason) => {
    try {
      await highRiskService.add(accountNumber, reason);
      await fetchAccounts();
    } catch (err) {
      setError(err.message || 'Failed to add account');
      console.error('Error adding account:', err);
      throw err;
    }
  }, [fetchAccounts]);

  const removeAccount = useCallback(async (accountNumber) => {
    try {
      await highRiskService.remove(accountNumber);
      await fetchAccounts();
    } catch (err) {
      setError(err.message || 'Failed to remove account');
      console.error('Error removing account:', err);
      throw err;
    }
  }, [fetchAccounts]);

  useEffect(() => {
    if (autoFetch) {
      fetchAccounts();
    }
  }, [autoFetch, fetchAccounts]);

  return {
    accounts,
    loading,
    error,
    refresh: fetchAccounts,
    addAccount,
    removeAccount
  };
};
