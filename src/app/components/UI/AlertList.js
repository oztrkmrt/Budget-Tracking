'use client'
import { useBudget } from '@/app/context/BudgetContext'
import { useEffect, useState } from 'react'

export default function AlertList() {
    const { alerts, removeAlert } = useBudget()
    const [visibleAlerts, setVisibleAlerts] = useState([])

    useEffect(() => {
        setVisibleAlerts(alerts)
    }, [alerts])

    useEffect(() => {
        const timers = visibleAlerts.map(alert => {
            return setTimeout(() => {
                removeAlert(alert.id)
            }, 5000)
        })

        return () => timers.forEach(timer => clearTimeout(timer))
    }, [visibleAlerts, removeAlert])

    if (visibleAlerts.length === 0) return null

    return (
        <div className="fixed top-24 right-4 z-40 space-y-2"> {/* top-20 -> top-24, z-50 -> z-40 */}
            {visibleAlerts.map(alert => (
                <div
                    key={alert.id}
                    className={`p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-300 
                    ${alert.type === 'danger'
                            ? 'bg-red-100 dark:bg-red-900 border-l-4 border-red-500'
                            : 'bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500'
                        }`}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className={`text-sm font-medium 
                            ${alert.type === 'danger'
                                    ? 'text-red-800 dark:text-red-200'
                                    : 'text-yellow-800 dark:text-yellow-200'
                                }`}>
                                {alert.message}
                            </p>
                        </div>
                        <button
                            onClick={() => removeAlert(alert.id)}
                            className={`ml-4 text-sm font-medium 
                            ${alert.type === 'danger'
                                    ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                                    : 'text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300'
                                } transition-colors duration-150`}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}