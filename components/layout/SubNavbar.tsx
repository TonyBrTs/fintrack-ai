export function SubNavbar() {
  const navItems = [
    { name: "Resumen", active: true },
    { name: "Gastos", active: false },
    { name: "Ingresos", active: false },
    { name: "Metas", active: false },
  ];

  return (
    <div className="bg-white border-b border-gray-100 flex items-center px-20">
      {navItems.map((item) => (
        <button
          key={item.name}
          className={`
            relative px-4 py-4 font-medium transition-colors cursor-pointer
            ${
              item.active
                ? "text-action"
                : "text-secondary-titles hover:text-titles"
            }
          `}
        >
          {item.name}
          {item.active && (
            <span className="absolute bottom-0 left-0 w-full h-0.75 bg-action rounded-t-sm" />
          )}
        </button>
      ))}
    </div>
  );
}
