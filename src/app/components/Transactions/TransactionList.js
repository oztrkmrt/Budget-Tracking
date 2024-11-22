'use client'

import { useBudget } from "@/app/context/BudgetContext";
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function TransactionList() {

    const { budget, deleteTransaction } = useBudget();

    const getCategoryName = (categoryId) => {
        const category = budget.categories.find(c => c.id === categoryId)
        return category ? category.name : 'Silinmiş Kategori'
    }

    const sortedTransactions = [...budget.transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">İşlem Geçmişi</h2>

            {sortedTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    Henüz işlem bulunmamaktadır.
                </p>
            ) : (
                <div className="space-y-4">
                    {sortedTransactions.map(transaction => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-medium">{transaction.description}</h3>
                                    <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '-'}
                                        {transaction.amount.toLocaleString('tr-TR', {
                                            style: 'currency',
                                            currency: 'TRY'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <span>{getCategoryName(transaction.categoryId)}</span>
                                        <span>•</span>
                                        <span>
                                            {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: tr })}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTransaction(transaction.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}