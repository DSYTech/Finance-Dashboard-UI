import React from 'react';
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { Insights } from '../../types';

interface SummaryCardsProps {
  insights: Insights;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Balance</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {formatCurrency(insights.balance)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${insights.balance >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <TrendingUp className={insights.balance >= 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'} size={24} />
          </div>
        </div>
      </div>

      {/* Total Income */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Income</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {formatCurrency(insights.totalIncome)}
            </p>
          </div>
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <ArrowDownLeft className="text-green-600 dark:text-green-300" size={24} />
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              {formatCurrency(insights.totalExpenses)}
            </p>
          </div>
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
            <ArrowUpRight className="text-red-600 dark:text-red-300" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
