import { useBudget } from "@/app/context/BudgetContext"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
} from 'recharts'

export default function ExpenseChart() {

    const { budget } = useBudget();

    const expensesByCategory = budget.categories.map(category => {
        const totalExpense = budget.transactions
            .filter(t => t.categoryId === category.id && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)

        return {
            name: category.name,
            value: totalExpense,
            color: category.color
        }
    }).filter(item => item.value > 0)

    const totalExpenses = expensesByCategory.reduce((sum, item) => sum + item.value, 0)

    if (expensesByCategory.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Harcama Dağılımı</h2>
                <p className="text-gray-500 text-center py-8">
                    Henüz harcama kaydı bulunmamaktadır.
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Harcama Dağılımı</h2>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={expensesByCategory}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                percent,
                            }) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180)
                                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180)
                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill="white"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                    >
                                        {`${(percent * 100).toFixed(1)}%`}
                                    </text>
                                )
                            }}
                        >
                            {expensesByCategory.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => value.toLocaleString('tr-TR', {
                                style: 'currency',
                                currency: 'TRY'
                            })}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    Toplam Harcama: {' '}
                    <span className="font-semibold">
                        {totalExpenses.toLocaleString('tr-TR', {
                            style: 'currency',
                            currency: 'TRY'
                        })}
                    </span>
                </p>
            </div>
        </div>
    )
}