# Architecture Overview

## Overview

This Financial Dashboard is built as a modern Single Page Application (SPA) using React with TypeScript, emphasizing clean code architecture, maintainability, and scalability.

## Design Principles

1. **Component-Based Architecture**: Each feature is encapsulated in reusable components
2. **Separation of Concerns**: Logic, presentation, and state management are clearly separated
3. **Type Safety**: Full TypeScript coverage for better development experience and fewer runtime errors
4. **Context-Based State Management**: Using React Context for global state instead of Redux for simplicity
5. **Responsive Design**: Mobile-first approach using Tailwind CSS
6. **Data Persistence**: localStorage for offline capability and automatic state recovery

## Directory Structure

```
src/
├── components/           # UI Components organized by feature
│   ├── dashboard/       # Dashboard-related components
│   ├── transactions/    # Transaction management components
│   ├── insights/        # Insights display components
│   └── layout/          # Layout and navigation components
├── context/             # React Context for state management
├── utils/               # Helper functions and utilities
├── types.ts             # Central TypeScript type definitions
├── App.tsx              # Root component
└── main.tsx             # Application entry point
```

## Component Hierarchy

```
App
├── DashboardProvider (Context)
└── AppContent
    ├── Header
    └── Dashboard
        ├── SummaryCards
        ├── Visualizations
        │   ├── Balance Trend Chart
        │   └── Spending Breakdown Chart
        ├── InsightsSection
        └── Transactions Section
            ├── AddTransaction Modal
            ├── TransactionFilters
            └── TransactionItem (List)
```

## State Management

### Global State (Context)

The `DashboardContext` manages:

```typescript
interface DashboardState {
  transactions: Transaction[];
  selectedRole: UserRole;
  filters: FilterState;
  searchQuery: string;
  darkMode: boolean;
}
```

**Key Functions:**
- `addTransaction()`: Add new transaction
- `updateTransaction()`: Modify existing transaction
- `deleteTransaction()`: Remove transaction
- `setRole()`: Switch between Viewer/Admin
- `setFilter()`: Update active filters
- `clearFilters()`: Reset all filters
- `setSearchQuery()`: Update search text
- `toggleDarkMode()`: Toggle dark theme

**Persistence:**
- All state changes are automatically saved to localStorage
- State is restored from localStorage on app load

## Data Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
Context Update Function
    ↓
State Mutation
    ↓
localStorage Save
    ↓
Component Re-render
```

## Key Features Implementation

### 1. Role-Based Access Control

**Implementation:**
- `selectedRole` in state tracks current role
- Components check `canEdit` boolean based on role
- `onDashboard.tsx`: Restricts Add/Edit/Delete to Admin role

### 2. Filtering & Searching

**Process:**
1. User inputs search query or selects filters
2. `setSearchQuery()` or `setFilter()` called
3. `filterTransactions()` applies filters
4. `sortTransactions()` applies sorting
5. Filtered list re-renders

**Filters Supported:**
- Category
- Transaction Type (Income/Expense)
- Date Range (via startDate/endDate)
- Text Search (description/category)

### 3. Insights Calculation

**Function:** `calculateInsights(transactions)`

**Calculates:**
- Total income and expenses
- Current balance
- Highest spending category
- Monthly comparison data
- Top spending categories
- Saving rate
- Average transaction

### 4. Dark Mode

**Implementation:**
- `darkMode` boolean in state
- Tailwind CSS `dark:` classes used throughout
- CSS class `dark` applied to html element when enabled
- Preference persisted to localStorage

## Component Communication

```
Parent Component
    ↓
    ├─→ Context Hook (useDashboard)
    │   ↓
    │   └─→ Update State
    ├─→ Props Passed Down
    │   ↓
    │   └─→ Child Component
    │       ↓
    │       └─→ Event Handler
    │           ↓
    │           └─→ Callback Function (via Props)
    │               ↓
    │               └─→ Context Update
```

## Utility Functions

Located in `src/utils/helpers.ts`:

- `calculateInsights()`: Financial data analysis
- `filterTransactions()`: Filter logic
- `sortTransactions()`: Sort logic
- `formatCurrency()`: Currency formatting
- `formatDate()`: Date formatting

## Type Definitions

All TypeScript interfaces are centralized in `src/types.ts`:

```typescript
interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

interface Insights {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  highestCategory: { category: string; amount: number } | null;
  monthlyComparison: { month: string; amount: number }[];
  topCategories: { category: string; amount: number }[];
}
```

## Performance Considerations

### Optimizations Implemented:

1. **useMemo Hooks**: Memoized calculations to prevent unnecessary recalculations
2. **Component Memoization**: Pure components to optimize re-renders
3. **Efficient Filtering**: Single-pass filter operations
4. **Lazy State Updates**: Only recompute when dependencies change

### Example:
```typescript
const insights = useMemo(() => 
  calculateInsights(state.transactions), 
  [state.transactions]
);
```

## Styling Architecture

### Tailwind CSS Approach:

1. **Utility-First**: Using Tailwind's utility classes directly in JSX
2. **Dark Mode**: Built-in dark mode support with `dark:` prefix
3. **Responsive**: Breakpoints (sm, md, lg) for responsive design
4. **Color System**: Consistent color palette across the app

### Example:
```jsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
  Content
</div>
```

## Error Handling

### Current Implementation:
- Input validation before adding transactions
- Type safety with TypeScript
- Graceful empty state handling
- Try-catch in critical operations (planned)

### Future Improvements:
- Error boundaries
- User-friendly error messages
- Transaction rollback mechanism

## Testing Strategy

### Unit Testing (Recommended):
- Utility functions in `helpers.ts`
- Type validation
- Filter/sort logic

### Integration Testing (Recommended):
- Context API behavior
- State updates and persistence
- Component interactions

### E2E Testing (Recommended):
- User workflows
- Add/Edit/Delete operations
- Filter functionality

## Scalability Considerations

### Ready for Scaling:
- ✅ Modular component structure
- ✅ Centralized state management
- ✅ Type-safe codebase
- ✅ Utility functions extraction

### Future Improvements:
- Redux for more complex state
- API integration for backend
- Advanced caching strategies
- Virtual scrolling for large lists
- Code splitting for large bundles

## Browser Compatibility

- Chrome: v90+
- Firefox: v88+
- Safari: v14+
- Edge: v90+

## Security Considerations

### Current:
- No sensitive data in localStorage (amounts only)
- Type validation prevents invalid data
- Input sanitization through React (XSS prevention)

### Recommendations:
- Implement authentication
- Use HTTPS for API calls
- Validate data on backend
- Implement CSRF protection

---

**Last Updated**: April 2026
