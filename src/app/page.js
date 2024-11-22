'use client'

import BudgetSummary from "./components/Budget/BudgetSummary"
import CategoryForm from "./components/Budget/CategoryForm"
import ExpenseChart from "./components/Charts/ExpenseChart"
import TransactionForm from "./components/Transactions/TransactionForm"


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Kişisel Bütçe Takip
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <BudgetSummary />
        </div>
        <CategoryForm />
        <TransactionForm />
        <div>
          <ExpenseChart />
        </div>
      </div>
    </main>
  )
}