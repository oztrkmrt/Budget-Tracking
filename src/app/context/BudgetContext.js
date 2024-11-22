'use client'
import { createContext, useContext, useEffect, useState } from "react";

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
    const [budget, setBudget] = useState({
        categories: [],
        transactions: []
    });

    const [alerts, setAlerts] = useState([]);

    const checkLimitWarnings = () => {
        const newAlerts = []
        budget.categories
            .filter(category => category.type === 'expense')
            .forEach(category => {
                const total = budget.transactions
                    .filter(t => t.categoryId === category.id && t.type === 'expense')
                    .reduce((sum, t) => sum + t.amount, 0)

                const percentage = (total / category.limit) * 100

                if (percentage >= 80 && percentage < 100) {
                    newAlerts.push({
                        id: crypto.randomUUID(),
                        categoryId: category.id,
                        categoryName: category.name,
                        message: `${category.name} kategorisinde harcama limitinin %${percentage.toFixed(1)}'ine ulaştınız!`,
                        type: 'warning'
                    })
                } else if (percentage >= 100) {
                    newAlerts.push({
                        id: crypto.randomUUID(),
                        categoryId: category.id,
                        categoryName: category.name,
                        message: `${category.name} kategorisinde harcama limitini aştınız!`,
                        type: 'danger'
                    })
                }
            })
        setAlerts(newAlerts)
    };

    useEffect(() => {
        checkLimitWarnings()
    }, [budget.transactions])

    const removeAlert = (alertId) => {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    }

    useEffect(() => {
        const savedBudget = localStorage.getItem('budget')
        if (savedBudget) {
            setBudget(JSON.parse(savedBudget))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    }, [budget]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID()
        };
        setBudget(prev => ({
            ...prev,
            transactions: [...prev.transactions, newTransaction]
        })
        );
    };

    const addCategory = (category) => {
        const newCategory = {
            ...category,
            id: crypto.randomUUID(),
            color: category.color
        };
        setBudget(prev => ({
            ...prev,
            categories: [...prev.categories, newCategory]
        }));
    };

    const getCategorySpending = (categoryId) => {
        return budget.transactions
            .filter(t => t.categoryId === categoryId && t.type === 'expense')
            .reduce((total, t) => total + t.amount, 0);
    };

    const deleteCategory = (categoryId) => {
        setBudget(prev => ({
            ...prev,
            categories: prev.categories.filter(c => c.id !== categoryId),
            transactions: prev.transactions.filter(t => t.categoryId !== categoryId)
        }))
    };

    const deleteTransaction = (transactionId) => {
        setBudget(prev => ({
            ...prev,
            transactions: prev.transactions.filter(t => t.id !== transactionId)
        }))
    };

    return (
        <BudgetContext.Provider value={{
            budget,
            addTransaction,
            addCategory,
            getCategorySpending,
            deleteCategory,
            deleteTransaction,
            alerts,
            removeAlert
        }}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvide');
    }
    return context;
}