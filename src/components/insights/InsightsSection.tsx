import React from 'react';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { Insights } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface InsightsProps {
  insights: Insights;
}

export const InsightsSection: React.FC<InsightsProps> = ({ insights }) => {
  const savingRate =
    insights.totalIncome > 0
      ? ((insights.totalIncome - insights.totalExpenses) / insights.totalIncome * 100).toFixed(1)
      : '0';

  const averageTransaction =
    insights.totalExpenses > 0
      ? (insights.totalExpenses / 10).toFixed(2)
      : '0';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={20} className="text-yellow-600 dark:text-yellow-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highest Spending Category */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Highest Spending Category</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {insights.highestCategory?.category || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {insights.highestCategory
              ? `${formatCurrency(insights.highestCategory.amount)} spent`
              : 'No data'}
          </p>
        </div>

        {/* Saving Rate */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Saving Rate</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{savingRate}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {savingRate === '0' ? 'No savings' : `You're saving well!`}
          </p>
        </div>

        {/* Average Transaction */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Average Expense</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(parseFloat(averageTransaction))}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Per transaction</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <TrendingUp size={20} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-2">Recommendations</p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {insights.highestCategory ? (
                <li>
                  • Consider reducing spending on{' '}
                  <span className="font-medium">{insights.highestCategory.category}</span> to increase
                  savings.
                </li>
              ) : null}
              {parseFloat(savingRate) < 20 && (
                <li>• Aim for a 20% or higher saving rate to build financial security.</li>
              )}
              <li>• Review monthly trends to identify patterns and adjust your budget accordingly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
