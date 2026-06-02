# Features Documentation

## Detailed Feature Breakdown

### 1. Dashboard Overview

#### Summary Cards
The dashboard displays three key metrics in card format:

- **Total Balance**: Current financial balance (Income - Expenses)
  - Green if positive, red if negative
  - Icon changes based on status
  - Hover effect for interactivity

- **Total Income**: Sum of all income transactions
  - Green color scheme
  - Includes salary, freelance, investments, etc.

- **Total Expenses**: Sum of all expense transactions
  - Red color scheme
  - Calculated from all expense categories

**Implementation Details:**
- Located in `SummaryCards.tsx`
- Uses `Insights` data from context
- Responsive grid layout (1 col mobile, 3 cols desktop)
- Currency formatting with `formatCurrency()`

#### Balance Trend Chart
- **Type**: Horizontal bar chart
- **Data Range**: Last 6 months
- **Features**:
  - Color-coded: Green for positive, Red for negative
  - Tooltip showing exact amounts
  - Month labels on the left
  - Responsive sizing

**Implementation Details:**
- Located in `Visualizations.tsx`
- Uses CSS bars with dynamic widths
- Calculates percentage based on max amount
- Smooth transitions on hover

#### Spending Breakdown
- **Type**: Category-based spending distribution
- **Features**:
  - Top 5 spending categories
  - Bar representation with amounts
  - Category names and totals
  - Visual comparison

**Implementation Details:**
- Located in `Visualizations.tsx`
- Bar length proportional to amount
- Purple color scheme
- Responsive layout

### 2. Transactions Section

#### Transaction List
**Features:**
- Displays all transactions in chronological order
- Shows:
  - Transaction date
  - Amount (color-coded)
  - Category and type badge
  - Description
  - Edit/Delete buttons (Admin only)

**Item Structure:**
```
[Income/Expense Badge] Category Name
Description text
Date info
Amount     [Edit] [Delete]
```

#### Add Transaction (Admin Only)
**Modal Form with Fields:**
1. **Date**: Date picker with default current date
2. **Type**: Dropdown (Income/Expense)
3. **Category**: Dropdown with 13 predefined categories
   - Salary
   - Freelance
   - Investment
   - Rent
   - Utilities
   - Groceries
   - Dining
   - Transportation
   - Entertainment
   - Shopping
   - Healthcare
   - Education
   - Other
4. **Amount**: Number input (supports decimals)
5. **Description**: Text input (optional)

**Validation:**
- Amount and Category required
- Amount must be positive
- Default date is current date

#### Edit Transaction (Admin Only)
**Features:**
- Click edit icon to enter edit mode
- Inline editing of all fields
- Confirm with checkmark or cancel with X
- Immediate update to list

#### Delete Transaction (Admin Only)
**Features:**
- Click trash icon to delete
- Immediate removal from list
- No confirmation dialog (can be added)

### 3. Filtering & Searching

#### Search Bar
**Features:**
- Real-time search as you type
- Search across:
  - Transaction descriptions
  - Category names
- Case-insensitive matching
- Clear search with "Clear Filters" button

#### Category Filter
- Dropdown with all 13 categories
- Select "All Categories" to clear
- Combines with other filters

#### Type Filter
- Dropdown options:
  - All Types (default)
  - Income
  - Expense
- Single selection

#### Sort Options
- **Date Descending** (Newest First) - Default
- **Date Ascending** (Oldest First)
- **Amount Descending** (Highest First)
- **Amount Ascending** (Lowest First)

#### Clear Filters Button
- Resets all filters in one click
- Clears search query
- Returns to default view

**Technical Implementation:**
- Uses `filterTransactions()` utility
- Combines multiple filter criteria
- Re-renders list automatically
- Efficient single-pass filtering

### 4. Role-Based Access Control (RBAC)

#### Viewer Role (Default)
**Permissions:**
- ✅ View all transactions
- ✅ View dashboard and insights
- ✅ Search and filter transactions
- ✅ Switch to dark mode
- ❌ Cannot add transactions
- ❌ Cannot edit transactions
- ❌ Cannot delete transactions

**UI Changes:**
- "Add Transaction" button hidden
- Edit/Delete icons hidden from transactions
- All data displayed in read-only mode

#### Admin Role
**Permissions:**
- ✅ All Viewer permissions
- ✅ Add new transactions
- ✅ Edit existing transactions
- ✅ Delete transactions

**UI Changes:**
- "Add Transaction" button visible
- Edit/Delete icons shown on transactions
- Modal access for adding/editing

#### Role Switching
- Located in header as dropdown
- Instant role change (no page reload)
- Role stored in localStorage
- Change persists across sessions

**Implementation:**
```typescript
const canEdit = state.selectedRole === 'admin';
{canEdit && <AddTransaction onAdd={addTransaction} />}
```

### 5. Insights Section

#### Highest Spending Category
- Identifies the category with most spending
- Shows category name and total amount
- Updates automatically with data changes

#### Saving Rate
- Calculates: `(Income - Expenses) / Income * 100`
- Shows percentage
- Green background for positive savings
- Message: "You're saving well!" or "No savings"

#### Average Expense
- Calculated from total spending
- Shows average per transaction
- Helps identify spending patterns

#### Smart Recommendations
**Display:**
- Personalized advice based on data
- Up to 3 recommendations:
  1. Reduce spending in highest category
  2. Achieve 20% savings rate (if below 20%)
  3. Review monthly trends

**Logic:**
```typescript
if (insights.highestCategory) {
  // Recommend reducing spending in this category
}
if (parseFloat(savingRate) < 20) {
  // Recommend 20% saving rate
}
```

### 6. Dark Mode

#### Implementation
- Toggle button in header (Moon/Sun icon)
- Applies `dark` class to html element
- Tailwind CSS `dark:` classes used throughout

#### Coverage
- All components support dark mode
- Custom colors for dark theme:
  - Background: `dark:bg-gray-800`, `dark:bg-gray-900`
  - Text: `dark:text-white`, `dark:text-gray-300`
  - Borders: `dark:border-gray-700`

#### Persistence
- Preference saved to localStorage
- Automatically applied on page load

### 7. Data Persistence

#### localStorage Implementation
- **Key**: `fintech_dashboard_state`
- **Stored Data**:
  - All transactions
  - Filter settings
  - Search query
  - Selected role
  - Dark mode preference

#### Auto-Save
- Triggered on any state change
- Synchronous write (quick)
- No performance impact for typical usage

#### Auto-Load
- On app initialization
- Falls back to mock data if no saved state
- Zero data loss on page refresh

### 8. Responsive Design

#### Breakpoints
- **Mobile**: Default (<640px)
- **Tablet**: sm to md (640px - 768px)
- **Desktop**: lg and above (1024px+)

#### Responsive Elements

**Dashboard Cards:**
```
Mobile: 1 column
Tablet/Desktop: 3 columns
```

**Visualizations:**
```
Mobile: Stacked (1 column)
Tablet+: 2 columns
```

**Filters:**
```
Mobile: Full width, stacked
Tablet: 2 columns
Desktop: 4 columns
```

**Transaction Item:**
```
Mobile: Vertical layout
Desktop: Horizontal layout with proper alignment
```

#### Mobile Optimizations
- Touch-friendly button sizes (min 44x44px)
- Larger tap targets
- Simplified layouts
- Horizontal scrolling where needed
- Readable font sizes

### 9. Empty States

#### No Transactions
- Clear message: "No transactions found"
- Helpful hint with context:
  - If filters active: "Try adjusting your filters"
  - Otherwise: "Add your first transaction"
- Centered, readable layout

#### No Filtered Results
- Same message as above
- Suggests filter adjustment or adding data

### 10. Additional Features

#### Currency Formatting
- Formats numbers to USD currency
- Examples:
  - `1000` → `$1,000.00`
  - `1500.5` → `$1,500.50`
- Used in all monetary displays

#### Date Formatting
- Converts ISO dates to readable format
- Example: `2024-01-15` → `Jan 15, 2024`
- Consistent throughout the app

#### Type-Safe Transactions
- All transactions validated at creation
- Immutable transactions (new ones created, not modified in-place)
- ID generation using timestamp

---

## Feature Matrix

| Feature | Viewer | Admin | Desktop | Mobile | Dark |
|---------|--------|-------|---------|--------|------|
| View Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Transactions | ✅ | ✅ | ✅ | ✅ | ✅ |
| Search Transactions | ✅ | ✅ | ✅ | ✅ | ✅ |
| Filter Transactions | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Insights | ✅ | ✅ | ✅ | ✅ | ✅ |
| Add Transaction | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit Transaction | ❌ | ✅ | ✅ | ✅ | ✅ |
| Delete Transaction | ❌ | ✅ | ✅ | ✅ | ✅ |
| Toggle Dark Mode | ✅ | ✅ | ✅ | ✅ | ✅ |

---

**Last Updated**: April 2026
