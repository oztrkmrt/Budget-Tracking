'use client'
import { createContext, useContext, useEffect, useState } from "react";

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
    const [budget, setBudget] = useState({
        categories: [],
        transactions: []
    });

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

    return (
        <BudgetContext.Provider value={{
            budget,
            addTransaction,
            addCategory,
            getCategorySpending
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