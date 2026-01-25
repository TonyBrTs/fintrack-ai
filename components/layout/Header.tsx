import { Moon, Globe, Settings, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="h-18 bg-white border-b border-gray-100 px-8 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-titles font-bold text-xl">FinTrack AI</h1>

      {/* Right side: Icons and Avatar */}
      <div className="flex items-center gap-5">
        <button className="text-secondary-titles hover:text-action transition-colors cursor-pointer">
          <Moon size={20} />
        </button>
        <button className="text-secondary-titles hover:text-action transition-colors cursor-pointer">
          <Globe size={20} />
        </button>
        <button className="text-secondary-titles hover:text-action transition-colors cursor-pointer">
          <Settings size={20} />
        </button>
        <button className="text-secondary-titles hover:text-action transition-colors cursor-pointer">
          <Bell size={20} />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-action flex items-center justify-center text-titles font-medium text-sm cursor-pointer">
          TA
        </div>
      </div>
    </header>
  );
}
