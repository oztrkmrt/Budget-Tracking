'use client'

import { useBudget } from "@/app/context/BudgetContext";
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useState } from "react";
import EditTransactionModal from "./EditTransactionModal";

export default function TransactionList() {

    const { budget, deleteTransaction } = useBudget();

    const [editingTransaction, setEditingTransaction] = useState(null)

    const getCategoryName = (categoryId) => {
        const category = budget.categories.find(c => c.id === categoryId)
        return category ? category.name : 'Silinmiş Kategori'
    }

    const sortedTransactions = [...budget.transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                İşlem Geçmişi
            </h2>

            {sortedTransactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Henüz işlem bulunmamaktadır.
                </p>
            ) : (
                <div className="space-y-4">
                    {sortedTransactions.map(transaction => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border dark:border-gray-700 
                            rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                            transition-colors duration-150"
                        >
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                        {transaction.description}
                                    </h3>
                                    <span className={`font-semibold ${transaction.type === 'income'
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '-'}
                                        {transaction.amount.toLocaleString('tr-TR', {
                                            style: 'currency',
                                            currency: 'TRY'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <span>{getCategoryName(transaction.categoryId)}</span>
                                        <span>•</span>
                                        <span>
                                            {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: tr })}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setEditingTransaction(transaction)}
                                            className="text-blue-500 dark:text-blue-400 
                                            hover:text-blue-700 dark:hover:text-blue-300 
                                            transition-colors duration-150"
                                        >
                                            Düzenle
                                        </button>
                                        <button
                                            onClick={() => deleteTransaction(transaction.id)}
                                            className="text-red-500 dark:text-red-400 
                                            hover:text-red-700 dark:hover:text-red-300 
                                            transition-colors duration-150"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editingTransaction && (
                <EditTransactionModal
                    transaction={editingTransaction}
                    onClose={() => setEditingTransaction(null)}
                />
            )}
        </div>
    )
}