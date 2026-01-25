import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  amount: string;
  icon?: ReactNode;
}

export function KPICard({ title, amount, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <h3 className="text-secondary-titles text-sm font-medium">{title}</h3>
        <p className="text-titles text-2xl font-bold mt-2">{amount}</p>
      </div>
      {icon && (
        <div className="p-2 bg-background rounded-lg text-action">{icon}</div>
      )}
    </div>
  );
}
