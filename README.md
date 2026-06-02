# Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS. Track your income, expenses, and financial insights with an intuitive and interactive interface.

## Features

### 1. Dashboard Overview

* **Summary Cards**: Display Total Balance, Total Income, and Total Expenses at a glance
* **Balance Trend Chart**: Visual representation of balance changes over the last 6 months
* **Spending Breakdown**: Pie-style visualization of top spending categories

### 2. Transactions Management

* **View Transactions**: Browse all transactions with date, amount, category, and type
* **Search Functionality**: Quickly find transactions by description or category
* **Advanced Filtering**:

  * Category
  * Transaction Type (Income/Expense)
* **Sorting Options**:

  * Date (Newest/Oldest First)
  * Amount (Highest/Lowest)

### 3. Role-Based Access Control

* **Viewer Role**: Read-only access to all data
* **Admin Role**: Full permissions including:

  * Add new transactions
  * Edit existing transactions
  * Delete transactions
* Toggle between roles using the dropdown in the header

### 4. Insights Section

* **Highest Spending Category**: Identifies where most money is spent
* **Saving Rate**: Calculates the percentage of income saved
* **Average Transaction**: Shows average expense per transaction
* **Smart Recommendations**: Personalized financial advice based on your data

### 5. User Experience Enhancements

* 🌙 **Dark Mode**: Toggle between light and dark themes
* 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
* 📂 **Empty State Handling**: Graceful messages when no data is available
* 💾 **Data Persistence**: Transactions and preferences saved to localStorage
* ✨ **Smooth Animations**: Subtle transitions and hover effects throughout the app

## Tech Stack

| Technology        | Description        |
| ----------------- | ------------------ |
| React 18          | Frontend Framework |
| TypeScript        | Type Safety        |
| Vite              | Build Tool         |
| Tailwind CSS      | Styling            |
| Lucide React      | Icons              |
| React Context API | State Management   |
| localStorage      | Data Persistence   |

## Installation

### Prerequisites

* Node.js (v16 or higher)
* npm (v7 or higher)

### Setup

#### 1. Navigate to the project directory

```bash
cd Fintech_Landing_Page
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the development server

```bash
npm run dev
```

The application will automatically open in your default browser at:

```text
http://localhost:3000
```

## Usage

### Adding a Transaction (Admin Only)

1. Switch to **Admin** role using the dropdown in the header.
2. Click the **Add Transaction** button.
3. Fill in:

   * Date
   * Type (Income or Expense)
   * Category
   * Amount
   * Description (Optional)
4. Click **Add** to save.

### Editing a Transaction (Admin Only)

1. Click the **Edit (Pencil)** icon.
2. Modify the transaction details.
3. Click the **Checkmark** to save or **X** to cancel.

### Deleting a Transaction (Admin Only)

1. Click the **Delete (Trash)** icon.
2. The transaction is removed instantly.

### Filtering Transactions

1. Use the search bar to find transactions.
2. Filter by category.
3. Filter by income or expense.
4. Sort by amount or date.
5. Click **Clear Filters** to reset.

### Toggling Dark Mode

1. Click the moon/sun icon in the header.
2. Your preference is automatically saved.

## Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── SummaryCards.tsx
│   │   └── Visualizations.tsx
│   ├── transactions/
│   │   ├── TransactionItem.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── AddTransaction.tsx
│   ├── insights/
│   │   └── InsightsSection.tsx
│   └── layout/
│       └── Header.tsx
├── context/
│   └── DashboardContext.tsx
├── utils/
│   └── helpers.ts
├── types.ts
├── App.tsx
├── main.tsx
├── index.css
└── App.css
```

## State Management

The application uses **React Context API** to manage:

* Transactions State
* Filters State
* Search Query
* User Role (Admin / Viewer)
* Dark Mode Preference

All state is persisted automatically using browser localStorage.

## Available Scripts

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## Mock Data

The project comes with sample financial data including:

* Salary income
* Freelance income
* Investment returns
* Rent expenses
* Grocery expenses
* Utility expenses
* Multi-month financial history

This allows immediate testing and exploration of all dashboard features.

## Browser Support

✅ Chrome (Latest)

✅ Firefox (Latest)

✅ Safari (Latest)

✅ Edge (Latest)

## Key Features Breakdown

### Responsive Design

* Mobile-first architecture
* Breakpoints:

  * sm (640px)
  * md (768px)
  * lg (1024px)
* Touch-friendly interface

### Accessibility

* Semantic HTML
* Proper label associations
* Keyboard navigation support
* Accessible color contrast

### Performance

* Memoized calculations using `useMemo`
* Optimized re-renders
* Efficient Context usage
* Lightweight dependency footprint

### Data Validation

* Transaction input validation
* Type-safe architecture with TypeScript
* Error handling for edge cases

## Future Enhancements

* Export transactions to CSV / JSON
* Monthly budget tracking
* Recurring transactions
* Multi-currency support
* Cloud backup & synchronization
* Advanced charts and analytics
* Custom transaction categories
* Spending alerts and notifications
* Investment portfolio tracking
* Bill reminders

## Troubleshooting

### Application Won't Start

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Styling Not Loading

* Ensure Tailwind CSS is configured correctly.
* Verify `tailwind.config.js` exists.
* Restart the development server.

### Dark Mode Not Working

* Clear browser cache.
* Ensure localStorage is enabled.
* Verify JavaScript is enabled.

## Performance Considerations

* Lazy loading for large transaction datasets
* Virtual scrolling for 1000+ records
* Backend API integration support
* Offline caching via localStorage

## License

This project is open source and available for educational and commercial use.

## Author

Created as a comprehensive financial dashboard application demonstrating modern React patterns, TypeScript best practices, and responsive UI development.

---

### Happy Tracking Your Finances! 💰📊
