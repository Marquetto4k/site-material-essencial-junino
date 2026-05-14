import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

// EDIT: configure messages, intervals and timings here
const MESSAGES = [
  { name: "Ana C.", text: "acabou de adquirir o Kit Junino EVA", time: "há 3 minutos" },
  { name: "Márcia R.", text: "garantiu o Kit Junino EVA", time: "há 7 minutos" },
  { name: "Paula M.", text: "acabou de comprar o material", time: "há 12 minutos" },
  { name: "Juliana S.", text: "garantiu o acesso aos moldes", time: "há 18 minutos" },
  { name: "Camila A.", text: "adquiriu o Kit Junino EVA", time: "há 24 minutos" },
  { name: "Renata L.", text: "acabou de garantir o material", time: "há 31 minutos" },
];
const FIRST_DELAY_MS = 4000;
const VISIBLE_MS = 5000;
const GAP_MS = 8000;

export function PurchasePopups() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    let t: ReturnType<typeof setTimeout>;
    const cycle = (first = false) => {
      t = setTimeout(() => {
        setOpen(true);
        t = setTimeout(() => {
          setOpen(false);
          setIndex((i) => (i + 1) % MESSAGES.length);
          cycle();
        }, VISIBLE_MS);
      }, first ? FIRST_DELAY_MS : GAP_MS);
    };
    cycle(true);
    return () => clearTimeout(t);
  }, [closed]);

  if (closed) return null;
  const m = MESSAGES[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-3 right-3 sm:left-5 sm:right-auto sm:max-w-sm bottom-4 z-50 transition-all duration-300 ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/95 backdrop-blur px-3 py-2.5 shadow-lg">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div className="flex-1 text-[13px] leading-tight">
          <p className="text-foreground">
            <span className="font-semibold">{m.name}</span> {m.text}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{m.time}</p>
        </div>
        <button
          aria-label="Fechar notificação"
          onClick={() => setClosed(true)}
          className="text-muted-foreground hover:text-foreground p-1 -m-1"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
