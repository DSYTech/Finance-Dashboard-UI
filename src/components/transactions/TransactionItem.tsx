import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';

interface TransactionItemProps {
  transaction: Transaction;
  onUpdate: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  canEdit: boolean;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onUpdate,
  onDelete,
  canEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(transaction);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  if (isEditing && canEdit) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="date"
          value={editData.date}
          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        />
        <input
          type="text"
          value={editData.category}
          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          placeholder="Category"
        />
        <input
          type="number"
          value={editData.amount}
          onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          placeholder="Amount"
        />
        <input
          type="text"
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          placeholder="Description"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                transaction.type === 'income'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
              }`}
            >
              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">{transaction.category}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{transaction.description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">{formatDate(transaction.date)}</p>
        </div>
        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4 sm:gap-2">
          <p
            className={`text-lg font-bold ${
              transaction.type === 'income'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </p>
          {canEdit && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
