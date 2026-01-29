"use client";

import { Sheet } from "@/components/ui/Sheet";
import { useSettings } from "@/contexts/SettingsContext";
import { Badge } from "@/components/ui/Badge";
import type { Expense } from "@/types/index";
import { Calendar, CreditCard, Tag, Info, Clock } from "lucide-react";
import { EditExpenseModal } from "./EditExpenseModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

interface ExpenseDetailsSheetProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

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

export function ExpenseDetailsSheet({
  expense,
  isOpen,
  onClose,
  onSuccess,
}: ExpenseDetailsSheetProps) {
  const { translate, currencySymbol, currency } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!expense) return null;

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={translate("expenses.details.title")}
    >
      <EditExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          onSuccess?.(); // Call parent's onSuccess to refresh the table
          setIsModalOpen(false);
          onClose();
        }}
        expense={expense}
      />
      <div className="space-y-8 py-4">
        {/* Header/Amount Section */}
        <div className="flex flex-col items-center justify-center p-8 bg-action/5 dark:bg-action/10 rounded-3xl border border-action/10">
          <span className="text-secondary-titles dark:text-muted-foreground text-sm font-bold uppercase tracking-widest mb-2">
            {translate("expenses.details.amount")}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-titles dark:text-foreground">
              {currencySymbol}
              {expense.amount.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-action">{currency}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-secondary/50 dark:bg-secondary/20 rounded-xl">
              <Tag className="w-5 h-5 text-action" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-secondary-titles dark:text-muted-foreground uppercase tracking-wider mb-1">
                {translate("expenses.details.category")}
              </p>
              <Badge
                variant={categoryColors[expense.category] || "default"}
                className="text-xs px-3 py-1 font-bold"
              >
                {expense.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-secondary/50 dark:bg-secondary/20 rounded-xl">
              <Calendar className="w-5 h-5 text-action" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-secondary-titles dark:text-muted-foreground uppercase tracking-wider mb-1">
                {translate("expenses.details.date")}
              </p>
              <p className="text-base font-bold text-titles dark:text-foreground">
                {new Date(expense.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-secondary/50 dark:bg-secondary/20 rounded-xl">
              <CreditCard className="w-5 h-5 text-action" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-secondary-titles dark:text-muted-foreground uppercase tracking-wider mb-1">
                {translate("expenses.details.paymentMethod")}
              </p>
              <p className="text-base font-bold text-titles dark:text-foreground">
                {expense.payment_method}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-secondary/50 dark:bg-secondary/20 rounded-xl">
              <Info className="w-5 h-5 text-action" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-secondary-titles dark:text-muted-foreground uppercase tracking-wider mb-1">
                {translate("expenses.details.description")}
              </p>
              <p className="text-base text-titles dark:text-foreground leading-relaxed">
                {expense.description}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-secondary/50 dark:bg-secondary/20 rounded-xl">
              <Clock className="w-5 h-5 text-action" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-secondary-titles dark:text-muted-foreground uppercase tracking-wider mb-1">
                {translate("expenses.details.id")}
              </p>
              <p className="text-xs font-mono text-secondary-titles dark:text-muted-foreground">
                {expense.id}
              </p>
            </div>
          </div>
          <motion.button
            whileHover="hover"
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 bg-action hover:bg-action/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 1 }}
              variants={{
                hover: { scale: 1.2 },
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <Pencil size={20} strokeWidth={2.5} />
            </motion.div>
            {translate("expenses.edit")}
          </motion.button>
        </div>
      </div>
    </Sheet>
  );
}
