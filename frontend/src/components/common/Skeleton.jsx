import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl p-6 shadow-md animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 mb-3">
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
      </div>
    ))}
  </div>
);

export const SkeletonStat = () => (
  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-6 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
  </div>
);