import React, { useEffect, useState, useContext } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import CardExpenseComparison from '../components/Fragments/CardExpenseComparison';
import { expenseService } from '../services/dataService'; // Pastikan service ini mengarah ke API
import { AuthContext } from '../context/authContext';

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const data = await expenseService();
        setExpenses(data);
      } catch (err) {
        if (err.response?.status === 401) logout();
      } finally {
        setIsLoading(false);
      }
    };
    getExpenses();
  }, []);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Expenses Comparison</h1>
        
        {isLoading ? (
          // Loader yang sama dengan Card Goal
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-primary italic text-sm">Loading Data...</p>
          </div>
        ) : (
          <CardExpenseComparison data={expenses} />
        )}
      </div>
    </MainLayout>
  );
}

export default ExpensePage;