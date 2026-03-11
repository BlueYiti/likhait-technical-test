/**
 * Type definitions for the Expense Tracking System
 */

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  expense_date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  expense_date: string;
}

export interface MonthlySummary {
  totalExpenses: number;
  categoryBreakdown: CategoryBreakdown[];
  topCategories: TopCategory[];
}

export interface DayExpenses {
  day: number;
  expenses: Expense[];
  total: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  emoji?: string;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
}

export interface CategoryGridProps {
  categories: Category[];
  onDelete: (id: number) => void;
  onUpdate: (category: Category) => void;
}

export interface CategoryCardProps {
  category: Category;
  onDelete: (id: number) => void;
  onUpdate: (category: Category) => Promise<void>; // <- expects async function
}

export interface TopCategory {
  category: string;
  total: number;
  count: number;
}

