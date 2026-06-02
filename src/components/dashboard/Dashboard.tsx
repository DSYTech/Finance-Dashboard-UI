import React, { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { calculateInsights, filterTransactions, sortTransactions } from '../../utils/helpers';
import { SummaryCards } from './SummaryCards';
import { Visualizations } from './Visualizations';
import { TransactionFilters } from '../transactions/TransactionFilters';
import { TransactionItem } from '../transactions/TransactionItem';
import { AddTransaction } from '../transactions/AddTransaction';
import { InsightsSection } from '../insights/InsightsSection';

export const Dashboard: React.FC = () => {
  const { state, addTransaction, updateTransaction, deleteTransaction, setFilter, setSearchQuery, clearFilters } = useDashboard();
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc'>('date-desc');

  const canEdit = state.selectedRole === 'admin';

  const insights = useMemo(() => calculateInsights(state.transactions), [state.transactions]);

  const filteredTransactions = useMemo(() => {
    const filtered = filterTransactions(state.transactions, state.filters, state.searchQuery);
    return sortTransactions(filtered, sortBy);
  }, [state.transactions, state.filters, state.searchQuery, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <SummaryCards insights={insights} />

      {/* Visualizations */}
      <Visualizations insights={insights} />

      {/* Insights */}
      <div className="mb-8">
        <InsightsSection insights={insights} />
      </div>

      {/* Transactions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transactions</h2>
          {canEdit && <AddTransaction onAdd={addTransaction} />}
        </div>

        {/* Filters */}
        <TransactionFilters
          filters={state.filters}
          searchQuery={state.searchQuery}
          sortBy={sortBy}
          onFilterChange={setFilter}
          onSearchChange={setSearchQuery}
          onSortChange={(sort) => setSortBy(sort as any)}
          onClear={clearFilters}
        />

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onUpdate={(updated) => updateTransaction(transaction.id, updated)}
                onDelete={deleteTransaction}
                canEdit={canEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No transactions found.</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              {state.searchQuery || Object.keys(state.filters).length > 0
                ? 'Try adjusting your filters or search query.'
                : 'Add your first transaction to get started.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
