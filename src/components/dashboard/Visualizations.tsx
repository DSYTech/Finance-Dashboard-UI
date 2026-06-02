import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';
import { Insights } from '../../types';

interface VisualizationsProps {
  insights: Insights;
}

export const Visualizations: React.FC<VisualizationsProps> = ({ insights }) => {
  const maxAmount = Math.max(
    ...insights.monthlyComparison.map(m => Math.abs(m.amount))
  ) || 1;

  const maxSpending = Math.max(
    ...insights.topCategories.map(c => c.amount)
  ) || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Balance Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={20} className="text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Balance Trend (6 Months)</h3>
        </div>
        <div className="space-y-4">
          {insights.monthlyComparison.map((month, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">{month.month}</span>
              <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    month.amount >= 0
                      ? 'bg-green-500 dark:bg-green-600'
                      : 'bg-red-500 dark:bg-red-600'
                  }`}
                  style={{
                    width: `${(Math.abs(month.amount) / maxAmount) * 100}%`,
                  }}
                />
              </div>
              <span className={`text-sm font-semibold w-16 text-right ${
                month.amount >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {month.amount >= 0 ? '+' : ''}{month.amount.toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <PieChart size={20} className="text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Spending Categories</h3>
        </div>
        <div className="space-y-4">
          {insights.topCategories.map((category, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-28 truncate">{category.category}</span>
              <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 dark:bg-purple-600 rounded-full transition-all"
                  style={{
                    width: `${(category.amount / maxSpending) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-16 text-right">
                ${category.amount.toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
