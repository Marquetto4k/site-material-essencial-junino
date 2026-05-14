import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Check, ChevronDown, Sparkles, Scissors, PartyPopper,
  Utensils, Flag, Lightbulb, Clock, Wallet, Palette, GraduationCap,
  Store, Heart, Star, ShieldCheck, Mail, Printer, Gift
} from "lucide-react";
import { PurchasePopups } from "@/components/PurchasePopups";

// EDIT: Substitua os links de checkout
const LINK_BASICO = "https://pay.wiapy.com/2ZDKQumXz1";

// EDIT: número de prova social
const TOTAL_CLIENTES = "2.458";

// EDIT: barra fixa do topo
const TOP_BAR_TEXT = "Essa oferta é válida apenas hoje";
const CHECKOUT_ORIGIN = "https://pay.wiapy.com";

function warmCheckoutConnection(url = LINK_BASICO) {
  if (typeof document === "undefined") return;

  try {
    const origin = new URL(url).origin;
    const hints = [
      { rel: "dns-prefetch", href: origin },
      { rel: "preconnect", href: origin, crossOrigin: "anonymous" },
    ];

    hints.forEach(({ rel, href, crossOrigin }) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    });
  } catch {
    // Mantém o clique direto mesmo se o navegador bloquear algum hint.
  }
}

// EDIT: fotos da prova social (troque pelas suas)
const SOCIAL_PHOTOS = [
  "https://i.pravatar.cc/80?img=47",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=45",
  "https://i.pravatar.cc/80?img=49",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit Junino EVA — Moldes para Festa Junina" },
      {
        name: "description",
        content:
          "Mais de 500 moldes juninos em EVA para decorar, ensinar e envolver as crianças no clima da Festa Junina.",
      },
      { property: "og:title", content: "Kit Junino EVA" },
      {
        property: "og:description",
        content: "Material completo para decorar, ensinar e envolver as crianças no clima da Festa Junina.",
      },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  useEffect(() => {
    warmCheckoutConnection();
  }, []);

  return (
    <main className="min-h-screen text-foreground font-sans">
      <TopBar />
      <div className="pt-9 sm:pt-10">
        <Hero />
        <WhatYouGet />
        <Benefits />
        <BonusShowcase />
        <Offers />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
      <PurchasePopups />
    </main>
  );
}

/* ---------------- TOP BAR ---------------- */
function TopBar() {
  return (
    <div
      className="fixed top-0 inset-x-0 z-40 text-white text-center text-[12px] sm:text-sm font-semibold py-2 px-3 shadow-sm"
      style={{ background: "linear-gradient(90deg, #9a1f1f 0%, #c0392b 50%, #9a1f1f 100%)" }}
    >
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {TOP_BAR_TEXT}
      </span>
    </div>
  );
}

/* ---------------- CTA BUTTON (verde padrão) ---------------- */
function CtaButton({
  href, onClick, children, className = "", size = "lg",
}: {
  href?: string; onClick?: () => void; children: React.ReactNode;
  className?: string; size?: "lg" | "md";
}) {
  const sizing = size === "lg"
    ? "min-h-[48px] px-4 py-3 text-sm sm:min-h-[56px] sm:px-6 sm:py-4 sm:text-base"
    : "min-h-[44px] px-3 py-2.5 text-sm sm:px-5 sm:py-3";
  const cls = `inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-2xl font-bold text-white text-center leading-tight shadow-lg transition active:scale-[0.98] touch-manipulation ${sizing} ${className}`;
  const style = {
    background: "#16A34A",
    boxShadow: "0 10px 30px -10px rgba(22,163,74,0.45)",
  } as React.CSSProperties;
  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) =>
    ((e.currentTarget as HTMLElement).style.background = "#15803D");
  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) =>
    ((e.currentTarget as HTMLElement).style.background = "#16A34A");

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        style={style}
        onMouseEnter={(e) => {
          if (isExternal) warmCheckoutConnection(href);
          onMouseEnter(e);
        }}
        onMouseLeave={onMouseLeave}
        onPointerDown={() => {
          if (isExternal) warmCheckoutConnection(href);
        }}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </button>
  );
}

function WistiaVsl() {
  useEffect(() => {
    const scripts = [
      {
        src: "https://fast.wistia.com/player.js",
        type: "text/javascript",
      },
      {
        src: "https://fast.wistia.com/embed/vnhrdfn4h4.js",
        type: "module",
      },
    ];

    scripts.forEach(({ src, type }) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.type = type;
        document.body.appendChild(script);
      }
    });
  }, []);

  return (
    <div className="mt-6 mx-auto w-full max-w-[320px] sm:max-w-[380px]">
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-black shadow-[0_10px_40px_-15px_oklch(0.45_0.06_55_/_0.35)]"
        style={{ aspectRatio: "9 / 16" }}
      >
        <style>
          {`
            wistia-player[media-id='vnhrdfn4h4']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/vnhrdfn4h4/swatch');
              display: block;
              filter: blur(5px);
              padding-top: 177.78%;
            }

            wistia-player[media-id='vnhrdfn4h4'] {
              width: 100%;
              height: 100%;
              display: block;
            }
          `}
        </style>
        <wistia-player media-id="vnhrdfn4h4" aspect="0.5625"></wistia-player>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="px-4 pt-6 pb-8 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-3xl text-center overflow-hidden">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-semibold ring-1 ring-secondary/20">
          <PartyPopper className="h-3.5 w-3.5" /> Festa Junina 2026
        </span>
        <h1 className="mt-4 text-[1.7rem] sm:text-4xl font-extrabold leading-[1.12] text-brand-brown break-words">
          <span className="text-secondary">+500 Moldes</span> em EVA para Festa Junina Prontos para{" "}
          <span className="text-brand-orange">Imprimir, Recortar e Usar</span>
        </h1>
        <p className="mt-3 text-[15px] sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Material junino criado para decorar, ensinar e envolver as crianças com atividades manuais, murais, lembrancinhas e joguinhos temáticos.
        </p>

        <WistiaVsl />

        {/* CTA verde */}
        <div className="mt-5 flex justify-center px-1">
          <CtaButton href="#ofertas" className="w-full max-w-[340px] sm:w-auto sm:max-w-none">
            Quero meus moldes agora
            <ChevronDown className="h-5 w-5" />
          </CtaButton>
        </div>

        {/* Prova social abaixo do CTA */}
        <div className="mt-4 mx-auto flex max-w-[340px] flex-wrap items-center justify-center gap-2.5 px-1">
          <div className="flex -space-x-2">
            {SOCIAL_PHOTOS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                width="28"
                height="28"
                className="h-7 w-7 shrink-0 rounded-full ring-2 ring-background object-cover bg-muted"
              />
            ))}
          </div>
          <p className="max-w-[250px] text-center text-xs sm:text-sm text-muted-foreground">
            Mais de <span className="font-semibold text-foreground">{TOTAL_CLIENTES}</span> pessoas já garantiram o Kit Junino EVA
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHAT YOU GET ---------------- */
function WhatYouGet() {
  const items = [
    { icon: Sparkles, label: "Moldes para atividades juninas" },
    { icon: Palette, label: "Moldes para decoração de sala" },
    { icon: PartyPopper, label: "Moldes de personagens caipiras" },
    { icon: Utensils, label: "Moldes de comidas típicas" },
    { icon: Flag, label: "Moldes para lembrancinhas escolares" },
    { icon: Lightbulb, label: "Ideias para envolver as crianças no arraiá" },
  ];
  return (
    <section className="px-4 py-10 sm:py-14 bg-brand-beige/40">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-brand-brown">
          Materiais para deixar a Festa Junina mais criativa e educativa
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Use os moldes para criar atividades, murais, lembrancinhas e decorações que ajudam as crianças a entrar no clima junino.
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-2xl bg-card border border-border p-3.5 sm:p-4 shadow-sm flex flex-col items-start gap-2 min-w-0"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/30 text-brand-brown flex items-center justify-center">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold leading-snug break-words">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */
function Benefits() {
  const items = [
    { icon: Clock, t: "Economize tempo nas atividades", d: "Os moldes já vêm prontos para imprimir e preparar." },
    { icon: Store, t: "Deixe a sala no clima junino", d: "Crie painéis, murais e enfeites de forma simples." },
    { icon: Heart, t: "Aprendizado mais lúdico", d: "Use o tema junino para envolver as crianças com criatividade." },
    { icon: Scissors, t: "Lembrancinhas e peças práticas", d: "Monte itens em EVA para escola, igreja, família ou eventos." },
    { icon: GraduationCap, t: "Ideal para professoras e mães", d: "Perfeito para quem quer trabalhar atividades visuais com crianças." },
    { icon: Sparkles, t: "Atividades criativas e econômicas", d: "Aproveite materiais simples para criar peças bonitas e educativas." },
  ];
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-brand-brown">
          Por que esse material ajuda nas atividades juninas?
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-card border border-border p-4 shadow-sm flex gap-3 min-w-0">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-[15px]">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BONUS SHOWCASE ---------------- */
function BonusShowcase() {
  const items = [
    {
      img: "/bonus-educacional.webp",
      title: "+600 Moldes Educativos em EVA para Alfabetização e Aprendizado Infantil",
      desc: "Moldes em EVA voltados para alfabetização, coordenação motora, atividades escolares e desenvolvimento infantil com mais criatividade no aprendizado.",
      value: "R$29,90",
    },
    {
      img: "/bonus-pedagogico.webp",
      title: "+80 Moldes Pedagógicos em EVA para Atividades e Desenvolvimento Infantil",
      desc: "Modelos pedagógicos para reforço infantil, atividades educativas, apoio em sala de aula e estímulo ao aprendizado das crianças.",
      value: "R$17,90",
    },
  ];

  return (
    <section className="px-4 py-10 sm:py-14 bg-brand-beige/30">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-brand-brown">
          Bônus para deixar as atividades ainda mais completas
        </h2>
        <p className="mt-2 text-center text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base">
          Além dos moldes juninos, você recebe materiais extras para ampliar as atividades, estimular o aprendizado e aproveitar melhor o tema da Festa Junina.
        </p>

        <div className="mt-6 space-y-4 sm:space-y-5">
          {items.map((item) => (
            <div key={item.title} className="rounded-[28px] bg-card border border-border shadow-sm overflow-hidden grid min-w-0 md:grid-cols-[220px_1fr]">
              <div className="p-4 sm:p-5 md:border-r border-border flex items-center justify-center bg-background/50">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[140px] sm:max-w-[170px] md:max-w-[180px] h-auto object-contain rounded-2xl"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <Gift className="h-4 w-4" />
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-accent text-white px-3 py-1 text-[11px] font-bold tracking-wide uppercase leading-none">
                    Bônus
                  </span>
                  <h3 className="min-w-0 break-words text-lg sm:text-2xl font-extrabold text-brand-brown leading-tight">{item.title}</h3>
                </div>
                <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm sm:text-base">
                  <p className="text-muted-foreground">Valor: <span className="line-through">{item.value}</span></p>
                  <span className="inline-flex max-w-full items-center rounded-full bg-accent/10 text-accent px-3 py-1 font-bold uppercase text-[11px] sm:text-xs tracking-wide leading-snug">
                    Hoje grátis no Kit Junino EVA
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- OFFERS ---------------- */
function Offers() {
  return (
    <section id="ofertas" className="px-4 py-10 sm:py-16 scroll-mt-16 bg-gradient-to-b from-brand-beige/40 to-transparent">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-brand-brown">
          Garanta agora o seu Kit Junino EVA
        </h2>
        <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base">
          Acesso imediato após a compra.
        </p>

        <div className="mt-6 sm:mt-8 max-w-xl mx-auto">
          <OfferCard
            title="Kit Junino EVA"
            desc="Um material completo para preparar atividades, decorações, lembrancinhas e peças educativas no clima da Festa Junina."
            oldPrice="R$37,90"
            price="R$10,90"
            cta="Quero o Kit Junino EVA agora"
            link={LINK_BASICO}
            items={[
              "+500 moldes em EVA para Festa Junina",
              "Moldes para atividades com crianças",
              "Moldes para decoração de sala e painéis",
              "Moldes de personagens, comidas típicas e arraiá",
              "Material pronto para imprimir",
              "Acesso enviado por e-mail",
              "Garantia de 7 dias",
            ]}
            bonuses={[
              "+600 Moldes Educativos em EVA para Alfabetização e Aprendizado Infantil",
              "+80 Moldes Pedagógicos em EVA para Atividades e Desenvolvimento Infantil",
            ]}
            bonusTitle="Bônus inclusos no Kit Junino EVA"
          />
        </div>
      </div>
    </section>
  );
}

function OfferCard({
  title, desc, oldPrice, price, cta, link, onClick, items, bonuses, highlight, badge, bonusTitle,
}: {
  title: string; desc: string; oldPrice?: string; price: string; cta: string;
  link?: string; onClick?: () => void;
  items: string[]; bonuses?: string[]; highlight?: boolean; badge?: string; bonusTitle?: string;
}) {
  return (
    <div
      className={`relative rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col min-w-0 ${
        highlight
          ? "bg-card border-2 border-secondary shadow-[0_20px_50px_-20px_oklch(0.58_0.19_28_/_0.45)] ring-1 ring-secondary/20"
          : "bg-card border border-border"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs font-bold shadow">
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" /> {badge}
          </span>
        </div>
      )}
      <h3 className={`break-words font-extrabold leading-tight ${highlight ? "text-xl sm:text-3xl text-secondary" : "text-xl sm:text-2xl text-brand-brown"}`}>
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>

      <div className="mt-4 sm:mt-5">
        {oldPrice && (
          <div className="mb-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">De</p>
            <p className="text-xl font-bold text-muted-foreground line-through">{oldPrice}</p>
          </div>
        )}
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Por apenas
        </p>
        <p className={`font-black leading-none ${highlight ? "text-4xl sm:text-6xl text-secondary" : "text-4xl sm:text-4xl text-brand-brown"}`}>
          {price}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Pagamento único</p>
      </div>

      <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex min-w-0 items-start gap-2.5 text-sm sm:text-[14.5px] leading-snug">
            <span className={`mt-0.5 inline-flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md ${
              highlight ? "bg-accent text-accent-foreground" : "bg-primary/30 text-brand-brown"
            }`}>
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>

      {bonuses && bonuses.length > 0 && (
        <div className="mt-4 sm:mt-5 rounded-2xl border border-dashed border-accent/50 bg-accent/8 p-3 sm:p-4" style={{ background: "rgba(22,163,74,0.06)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            <p className="text-xs sm:text-sm font-extrabold text-accent uppercase tracking-wide leading-tight">
              {bonusTitle ?? "Bônus inclusos"}
            </p>
          </div>
          <ul className="space-y-2.5">
            {bonuses.map((b) => (
              <li key={b} className="flex min-w-0 items-start gap-2 text-sm leading-snug">
                <span className="mt-0.5 inline-flex shrink-0 items-center justify-center rounded-md bg-accent text-white px-1.5 py-0.5 text-[10px] font-bold tracking-wide">
                  BÔNUS
                </span>
                <span className="font-medium leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 sm:mt-6 flex-1 flex flex-col justify-end">
        <CtaButton href={link} onClick={onClick} className="w-full">
          {cta}
        </CtaButton>
        <p className="mt-2 sm:mt-3 text-center text-[11px] sm:text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" /> Compra segura · Acesso imediato
        </p>
      </div>
    </div>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    { t: "Comprei pra já ir preparando as atividades da escola. Gostei porque tem bastante coisa pronta pra imprimir.", n: "Ana C." },
    { t: "Eu estava sem ideia para trabalhar Festa Junina com as crianças e o material ajudou bastante.", n: "Márcia R." },
    { t: "Já separei alguns moldes para fazer lembrancinhas e decorar a sala. Bem prático.", n: "Paula M." },
    { t: "Gostei porque dá pra usar tanto na decoração quanto em atividade com os pequenos.", n: "Juliana S." },
    { t: "Tem bastante molde simples de adaptar. Pra quem trabalha com EVA, ajuda muito.", n: "Camila A." },
    { t: "Baixei e já comecei a escolher os moldes pra imprimir. Veio bem completo.", n: "Renata L." },
  ];
  const colors = ["bg-primary/40", "bg-accent/30", "bg-secondary/20", "bg-brand-orange/30", "bg-primary/30", "bg-accent/40"];
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-brand-brown">
          Quem já garantiu aprovou
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it, i) => (
            <div key={it.n} className="rounded-2xl bg-card border border-border p-4 shadow-sm">
              <div className="flex gap-0.5 text-brand-orange mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">"{it.t}"</p>
              <div className="mt-3 flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full ${colors[i]} flex items-center justify-center text-xs font-bold text-brand-brown`}>
                  {it.n.split(" ").map((w) => w[0]).join("")}
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{it.n}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "O material é físico ou digital?", a: "O Kit Junino EVA é um material digital. Você recebe acesso aos moldes para baixar e imprimir." },
    { q: "Posso usar em sala de aula?", a: "Sim. O material é ideal para professoras, escolas, atividades infantis, murais, lembrancinhas e decoração junina." },
    { q: "O material serve para trabalhar com crianças?", a: "Sim. Os moldes ajudam a criar atividades visuais, lúdicas e criativas para envolver as crianças no tema da Festa Junina." },
    { q: "Preciso ter experiência com EVA?", a: "Não. Os moldes são prontos e facilitam bastante o processo de criação." },
    { q: "Como recebo o acesso?", a: "Após a compra, você recebe as instruções de acesso por e-mail." },
    { q: "Posso usar para vender peças prontas?", a: "Sim, você pode usar os moldes para produzir suas peças artesanais e vender." },
    { q: "Quais bônus estão inclusos?", a: "Você também recebe +600 moldes educativos em EVA para alfabetização e aprendizado infantil e +80 moldes pedagógicos em EVA para atividades e desenvolvimento infantil." },
    { q: "Tem garantia?", a: "Sim. Você tem garantia de 7 dias." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-brand-brown">
          Perguntas frequentes
        </h2>
        <div className="mt-6 space-y-2.5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span className="font-semibold text-[15px]">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 -mt-1 text-sm text-muted-foreground animate-slide-up">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="px-4 py-12 sm:py-16 bg-gradient-to-b from-transparent to-brand-beige/60">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl sm:text-3xl font-extrabold text-brand-brown leading-tight">
          Garanta agora o seu Kit Junino EVA
        </h2>
        <p className="mt-3 text-muted-foreground">
          Tenha moldes prontos para imprimir, recortar e transformar em atividades,
          decorações e lembrancinhas juninas para envolver as crianças.
        </p>
        <div className="mt-7 flex justify-center">
          <CtaButton href={LINK_BASICO} className="w-full max-w-[340px] sm:w-auto sm:max-w-none">Quero o Kit Junino EVA</CtaButton>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Garantia de 7 dias</span>
          <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Acesso por e-mail</span>
          <span className="inline-flex items-center gap-1.5"><Printer className="h-3.5 w-3.5" /> Pronto para imprimir</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 py-6 text-center text-xs text-muted-foreground border-t border-border">
      © {new Date().getFullYear()} Kit Junino EVA · Todos os direitos reservados
    </footer>
  );
}
