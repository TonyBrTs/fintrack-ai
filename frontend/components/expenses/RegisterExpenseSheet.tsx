"use client";

import { useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { useSettings } from "@/contexts/SettingsContext";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface RegisterExpenseSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegisterExpenseSheet({
  isOpen,
  onClose,
  onSuccess,
}: RegisterExpenseSheetProps) {
  const { translate, currency } = useSettings();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "Alimentación",
    description: "",
    date: new Date().toISOString().split("T")[0],
    payment_method: "Tarjeta de Crédito",
  });

  const categories = [
    "Alimentación",
    "Transporte",
    "Servicios",
    "Entretenimiento",
    "Salud",
    "Otros",
  ];

  const paymentMethods = [
    "Tarjeta de Crédito",
    "Tarjeta de Débito",
    "Efectivo",
    "Transferencia",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          currency,
          date: new Date(formData.date).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register expense");
      }

      toast.success(translate("expenses.form.success"));
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        amount: "",
        category: "Alimentación",
        description: "",
        date: new Date().toISOString().split("T")[0],
        payment_method: "Tarjeta de Crédito",
      });
    } catch (error) {
      console.error("Error registering expense:", error);
      toast.error(translate("expenses.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={translate("expenses.form.title")}
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-titles dark:text-foreground">
            {translate("expenses.form.amount")}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400 z-10">
              $
            </span>
            <Input
              required
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              className="pl-8 text-lg font-bold h-12"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-titles dark:text-foreground">
              {translate("expenses.form.category")}
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-titles dark:text-foreground">
              {translate("expenses.form.date")}
            </label>
            <Input
              required
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-titles dark:text-foreground">
            {translate("expenses.form.paymentMethod")}
          </label>
          <select
            value={formData.payment_method}
            onChange={(e) =>
              setFormData({ ...formData, payment_method: e.target.value })
            }
            className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {paymentMethods.map((pm) => (
              <option key={pm} value={pm}>
                {pm}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-titles dark:text-foreground">
            {translate("expenses.form.description")}
          </label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="..."
            className="min-h-24 resize-none"
          />
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            disabled={loading}
            type="submit"
            className="w-full h-12 bg-action hover:bg-action/90 font-bold "
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading
              ? translate("expenses.form.loading")
              : translate("expenses.form.save")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full h-10 font-medium"
          >
            {translate("expenses.form.cancel")}
          </Button>
        </div>
      </form>
    </Sheet>
  );
}
