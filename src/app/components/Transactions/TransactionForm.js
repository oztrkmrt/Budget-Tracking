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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Yeni İşlem Ekle</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tutar</label>
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">İşlem Tipi</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="expense">Gider</option>
                        <option value="income">Gelir</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        <p className="mt-1 text-sm text-red-500">
                            Bu işlem tipi için henüz kategori bulunmamaktadır.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tarih</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    İşlem Ekle
                </button>
            </div>
        </form>
    )
}