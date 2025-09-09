import React, { useState } from 'react';
import { Plus, Receipt, Users, TrendingUp, PieChart } from 'lucide-react';
import { Expense } from '../../types';

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  travelers: string[];
}

export default function ExpenseTracker({ expenses, onAddExpense, travelers }: ExpenseTrackerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'food',
    amount: '',
    description: '',
    paidBy: travelers[0] || 'User'
  });

  const categories = [
    'food', 'transport', 'accommodation', 'activities', 'shopping', 'other'
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averagePerPerson = totalExpenses / travelers.length;

  const categoryTotals = categories.map(category => ({
    category,
    total: expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
  })).filter(c => c.total > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    });
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: 'food',
      amount: '',
      description: '',
      paidBy: travelers[0] || 'User'
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Expense Tracker</h3>
          <p className="text-gray-600">Track and split your trip expenses</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">Total Spent</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">${totalExpenses.toLocaleString()}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Per Person</span>
          </div>
          <div className="text-2xl font-bold text-green-600">${averagePerPerson.toLocaleString()}</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Entries</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{expenses.length}</div>
        </div>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-4">Add New Expense</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid By</label>
                <select
                  value={newExpense.paidBy}
                  onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {travelers.map(traveler => (
                    <option key={traveler} value={traveler}>{traveler}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Expense
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Breakdown */}
      {categoryTotals.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Category Breakdown
          </h4>
          <div className="space-y-2">
            {categoryTotals.map(({ category, total }) => {
              const percentage = (total / totalExpenses) * 100;
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">${total.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Expenses */}
      <div>
        <h4 className="font-semibold mb-3">Recent Expenses</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {expenses.length > 0 ? expenses.slice(-5).reverse().map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{expense.description}</div>
                <div className="text-sm text-gray-600">
                  {expense.date} • {expense.category} • Paid by {expense.paidBy}
                </div>
              </div>
              <span className="font-semibold text-green-600">${expense.amount}</span>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-8">No expenses recorded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}