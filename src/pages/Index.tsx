import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0680fd2c-85ca-4427-9341-47b9350f9bfd/files/c01b8f23-346b-49ef-8e46-648d4fd4a409.jpg";

const defaultContent = {
  hero: {
    tag: "Независимый эксперт по деревянному домостроению",
    title: "Строите дом из дерева и не хотите выбросить миллионы на ветер?",
    subtitle: "Я знаю себестоимость материалов изнутри — прошёл путь от производства пиломатериалов до управления объектами. Помогу выбрать технологию, проверю смету и уберегу от маркетинговых ловушек.",
    cta: "Записаться на консультацию",
    subcta: "Первая консультация — бесплатно",
  },
  about: {
    title: "Кто такой Макс",
    name: "Максим Деревяшкин",
    role: "Эксперт по деревянному домостроению",
    bio1: "Я прошёл путь от производства пиломатериалов до управления строительными объектами. За годы работы я видел тысячи типовых ошибок, которые превращают мечту о деревянном доме в бесконечный ремонт.",
    bio2: "Я не просто «теоретик» — я знаю, как дерево ведёт себя на производстве, при монтаже и спустя 5 лет эксплуатации. Моя задача — сэкономить ваш бюджет, уберечь от маркетинговых ловушек и помочь построить дом, который будет служить поколениям.",
    stat1n: "15+",
    stat1t: "лет в отрасли",
    stat2n: "1000+",
    stat2t: "проектов оценено",
    stat3n: "0",
    stat3t: "аффилированных партнёров",
  },
  services: {
    title: "Чем я помогу",
    subtitle: "Полное сопровождение от выбора технологии до приёмки объекта",
  },
  technologies: {
    title: "Технологии деревянного домостроения",
    subtitle: "Принципиальная разница, которую скрывают продавцы",
  },
  faq: {
    title: "Частые вопросы",
  },
  contacts: {
    title: "Обсудим ваш проект",
    subtitle: "Напишите или позвоните — разберём ситуацию и договоримся о времени консультации",
    phone: "+7 (999) 000-00-00",
    telegram: "@max_drevo",
    email: "max@drevo-consult.ru",
    cta: "Написать в WhatsApp",
  },
};

const defaultServices = [
  { icon: "TreePine", title: "Выбор технологии", desc: "Разбираем плюсы и минусы: оцилиндрованное бревно, рубленый сруб, профилированный брус, клееный брус, фахверк и каркас — под ваш бюджет и задачи." },
  { icon: "Search", title: "Отбраковка материалов", desc: "Научу видеть скрытый брак: синеву, нарушение геометрии, неправильную сушку. Объясню, какой сорт действительно нужен для вашего бюджета." },
  { icon: "FileText", title: "Аудит смет и договоров", desc: "Проверю сметы от строительных компаний. Найду подводные камни, скрытые наценки и невыгодные условия в договорах." },
  { icon: "ShieldCheck", title: "Экспертное сопровождение", desc: "От оценки проекта до контроля критических узлов на стройплощадке. Онлайн или при личной встрече." },
];

const defaultTechs = [
  { title: "Оцилиндрованное бревно", tag: "Классика", pros: "Ровная геометрия, быстрый монтаж, доступная цена", cons: "Снята защитная заболонь, риск растрескивания", price: "от 8 000 ₽/м³" },
  { title: "Рубленый сруб (дикий)", tag: "Традиция", pros: "Сохранена природная структура, долговечность, экология", cons: "Требует опытных мастеров, долгая усадка", price: "от 12 000 ₽/м³" },
  { title: "Профилированный брус", tag: "Компромисс", pros: "Точная геометрия, замок против продувания, быстрый монтаж", cons: "Е/В — разная усадка, камерная сушка стоит дороже", price: "от 7 000 ₽/м³" },
  { title: "Клееный брус", tag: "Премиум", pros: "Минимальная усадка, стабильность, высокая точность", cons: "Дорого, важно качество клея, проверяйте сертификаты", price: "от 25 000 ₽/м³" },
  { title: "Фахверк", tag: "Архитектура", pros: "Уникальная эстетика, большие окна, современно", cons: "Дорогое строительство, требует утепления", price: "индивидуально" },
  { title: "Каркасные решения", tag: "Быстро", pros: "Скорость, любые планировки, бюджетность", cons: "Качество зависит от исполнителя и утеплителя", price: "от 5 000 ₽/м²" },
];

const defaultFaq = [
  { q: "Что входит в одну консультацию?", a: "Час живого общения онлайн или при встрече. Разбираем ваш проект, технологию, смету — всё, что нужно именно вам. Получаете конкретные рекомендации, а не общие слова." },
  { q: "Зачем мне консультация, если есть интернет?", a: "В интернете полно советов от продавцов, которые хотят продать вам свой товар. Я независим и рекомендую то, что выгодно вам, а не производителю. Стоимость консультации — мизер по сравнению с ценой ошибки." },
  { q: "Вы работаете в регионах?", a: "Онлайн-консультации провожу для всей России. Выезд на объект обсуждается отдельно." },
  { q: "Можете проверить смету, которую прислала компания?", a: "Да, это одна из ключевых услуг. Присылайте смету — найду скрытые наценки, завышенные позиции и сомнительные пункты в договоре." },
  { q: "Как вы гарантируете независимость?", a: "Я не аффилирован ни с одним заводом или подрядчиком. Мой доход — оплата консультаций. Поэтому мои рекомендации в ваших, а не в чужих интересах." },
];

type MainContent = typeof defaultContent;

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

export default function Index() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [content, setContent] = useState<MainContent>(defaultContent);
  const [services, setServices] = useState(defaultServices);
  const [techs, setTechs] = useState(defaultTechs);
  const [faq, setFaq] = useState(defaultFaq);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const update = (section: keyof MainContent, key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] as Record<string, string>), [key]: value },
    }));
  };

  const updateService = (idx: number, key: string, value: string) => {
    setServices(prev => prev.map((s, i) => i === idx ? { ...s, [key]: value } : s));
  };

  const updateTech = (idx: number, key: string, value: string) => {
    setTechs(prev => prev.map((t, i) => i === idx ? { ...t, [key]: value } : t));
  };

  const updateFaq = (idx: number, key: string, value: string) => {
    setFaq(prev => prev.map((f, i) => i === idx ? { ...f, [key]: value } : f));
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowLogin(false);
      setAdminPassword("");
    } else {
      alert("Неверный пароль");
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif", background: "var(--cream)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(250,246,240,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(212,169,106,0.2)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: 22, fontWeight: 600, color: "var(--wood-deep)" }}>
            Деревяшкин
          </span>
          <div className="hidden md:flex items-center gap-6" style={{ fontSize: 14, color: "var(--wood-dark)" }}>
            {[["hero", "Главная"], ["services", "Услуги"], ["technologies", "Технологии"], ["faq", "FAQ"], ["about", "О Максе"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:opacity-60 transition-opacity">{label}</button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="text-sm px-4 py-2 rounded-md font-medium transition-all hover:opacity-90"
            style={{ background: "var(--wood-dark)", color: "var(--cream)", fontSize: 13 }}
          >
            Консультация
          </button>
        </div>
      </nav>

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

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: 12, fontWeight: 500 }}>Вопросы и ответы</span>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: "var(--wood-deep)" }}>
              <E s="faq" f="title" />
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map((item, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border transition-all" style={{ borderColor: openFaq === idx ? "rgba(200,134,42,0.4)" : "rgba(212,169,106,0.2)", background: "var(--wood-light)" }}>
                <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "var(--wood-deep)", lineHeight: 1.5 }}>
                    {isAdmin ? (
                      <span contentEditable suppressContentEditableWarning
                        onClick={e => e.stopPropagation()}
                        onBlur={e => updateFaq(idx, "q", e.currentTarget.innerText)}>
                        {item.q}
                      </span>
                    ) : item.q}
                  </span>
                  <Icon name={openFaq === idx ? "Minus" : "Plus"} size={17} style={{ color: "var(--amber)", flexShrink: 0 }} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5" style={{ fontSize: 14, lineHeight: 1.75, color: "var(--wood-dark)" }}>
                    {isAdmin ? (
                      <span contentEditable suppressContentEditableWarning
                        onBlur={e => updateFaq(idx, "a", e.currentTarget.innerText)}>
                        {item.a}
                      </span>
                    ) : item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--wood-deep)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wood-mid)", display: "block", marginBottom: 12, fontWeight: 500 }}>Контакты</span>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(30px,4vw,52px)", fontWeight: 700, color: "var(--wood-light)", marginBottom: 16, lineHeight: 1.2 }}>
            <E s="contacts" f="title" />
          </h2>
          <p style={{ fontSize: 15, color: "rgba(212,169,106,0.75)", marginBottom: 48, maxWidth: 420, margin: "0 auto 48px" }}>
            <E s="contacts" f="subtitle" />
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: "Phone", field: "phone", label: "Телефон" },
              { icon: "Send", field: "telegram", label: "Telegram" },
              { icon: "Mail", field: "email", label: "Email" },
            ].map(({ icon, field, label }) => (
              <div key={field} className="p-6 rounded-xl text-center" style={{ background: "rgba(212,169,106,0.07)", border: "1px solid rgba(212,169,106,0.12)" }}>
                <Icon name={icon} size={20} className="mx-auto mb-3" style={{ color: "var(--wood-mid)" }} />
                <div style={{ fontSize: 11, color: "rgba(212,169,106,0.45)", marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--wood-light)" }}>
                  <E s="contacts" f={field} />
                </div>
              </div>
            ))}
          </div>
          <button
            className="px-10 py-4 rounded-md font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--amber)", color: "var(--wood-deep)", fontSize: 15 }}
          >
            <E s="contacts" f="cta" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ background: "#180a02", borderColor: "rgba(212,169,106,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: 20, fontWeight: 600, color: "var(--wood-mid)" }}>Деревяшкин</span>
          <span style={{ fontSize: 12, color: "rgba(212,169,106,0.35)" }}>
            © 2024 Профессиональные консультации по деревянному домостроению
          </span>
          <button
            onClick={() => setShowLogin(true)}
            className="transition-opacity hover:opacity-60"
            style={{ fontSize: 11, color: "rgba(212,169,106,0.2)" }}
          >
            {isAdmin ? "✓ Режим редактирования" : "Войти"}
          </button>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
          <div className="w-80 rounded-2xl p-8 shadow-2xl" style={{ background: "var(--cream)" }}>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: 26, fontWeight: 700, textAlign: "center", color: "var(--wood-deep)", marginBottom: 6 }}>
              Вход для редактора
            </h3>
            <p style={{ fontSize: 12, textAlign: "center", color: "var(--wood-dark)", opacity: 0.55, marginBottom: 20 }}>
              Пароль по умолчанию: admin123
            </p>
            <input
              type="password"
              placeholder="Пароль"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              className="w-full px-4 py-3 rounded-lg border text-sm mb-4 outline-none"
              style={{ borderColor: "var(--wood-mid)", color: "var(--wood-deep)", background: "white", fontSize: 14 }}
            />
            <div className="flex gap-3">
              <button onClick={() => setShowLogin(false)}
                className="flex-1 py-2.5 rounded-lg border transition-all hover:opacity-70"
                style={{ borderColor: "rgba(139,94,60,0.3)", color: "var(--wood-dark)", fontSize: 13 }}>
                Отмена
              </button>
              <button onClick={handleAdminLogin}
                className="flex-1 py-2.5 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ background: "var(--wood-dark)", color: "var(--cream)", fontSize: 13 }}>
                Войти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN TOOLBAR */}
      {isAdmin && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl"
          style={{ background: "var(--wood-deep)", border: "1px solid rgba(212,169,106,0.25)" }}>
          <Icon name="Edit3" size={14} style={{ color: "var(--wood-mid)" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--wood-light)" }}>Режим редактирования</span>
          <div style={{ width: 1, height: 16, background: "rgba(212,169,106,0.2)" }} />
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="rounded-full px-3 py-1.5 font-medium transition-all hover:opacity-90"
            style={{ background: "var(--amber)", color: "var(--wood-deep)", fontSize: 12 }}>
            {saved ? "✓ Сохранено" : "Сохранить"}
          </button>
          <button onClick={() => setIsAdmin(false)}
            className="rounded-full px-3 py-1.5 transition-all hover:opacity-60"
            style={{ color: "rgba(212,169,106,0.5)", fontSize: 12 }}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}