import { Info, Paintbrush, Shirt, Pencil, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { id: "about", label: "about", Icon: Info },
  { id: "art", label: "art", Icon: Paintbrush },
  { id: "merch", label: "merch", Icon: Shirt },
  { id: "design", label: "design", Icon: Pencil },
] as const;

interface SidebarProps {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

function Sidebar({ expanded, onExpandedChange }: SidebarProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#EC573F] text-white transition-[width] duration-300 ease-out ${
        expanded ? "w-36" : "w-14"
      }`}
    >
      <button
        type="button"
        onClick={() => onExpandedChange(!expanded)}
        className="flex items-center justify-center px-3 py-4 opacity-80 transition-opacity hover:opacity-100"
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={expanded}
      >
        {expanded ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
      </button>

      <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-2">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            title={label}
            className="flex w-full items-center justify-center rounded-lg px-3 py-3 font-semibold transition-colors hover:bg-white/15"
          >
            {expanded ? (
              <span className="truncate text-sm tracking-wide">{label}</span>
            ) : (
              <Icon size={20} className="shrink-0" strokeWidth={2} />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
