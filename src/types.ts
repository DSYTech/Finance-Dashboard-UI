export type TransactionType = 'income' | 'expense';
export type UserRole = 'viewer' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface DashboardState {
  transactions: Transaction[];
  selectedRole: UserRole;
  filters: {
    category?: string;
    type?: TransactionType;
    startDate?: string;
    endDate?: string;
  };
  searchQuery: string;
  darkMode: boolean;
}

export interface Insights {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  highestCategory: { category: string; amount: number } | null;
  monthlyComparison: { month: string; amount: number }[];
  topCategories: { category: string; amount: number }[];
}
