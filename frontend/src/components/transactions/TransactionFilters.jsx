import React from 'react';
import { Search, Grid, List } from 'lucide-react';

const TransactionFilters = ({ 
  search, 
  setSearch, 
  filter, 
  setFilter,
  viewMode,
  setViewMode,
  count 
}) => {
  const filters = [
    { value: 'ALL', label: 'All', color: 'bg-gray-600' },
    { value: 'SUCCESS', label: 'Success', color: 'bg-green-600' },
    { value: 'FAILED', label: 'Failed', color: 'bg-red-600' },
    { value: 'PROCESSING', label: 'Processing', color: 'bg-yellow-600' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, sender, or receiver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`
                px-4 py-2 rounded-lg font-medium transition shadow-sm
                ${filter === f.value
                  ? `${f.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 bg-white rounded-lg p-1">
          <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded ${
              viewMode === 'card' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Card View"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${
              viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Table View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-3 text-sm text-gray-600">
        Showing <span className="font-semibold">{count}</span> transactions
      </div>
    </div>
  );
};

export default TransactionFilters;