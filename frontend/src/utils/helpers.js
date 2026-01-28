export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const formatDateShort = (dateString) => {
  if (!dateString) return 'N/A';

  return new Date(dateString).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const truncateId = (id, length = 8) => {
  if (!id) return 'N/A';
  return id.length > length ? `${id.substring(0, length)}...` : id;
};

export const getFraudRiskLevel = (score) => {
  if (score < 25) return { level: 'Low', color: 'green', bg: 'bg-green-100', text: 'text-green-800' };
  if (score < 50) return { level: 'Medium', color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-800' };
  if (score < 75) return { level: 'High', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-800' };
  return { level: 'Critical', color: 'red', bg: 'bg-red-100', text: 'text-red-800' };
};

export const calculateStats = (transactions) => {
  const total = transactions.length;
  const success = transactions.filter(t => t.status === 'SUCCESS').length;
  const failed = transactions.filter(t => t.status === 'FAILED').length;
  const processing = transactions.filter(t => t.status === 'PROCESSING').length;
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const avgAmount = total > 0 ? totalAmount / total : 0;

  return {
    total,
    success,
    failed,
    processing,
    totalAmount,
    avgAmount,
    successRate: total > 0 ? ((success / total) * 100).toFixed(1) : 0,
    failureRate: total > 0 ? ((failed / total) * 100).toFixed(1) : 0
  };
};

export const getStatusColor = (status) => {
  const colors = {
    SUCCESS: 'text-green-600',
    FAILED: 'text-red-600',
    PROCESSING: 'text-yellow-600',
    MANUAL_TEST: 'text-purple-600'
  };
  return colors[status] || 'text-gray-600';
};

export const getStatusBadgeColor = (status) => {
  const colors = {
    SUCCESS: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    PROCESSING: 'bg-yellow-100 text-yellow-800',
    MANUAL_TEST: 'bg-purple-100 text-purple-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateIPAddress = (ip) => {
  const re = /^(\d{1,3}\.){3}\d{1,3}$/;
  return re.test(ip);
};

export const sortByDate = (array, key = 'timestamp', order = 'desc') => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};