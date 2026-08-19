export default function ColorSelector({
  colors,
  selected,
  onSelect,
  size = "md",
}) {
  const dim = size === "sm" ? "h-6 w-6" : "h-9 w-9";
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const isActive = selected?.name === color.name;
        return (
          <button
            key={color.name}
            type="button"
            onClick={() => {
              window.open(
                "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                "_blank",
              );

              onSelect(color);
            }}
            title={color.name}
            aria-label={`Select color ${color.name}`}
            aria-pressed={isActive}
            className={`relative rounded-full border-2 transition-all duration-200 ${dim} ${
              isActive
                ? "border-brand-600 ring-2 ring-brand-200 scale-110"
                : "border-ink-200 hover:border-ink-400"
            }`}
            style={{ backgroundColor: color.hex }}
          >
            {color.hex.toLowerCase() === "#f8fafc" && (
              <span className="absolute inset-0 rounded-full border border-ink-200" />
            )}
          </button>
        );
      })}
    </div>
  );
}
