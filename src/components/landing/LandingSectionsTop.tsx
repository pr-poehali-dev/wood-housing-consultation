import Icon from "@/components/ui/icon";
import { HERO_IMAGE, MainContent, ServiceItem, TechItem } from "./data";

function Editable({ value, onChange, isAdmin, className, tag = "span" }: {
  value: string;
  onChange: (v: string) => void;
  isAdmin: boolean;
  className?: string;
  tag?: string;
}) {
  const Tag = tag as keyof JSX.IntrinsicElements;
  if (!isAdmin) return <Tag className={className}>{value}</Tag>;
  return (
    <Tag
      className={className}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </Tag>
  );
}

interface TopProps {
  content: MainContent;
  services: ServiceItem[];
  techs: TechItem[];
  isAdmin: boolean;
  update: (section: keyof MainContent, key: string, value: string) => void;
  updateService: (idx: number, key: string, value: string) => void;
  updateTech: (idx: number, key: string, value: string) => void;
  scrollTo: (id: string) => void;
}

export default function LandingSectionsTop({
  content, services, techs, isAdmin, update, updateService, updateTech, scrollTo,
}: TopProps) {
  const E = ({ s, f, className, tag }: { s: keyof MainContent; f: string; className?: string; tag?: string }) => (
    <Editable
      value={(content[s] as Record<string, string>)[f]}
      onChange={(v) => update(s, f, v)}
      isAdmin={isAdmin}
      className={className}
      tag={tag}
    />
  );

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Лес" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(30,14,4,0.9) 0%, rgba(61,31,10,0.7) 50%, rgba(61,31,10,0.25) 100%)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(200,134,42,0.5)", color: "#d4a96a", background: "rgba(200,134,42,0.1)", fontSize: 12 }}>
              <Icon name="Star" size={12} />
              <E s="hero" f="tag" />
            </div>
            <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, lineHeight: 1.15, color: "var(--cream)", marginBottom: 24, textShadow: "0 2px 24px rgba(30,14,4,0.4)" }}>
              <E s="hero" f="title" />
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(245,237,224,0.88)", marginBottom: 36 }}>
              <E s="hero" f="subtitle" />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 rounded-md font-semibold transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "var(--amber)", color: "var(--wood-deep)", fontSize: 15 }}
              >
                <E s="hero" f="cta" />
              </button>
              <div className="flex items-center gap-2 py-4" style={{ color: "rgba(245,237,224,0.65)", fontSize: 13 }}>
                <Icon name="Gift" size={15} style={{ color: "#d4a96a" }} />
                <E s="hero" f="subcta" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce" style={{ color: "rgba(245,237,224,0.4)" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Листайте</span>
          <Icon name="ChevronDown" size={18} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24" style={{ background: "var(--wood-light)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: 12, fontWeight: 500 }}>О консультанте</span>
              <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, color: "var(--wood-deep)", marginBottom: 20, lineHeight: 1.2 }}>
                <E s="about" f="title" />
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--wood-dark)", marginBottom: 16 }}>
                <E s="about" f="bio1" />
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--wood-dark)", marginBottom: 32 }}>
                <E s="about" f="bio2" />
              </p>
              <div className="grid grid-cols-3 gap-4">
                {(["1", "2", "3"] as const).map(n => (
                  <div key={n} className="text-center p-4 rounded-xl" style={{ background: "rgba(139,94,60,0.1)" }}>
                    <div style={{ fontFamily: "'Cormorant', serif", fontSize: 30, fontWeight: 700, color: "var(--wood-dark)", lineHeight: 1 }}>
                      <E s="about" f={`stat${n}n`} />
                    </div>
                    <div style={{ fontSize: 11, color: "var(--wood-dark)", opacity: 0.7, marginTop: 4, lineHeight: 1.3 }}>
                      <E s="about" f={`stat${n}t`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5", background: "linear-gradient(135deg, var(--wood-dark) 0%, var(--wood-deep) 100%)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(212,169,106,0.15)", border: "2px solid rgba(212,169,106,0.4)", fontSize: 40 }}>
                      🪵
                    </div>
                    <p style={{ fontFamily: "'Cormorant', serif", fontSize: 26, fontWeight: 600, color: "var(--wood-light)", marginBottom: 6 }}>
                      <E s="about" f="name" />
                    </p>
                    <p style={{ fontSize: 13, color: "var(--wood-mid)" }}>
                      <E s="about" f="role" />
                    </p>
                    <div className="mt-8 space-y-3">
                      {["Производство пиломатериалов", "Управление объектами", "Независимая экспертиза"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2" style={{ color: "rgba(212,169,106,0.7)", fontSize: 12 }}>
                          <Icon name="Check" size={14} style={{ color: "var(--amber)" }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-xl" style={{ background: "var(--amber)", opacity: 0.12 }} />
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl" style={{ background: "#3a5a40", opacity: 0.12 }} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: 12, fontWeight: 500 }}>Услуги</span>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: "var(--wood-deep)", marginBottom: 14, lineHeight: 1.2 }}>
              <E s="services" f="title" />
            </h2>
            <p style={{ fontSize: 15, color: "var(--wood-dark)", opacity: 0.75, maxWidth: 480, margin: "0 auto" }}>
              <E s="services" f="subtitle" />
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((item, idx) => (
              <div key={idx} className="group p-8 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1" style={{ background: "var(--wood-light)", borderColor: "rgba(212,169,106,0.2)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(139,94,60,0.1)" }}>
                  <Icon name={item.icon} size={22} style={{ color: "var(--wood-dark)" }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 22, fontWeight: 600, color: "var(--wood-deep)", marginBottom: 10 }}>
                  {isAdmin ? (
                    <span contentEditable suppressContentEditableWarning
                      onBlur={e => updateService(idx, "title", e.currentTarget.innerText)}>
                      {item.title}
                    </span>
                  ) : item.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--wood-dark)", opacity: 0.82 }}>
                  {isAdmin ? (
                    <span contentEditable suppressContentEditableWarning
                      onBlur={e => updateService(idx, "desc", e.currentTarget.innerText)}>
                      {item.desc}
                    </span>
                  ) : item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section id="technologies" className="py-24" style={{ background: "#f0e6d0", backgroundImage: "repeating-linear-gradient(94deg, transparent, transparent 3px, rgba(139,94,60,0.025) 3px, rgba(139,94,60,0.025) 6px)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: 12, fontWeight: 500 }}>Технологии</span>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: "var(--wood-deep)", marginBottom: 14, lineHeight: 1.2 }}>
              <E s="technologies" f="title" />
            </h2>
            <p style={{ fontSize: 15, color: "var(--wood-dark)", opacity: 0.75, maxWidth: 480, margin: "0 auto" }}>
              <E s="technologies" f="subtitle" />
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techs.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border transition-all hover:shadow-md hover:bg-white/80" style={{ background: "rgba(255,255,255,0.55)", borderColor: "rgba(212,169,106,0.25)" }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 19, fontWeight: 600, color: "var(--wood-deep)", lineHeight: 1.25 }}>
                    {isAdmin ? (
                      <span contentEditable suppressContentEditableWarning
                        onBlur={e => updateTech(idx, "title", e.currentTarget.innerText)}>
                        {item.title}
                      </span>
                    ) : item.title}
                  </h3>
                  <span className="shrink-0 ml-2 rounded-full px-2 py-0.5" style={{ fontSize: 10, fontWeight: 600, background: "rgba(200,134,42,0.15)", color: "var(--amber)" }}>
                    {item.tag}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2" style={{ fontSize: 12, color: "var(--wood-dark)", lineHeight: 1.6 }}>
                    <span className="shrink-0">✅</span>
                    <span>
                      {isAdmin ? (
                        <span contentEditable suppressContentEditableWarning
                          onBlur={e => updateTech(idx, "pros", e.currentTarget.innerText)}>
                          {item.pros}
                        </span>
                      ) : item.pros}
                    </span>
                  </div>
                  <div className="flex gap-2" style={{ fontSize: 12, color: "var(--wood-dark)", lineHeight: 1.6 }}>
                    <span className="shrink-0">⚠️</span>
                    <span>
                      {isAdmin ? (
                        <span contentEditable suppressContentEditableWarning
                          onBlur={e => updateTech(idx, "cons", e.currentTarget.innerText)}>
                          {item.cons}
                        </span>
                      ) : item.cons}
                    </span>
                  </div>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: "rgba(212,169,106,0.2)", fontSize: 12, fontWeight: 600, color: "var(--wood-dark)" }}>
                  {isAdmin ? (
                    <span contentEditable suppressContentEditableWarning
                      onBlur={e => updateTech(idx, "price", e.currentTarget.innerText)}>
                      {item.price}
                    </span>
                  ) : item.price}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p style={{ fontSize: 14, color: "var(--wood-dark)", opacity: 0.65, marginBottom: 20 }}>
              Не знаете, что выбрать? Помогу разобраться под ваш проект и бюджет
            </p>
            <button onClick={() => scrollTo("contacts")}
              className="px-8 py-3 rounded-md font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "var(--wood-dark)", color: "var(--cream)", fontSize: 14 }}>
              Получить рекомендацию
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
