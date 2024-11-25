'use client'

import { useBudget } from "@/app/context/BudgetContext"
import { useTheme } from "@/app/context/ThemeContext";
import Link from "next/link";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';


export default function Header() {

    const { budget } = useBudget();
    const { darkMode, toggleDarkMode } = useTheme();

    const totalIncome = budget.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = budget.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
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

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                            {darkMode ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </header>
    )
}