'use client'

import { useBudget } from "@/app/context/BudgetContext"
import { Card } from "../UI/Card";

export default function BudgetSummary() {

    const { budget } = useBudget();

    const totalIncome = budget.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = budget.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-100">
                <h3 className="text-lg font-semibold text-green-800">Toplam Gelir</h3>
                <p className="text-2xl font-bold text-green-600">
                    {totalIncome.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </p>
            </Card>

            <Card className="bg-red-100">
                <h3 className="text-lg font-semibold text-red-800">Toplam Gider</h3>
                <p className="text-2xl font-bold text-red-600">
                    {totalExpense.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </p>
            </Card>

            <Card className={balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}>
                <h3 className="text-lg font-semibold text-gray-800">Kalan Bakiye</h3>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    {balance.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </p>
            </Card>
        </div>
    )
}