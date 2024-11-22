'use client'

import { useBudget } from "@/app/context/BudgetContext"

export default function CategoryList() {

    const { budget, deleteCategory } = useBudget();

    const getCategoryTotal = (categoryId, categoryType) => {
        return budget.transactions
            .filter(t => t.categoryId === categoryId && t.type === categoryType)
            .reduce((sum, t) => sum + t.amount, 0)
    }

    const getPercentage = (categoryId, limit, type) => {
        const total = getCategoryTotal(categoryId, type)
        return (total / limit) * 100
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>

            <div className="space-y-4">
                {budget.categories.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                        Henüz kategori bulunmamaktadır.
                    </p>
                ) : (
                    budget.categories.map(category => {
                        const total = getCategoryTotal(category.id, category.type)
                        const percentage = getPercentage(category.id, category.limit, category.type)

                        return (
                            <div
                                key={category.id}
                                className="border rounded-lg p-4 relative"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <div>
                                            <h3 className="font-medium">{category.name}</h3>
                                            <span className={`text-xs ${category.type === 'income' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {category.type === 'income' ? 'Gelir' : 'Gider'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteCategory(category.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Sil
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {total.toLocaleString('tr-TR', {
                                                style: 'currency',
                                                currency: 'TRY'
                                            })} / {category.limit.toLocaleString('tr-TR', {
                                                style: 'currency',
                                                currency: 'TRY'
                                            })}
                                        </span>
                                        <span className={`font-medium ${category.type === 'income'
                                                ? percentage >= 100
                                                    ? 'text-green-500'
                                                    : percentage >= 80
                                                        ? 'text-blue-500'
                                                        : 'text-gray-500'
                                                : percentage >= 100
                                                    ? 'text-red-500'
                                                    : percentage >= 80
                                                        ? 'text-orange-500'
                                                        : 'text-green-500'
                                            }`}>
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${category.type === 'income'
                                                    ? percentage >= 100
                                                        ? 'bg-green-500'
                                                        : percentage >= 80
                                                            ? 'bg-blue-500'
                                                            : 'bg-gray-400'
                                                    : percentage >= 100
                                                        ? 'bg-red-500'
                                                        : percentage >= 80
                                                            ? 'bg-orange-500'
                                                            : 'bg-green-500'
                                                }`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}