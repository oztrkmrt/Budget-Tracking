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
    const { budget } = useBudget()

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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Harcama Dağılımı
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Henüz harcama kaydı bulunmamaktadır.
                </p>
            </div>
        )
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-700 p-2 rounded shadow-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {payload[0].name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        {payload[0].value.toLocaleString('tr-TR', {
                            style: 'currency',
                            currency: 'TRY'
                        })}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                        {((payload[0].value / totalExpenses) * 100).toFixed(1)}%
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Harcama Dağılımı
            </h2>

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
                                        className="text-sm"
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
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            formatter={(value, entry) => (
                                <span className="text-gray-900 dark:text-gray-100">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Toplam Harcama:{' '}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
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