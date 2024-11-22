'use client'

import BudgetSummary from "./components/Budget/BudgetSummary"
import CategoryForm from "./components/Budget/CategoryForm"
import CategoryList from "./components/Budget/CategoryList"
import ExpenseChart from "./components/Charts/ExpenseChart"
import TransactionForm from "./components/Transactions/TransactionForm"
import TransactionList from "./components/Transactions/TransactionList"


export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <BudgetSummary />
        </div>

        <CategoryForm />
        <CategoryList />

        <TransactionForm />
        <TransactionList />

        <div className="lg:col-span-2">
          <ExpenseChart />
        </div>
      </div>
    </div>
  )
}