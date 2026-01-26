"use client";

import { useSettings } from "@/contexts/SettingsContext";

export default function IncomePage() {
  const { translate } = useSettings();

  return (
    <div className="p-8">
      <h1 className="text-titles dark:text-foreground font-bold text-2xl mb-4">
        {translate("income.title")}
      </h1>
      <p className="text-secondary-titles dark:text-gray-400">
        {translate("income.description")}
      </p>
    </div>
  );
}
