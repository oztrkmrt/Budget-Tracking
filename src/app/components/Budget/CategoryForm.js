'use client'
import { useBudget } from '@/app/context/BudgetContext'
import { useState } from 'react'

export default function CategoryForm() {
    const { addCategory } = useBudget()
    const [formData, setFormData] = useState({
        name: '',
        type: 'expense',
        limit: '',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addCategory({
            ...formData,
            limit: Number(formData.limit)
        })
        setFormData({
            name: '',
            type: 'expense',
            limit: '',
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Yeni Kategori Ekle</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori Adı</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori Tipi</label>
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
                    <label className="block text-sm font-medium text-gray-700">
                        {formData.type === 'expense' ? 'Harcama Limiti' : 'Hedef Gelir'}
                    </label>
                    <div className="relative mt-1">
                        <input
                            type="number"
                            value={formData.limit}
                            onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            min="0"
                            step="0.01"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span className="text-gray-500">₺</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Renk</label>
                    <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="mt-1 block w-full h-10"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Kategori Ekle
                </button>
            </div>
        </form>
    )
}