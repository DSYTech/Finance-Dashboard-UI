import React from 'react';
import { Search } from 'lucide-react';
import { DashboardState, TransactionType } from '../../types';

interface TransactionFiltersProps {
  filters: DashboardState['filters'];
  searchQuery: string;
  sortBy: 'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc';
  onFilterChange: (filters: Partial<DashboardState['filters']>) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  onClear: () => void;
}

const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Rent',
  'Utilities',
  'Groceries',
  'Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Education',
  'Other',
];

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  searchQuery,
  sortBy,
  onFilterChange,
  onSearchChange,
  onSortChange,
  onClear,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by description or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category Filter */}
          <div>
            <select
              value={filters.category || ''}
              onChange={(e) =>
                onFilterChange({
                  category: e.target.value || undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filters.type || ''}
              onChange={(e) =>
                onFilterChange({
                  type: (e.target.value as TransactionType) || undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm flex items-center gap-2"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>

          {/* Clear Button */}
          <button
            onClick={onClear}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};
