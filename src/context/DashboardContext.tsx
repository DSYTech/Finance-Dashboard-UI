import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Transaction, UserRole, DashboardState } from '../types';

interface DashboardContextType {
  state: DashboardState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: UserRole) => void;
  setFilter: (filter: Partial<DashboardState['filters']>) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const STORAGE_KEY = 'fintech_dashboard_state';

// Mock initial data
const getMockTransactions = (): Transaction[] => [
  {
    id: '1',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 3500,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary'
  },
  {
    id: '2',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 1200,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly rent'
  },
  {
    id: '3',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 150,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly grocery shopping'
  },
  {
    id: '4',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 50,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets'
  },
  {
    id: '5',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 800,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity and water'
  },
  {
    id: '6',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 2000,
    category: 'Freelance',
    type: 'income',
    description: 'Project completion bonus'
  },
  {
    id: '7',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 200,
    category: 'Transportation',
    type: 'expense',
    description: 'Gas and maintenance'
  },
  {
    id: '8',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 300,
    category: 'Dining',
    type: 'expense',
    description: 'Restaurants and cafes'
  },
  {
    id: '9',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 100,
    category: 'Shopping',
    type: 'expense',
    description: 'Clothing and accessories'
  },
  {
    id: '10',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 5000,
    category: 'Investment',
    type: 'income',
    description: 'Investment returns'
  },
];

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DashboardState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      transactions: getMockTransactions(),
      selectedRole: 'viewer' as UserRole,
      filters: {},
      searchQuery: '',
      darkMode: false,
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      transactions: [
        ...prevState.transactions,
        {
          ...transaction,
          id: Date.now().toString(),
        }
      ]
    }));
  }, []);

  const updateTransaction = useCallback((id: string, transaction: Omit<Transaction, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      transactions: prevState.transactions.map(t =>
        t.id === id ? { ...transaction, id } : t
      )
    }));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setState(prevState => ({
      ...prevState,
      transactions: prevState.transactions.filter(t => t.id !== id)
    }));
  }, []);

  const setRole = useCallback((role: UserRole) => {
    setState(prevState => ({
      ...prevState,
      selectedRole: role
    }));
  }, []);

  const setFilter = useCallback((filter: Partial<DashboardState['filters']>) => {
    setState(prevState => ({
      ...prevState,
      filters: { ...prevState.filters, ...filter }
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      filters: {},
      searchQuery: ''
    }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState(prevState => ({
      ...prevState,
      searchQuery: query
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      darkMode: !prevState.darkMode
    }));
  }, []);

  const value: DashboardContextType = {
    state,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setRole,
    setFilter,
    clearFilters,
    setSearchQuery,
    toggleDarkMode,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
