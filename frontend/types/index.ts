export type ExpenseCategory =
  | "Alimentación"
  | "Transporte"
  | "Servicios"
  | "Entretenimiento"
  | "Salud"
  | "Otros";

export interface Expense {
  id: string;
  amount: number;
  currency: string;
  description: string;
  category: ExpenseCategory;
  date: Date | string; // Use Date for client logic, string for JSON compatibility
  payment_method: string;
}
