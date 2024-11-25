import { useBudget } from "@/app/context/BudgetContext"
import { useEffect, useState } from "react";

export default function TransactionForm() {

    const { addTransaction, budget } = useBudget();

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        categoryId: '',
        date: new Date().toISOString().split('T')[0]
    });

    const filteredCategories = budget.categories.filter(
        category => category.type === formData.type
    );

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            categoryId: ''
        }))
    }, [formData.type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            ...formData,
            amount: Number(formData.amount)
        });
        setFormData({
            description: '',
            amount: '',
            type: 'expense',
            categoryId: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Yeni İşlem Ekle
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Açıklama
                    </label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100 
                        focus:border-blue-500 dark:focus:border-blue-400 
                        focus:ring-blue-500 dark:focus:ring-blue-400
                        shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tutar
                    </label>
                    <div className="relative mt-1">
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 
                            text-gray-900 dark:text-gray-100 
                            focus:border-blue-500 dark:focus:border-blue-400 
                            focus:ring-blue-500 dark:focus:ring-blue-400
                            shadow-sm pr-8"
                            required
                            min="0"
                            step="0.01"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400">₺</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        İşlem Tipi
                    </label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100 
                        focus:border-blue-500 dark:focus:border-blue-400 
                        focus:ring-blue-500 dark:focus:ring-blue-400
                        shadow-sm"
                    >
                        <option value="expense">Gider</option>
                        <option value="income">Gelir</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Kategori
                    </label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100 
                        focus:border-blue-500 dark:focus:border-blue-400 
                        focus:ring-blue-500 dark:focus:ring-blue-400
                        shadow-sm"
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        {filteredCategories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {filteredCategories.length === 0 && (
                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                            Bu işlem tipi için henüz kategori bulunmamaktadır.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tarih
                    </label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1 pl-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100 
                        focus:border-blue-500 dark:focus:border-blue-400 
                        focus:ring-blue-500 dark:focus:ring-blue-400
                        shadow-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 dark:bg-blue-600 
                    text-white py-2 px-4 rounded-md 
                    hover:bg-blue-600 dark:hover:bg-blue-700 
                    focus:outline-none focus:ring-2 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                    transition-colors duration-200"
                >
                    İşlem Ekle
                </button>
            </div>
        </form>
    )
}