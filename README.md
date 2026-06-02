# Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS. Track your income, expenses, and financial insights with an intuitive and interactive interface.

## Features

### 1. **Dashboard Overview**
- **Summary Cards**: Display Total Balance, Total Income, and Total Expenses at a glance
- **Balance Trend Chart**: Visual representation of balance changes over the last 6 months
- **Spending Breakdown**: Pie-style visualization of top spending categories

### 2. **Transactions Management**
- **View Transactions**: Browse all transactions with date, amount, category, and type
- **Search Functionality**: Quickly find transactions by description or category
- **Advanced Filtering**: Filter by:
  - Category
  - Transaction Type (Income/Expense)
- **Sorting Options**: Sort by:
  - Date (Newest/Oldest First)
  - Amount (Highest/Lowest)

### 3. **Role-Based Access Control**
- **Viewer Role**: Read-only access to all data
- **Admin Role**: Full permissions including:
  - Add new transactions
  - Edit existing transactions
  - Delete transactions
- Toggle between roles using the dropdown in the header

### 4. **Insights Section**
- **Highest Spending Category**: Identifies where most money is spent
- **Saving Rate**: Calculates the percentage of income saved
- **Average Transaction**: Shows average expense per transaction
- **Smart Recommendations**: Personalized financial advice based on your data

### 5. **User Experience Enhancements**
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Empty State Handling**: Graceful messages when no data is available
- **Data Persistence**: Transactions and preferences saved to localStorage
- **Smooth Animations**: Subtle transitions and hover effects throughout the app

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: Browser localStorage

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Setup

1. **Clone the repository** (or extract the project files)
```bash
cd Fintech_Landing_Page
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:3000`

## Usage

### Adding a Transaction (Admin Only)
1. Switch to **Admin** role using the dropdown in the header
2. Click the **"Add Transaction"** button
3. Fill in the transaction details:
   - Date
   - Type (Income or Expense)
   - Category
   - Amount
   - Description (optional)
4. Click **"Add"** to save

### Editing a Transaction (Admin Only)
1. Click the **edit icon** (pencil) next to any transaction
2. Modify the transaction details inline
3. Click the **checkmark** to save or **X** to cancel

### Deleting a Transaction (Admin Only)
1. Click the **delete icon** (trash bin) next to any transaction
2. The transaction will be removed immediately

### Filtering Transactions
1. Use the **search bar** to find transactions by keyword
2. Use the **Category** dropdown to filter by spending category
3. Use the **Type** dropdown to show only Income or Expense
4. Use **Sort** dropdown to reorder transactions
5. Click **"Clear Filters"** to reset all filters

### Toggling Dark Mode
1. Click the **moon/sun icon** in the header to switch themes
2. Your preference is saved automatically

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.tsx           # Main dashboard component
│   │   ├── SummaryCards.tsx        # Summary cards display
│   │   └── Visualizations.tsx      # Charts and visualizations
│   ├── transactions/
│   │   ├── TransactionItem.tsx     # Individual transaction row
│   │   ├── TransactionFilters.tsx  # Filter and search controls
│   │   └── AddTransaction.tsx      # Add transaction modal
│   ├── insights/
│   │   └── InsightsSection.tsx     # Financial insights display
│   └── layout/
│       └── Header.tsx              # Navigation header
├── context/
│   └── DashboardContext.tsx        # Global state management with Context API
├── utils/
│   └── helpers.ts                  # Utility functions (calculations, formatting)
├── types.ts                        # TypeScript type definitions
├── App.tsx                         # Main app component
├── main.tsx                        # React entry point
├── index.css                       # Global styles
└── App.css                         # App-specific styles
```

## State Management

The application uses **React Context API** for state management, providing:

- **Transactions State**: Array of all transactions
- **Filters State**: Current active filters
- **Search Query**: Current search text
- **Selected Role**: Viewer or Admin
- **Dark Mode Toggle**: Theme preference

All state is automatically persisted to localStorage and restored on page reload.

## Available Scripts

### `npm run dev`
Starts the Vite development server with hot module replacement (HMR).

### `npm run build`
Builds the application for production. Output is in the `dist` folder.

### `npm run preview`
Previews the production build locally.

### `npm run lint`
Runs ESLint to check code quality.

## Mock Data

The application comes with pre-populated mock data including:
- Various income sources (Salary, Freelance, Investment)
- Multiple expense categories (Rent, Groceries, Utilities, etc.)
- Data spanning multiple months for trend visualization

This allows you to explore all features immediately. Feel free to add, edit, or delete transactions as needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Key Features Breakdown

### 1. **Responsive Design**
- Mobile-first approach
- Breakpoints for sm (640px), md (768px), lg (1024px)
- Touch-friendly interface on mobile devices

### 2. **Accessibility**
- Semantic HTML structure
- Proper label associations
- Color contrast compliance
- Keyboard navigation support

### 3. **Performance**
- Memoized calculations using `useMemo`
- Efficient re-renders with Context
- Optimized component structure
- No unnecessary dependencies

### 4. **Data Validation**
- Input validation for new transactions
- Type safety with TypeScript
- Error boundaries for edge cases

## Future Enhancements

Potential improvements for future versions:

- Export transactions to CSV/JSON
- Monthly budget tracking and alerts
- Recurring transactions support
- Multi-currency support
- Data backup and sync
- Advanced charts (pie charts, line graphs)
- Transaction categories customization
- Spending alerts and notifications
- Investment portfolio tracking
- Bill reminders

## Troubleshooting

### Application won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Styling not loading
- Ensure Tailwind CSS is properly configured
- Check that `tailwind.config.js` exists in the root directory
- Restart the dev server

### Dark mode not working
- Clear browser cache
- Check that localStorage is enabled
- Ensure JavaScript is enabled in the browser

## Performance Considerations

- **Lazy Loading**: Consider lazy loading for large transaction lists
- **Virtual Scrolling**: Could be implemented for lists with 1000+ items
- **API Integration**: Ready for backend API integration
- **Caching**: localStorage caching implemented for offline access

## License

This project is open source and available for educational and commercial use.

## Author

Created as a comprehensive financial dashboard application demonstrating modern React patterns and best practices.

---

**Happy tracking your finances! 💰**
#   F i n a n c e - D a s h b o a r d - U I  
 