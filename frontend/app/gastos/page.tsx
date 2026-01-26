"use client";

import { motion } from "framer-motion";
import { Plus, TrendingDown, Tag } from "lucide-react";
import { KPICard } from "@/components/ui/KPICard";
import { Badge } from "@/components/ui/Badge";
import { useSettings } from "@/contexts/SettingsContext";
import type { Expense } from "@/types/index";

const mockExpenses: Expense[] = [
  {
    id: "1",
    amount: 45.5,
    currency: "USD",
    description: "Almuerzo de negocios",
    category: "Alimentación",
    date: "2024-03-20",
    paymentMethod: "Tarjeta de Crédito",
  },
  {
    id: "2",
    amount: 12.0,
    currency: "USD",
    description: "Uber al aeropuerto",
    category: "Transporte",
    date: "2024-03-19",
    paymentMethod: "Efectivo",
  },
  {
    id: "3",
    amount: 85.0,
    currency: "USD",
    description: "Suscripción Netflix y Spotify",
    category: "Entretenimiento",
    date: "2024-03-18",
    paymentMethod: "Débito",
  },
  {
    id: "4",
    amount: 120.0,
    currency: "USD",
    description: "Pago de luz y agua",
    category: "Servicios",
    date: "2024-03-15",
    paymentMethod: "Transferencia",
  },
  {
    id: "5",
    amount: 30.0,
    currency: "USD",
    description: "Farmacia",
    category: "Salud",
    date: "2024-03-14",
    paymentMethod: "Tarjeta de Crédito",
  },
];

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categoryColors: Record<
  string,
  "success" | "warning" | "error" | "info" | "default"
> = {
  Alimentación: "success",
  Transporte: "info",
  Servicios: "warning",
  Entretenimiento: "error",
  Salud: "error",
  Otros: "default",
};

export default function GastosPage() {
  const { currency, currencySymbol, translate } = useSettings();
  const totalMonth = mockExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const highestCategory = "Servicios"; // Mocking this for simplicity

  return (
    <main className="max-w-360 mx-auto px-4 lg:px-20 py-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-1 h-15 bg-action rounded-full" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-titles dark:text-foreground">
              {translate("expenses.title")}
            </h1>
          </div>
          <p className="text-secondary-titles dark:text-muted-foreground text-lg ml-5">
            {translate("expenses.description")}
          </p>
        </div>
        <motion.button
          whileHover="hover"
          className="group flex items-center gap-2 bg-action hover:bg-action/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <motion.div
            initial={{ rotate: 0 }}
            variants={{
              hover: { rotate: 180 },
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <Plus size={20} strokeWidth={2.5} />
          </motion.div>
          {translate("expenses.register")}
        </motion.button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <KPICard
          title={translate("expenses.totalMonth")}
          amount={`${currencySymbol}${totalMonth.toFixed(2)}`}
          icon={<TrendingDown size={24} />}
        />
        <KPICard
          title={translate("expenses.highestCategory")}
          amount={highestCategory}
          icon={<Tag size={24} />}
        />
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card-bg dark:bg-card border border-border-ui rounded-3xl overflow-hidden shadow-xl shadow-black/5"
      >
        <Table>
          <TableHeader className="bg-secondary/30 dark:bg-secondary/10">
            <TableRow className="hover:bg-transparent border-border-ui border-b-2">
              <TableHead className="px-4 md:px-6 py-5 text-xs md:text-sm font-bold text-titles dark:text-foreground uppercase tracking-widest">
                {translate("expenses.table.date")}
              </TableHead>
              <TableHead className="hidden md:table-cell px-6 py-5 text-sm font-bold text-titles dark:text-foreground uppercase tracking-widest">
                {translate("expenses.table.description")}
              </TableHead>
              <TableHead className="px-4 md:px-6 py-5 text-xs md:text-sm font-bold text-titles dark:text-foreground uppercase tracking-widest">
                {translate("expenses.table.category")}
              </TableHead>
              <TableHead className="px-4 md:px-6 py-5 text-xs md:text-sm font-bold text-titles dark:text-foreground uppercase tracking-widest text-right">
                {translate("expenses.table.amount")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExpenses.map((expense) => (
              <TableRow
                key={expense.id}
                className="hover:bg-secondary/20 dark:hover:bg-secondary/5 transition-colors border-border-ui h-20"
              >
                <TableCell className="px-4 md:px-6 py-4 text-sm text-titles dark:text-foreground whitespace-nowrap font-medium">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                    <span className="md:hidden text-[10px] text-secondary-titles mt-0.5 truncate max-w-20 opacity-70">
                      {expense.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell px-6 py-4 text-sm text-titles dark:text-foreground font-medium">
                  {expense.description}
                </TableCell>
                <TableCell className="px-4 md:px-6 py-4">
                  <Badge
                    variant={categoryColors[expense.category]}
                    className="text-[10px] md:text-xs px-3 py-1 font-bold tracking-tight shadow-sm"
                  >
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 md:px-6 py-4 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-base md:text-lg text-titles dark:text-foreground font-black">
                      {currencySymbol}
                      {expense.amount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-secondary-titles dark:text-muted-foreground uppercase font-bold tracking-tighter opacity-80">
                      {currency}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.section>
    </main>
  );
}
