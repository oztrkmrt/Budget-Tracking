'use client'

import { useBudget } from "@/app/context/BudgetContext"
import Link from "next/link";


export default function Header() {

    const { budget } = useBudget();

    const totalIncome = budget.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = budget.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                        Bütçe Takip
                    </Link>

                    <div className="flex items-center space-x-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Toplam Gelir</p>
                            <p className="font-semibold text-green-600">
                                {totalIncome.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                })}
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">Toplam Gider</p>
                            <p className="font-semibold text-red-600">
                                {totalExpense.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                })}
                            </p>
                        </div>

                        <div className="text-center border-l pl-6">
                            <p className="text-sm text-gray-600">Bakiye</p>
                            <p className={`font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {balance.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}