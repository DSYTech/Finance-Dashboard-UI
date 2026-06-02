import { Transaction, Insights } from '../types';

export const calculateInsights = (transactions: Transaction[]): Insights => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Find highest spending category
  const categoryTotals: { [key: string]: number } = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const topCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const highestCategory = topCategories.length > 0 ? topCategories[0] : null;

  // Monthly comparison
  const monthlyData: { [key: string]: number } = {};
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const amount = t.type === 'income' ? t.amount : -t.amount;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;
  });

  const monthlyComparison = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, amount]) => ({
      month: new Date(`${month}-01`).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      amount
    }));

  return {
    totalIncome,
    totalExpenses,
    balance,
    highestCategory,
    monthlyComparison,
    topCategories: topCategories.slice(0, 5),
  };
};

export const filterTransactions = (
  transactions: Transaction[],
  filters: {
    category?: string;
    type?: 'income' | 'expense';
    startDate?: string;
    endDate?: string;
  },
  searchQuery: string
): Transaction[] => {
  return transactions.filter(t => {
    if (filters.category && t.category !== filters.category) return false;
    if (filters.type && t.type !== filters.type) return false;
    if (filters.startDate && t.date < filters.startDate) return false;
    if (filters.endDate && t.date > filters.endDate) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }
    return true;
  });
};

export const sortTransactions = (
  transactions: Transaction[],
  sortBy: 'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc'
): Transaction[] => {
  const sorted = [...transactions];
  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'amount-asc':
      return sorted.sort((a, b) => a.amount - b.amount);
    case 'amount-desc':
      return sorted.sort((a, b) => b.amount - a.amount);
    default:
      return sorted;
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
