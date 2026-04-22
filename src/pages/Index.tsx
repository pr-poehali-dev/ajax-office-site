import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ── Images ── */
const IMG_HERO   = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/b33c7890-f5b7-47da-b45a-ef3491897785.jpg";
const IMG_SUNSET = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/b6f655e9-3b24-4554-8d7d-a85f560b7e31.jpg";
const IMG_OFFICE = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/3f88d22c-904c-40ca-a3f6-65f6783591f1.jpg";
const IMG_APT    = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/97757112-680b-4d09-bee8-284758aceb39.jpg";
const LOGO_URL   = "https://cdn.poehali.dev/files/fee01970-62d5-4486-bb5c-7c5a78bfb6cc.png";

/* ── Nav ── */
const NAV = [
  { label: "Главная",    href: "#home"     },
  { label: "О компании", href: "#about"    },
  { label: "Наш офис",   href: "#office"   },
  { label: "Услуги",     href: "#services" },
  { label: "Объекты",    href: "#catalog"  },
  { label: "Новости",    href: "#news"     },
  { label: "Отзывы",     href: "#reviews"  },
  { label: "Контакты",   href: "#contacts" },
];

const SERVICES = [
  { icon: "Building2",  title: "Квартиры",                 desc: "Новостройки и вторичное жильё в Анапе и Краснодарском крае" },
  { icon: "Home",       title: "Дома и коттеджи",          desc: "Частные дома, таунхаусы и коттеджи у моря и в черте города" },
  { icon: "Landmark",   title: "Земельные участки",        desc: "ИЖС, СНТ, коммерческое назначение — любые категории земель" },
  { icon: "Store",      title: "Коммерческая",             desc: "Офисы, торговые помещения, склады, гостиницы, апартаменты" },
  { icon: "TrendingUp", title: "Инвестирование",           desc: "Подбор объектов с максимальной доходностью и ростом капитала" },
  { icon: "FileText",   title: "Юридическое сопровождение",desc: "Проверка документов, безопасное оформление сделки под ключ" },
];

const TEAM = [
  { name: "Елена Морозова",  role: "Директор агентства",         exp: "27 лет" },
  { name: "Андрей Климов",   role: "Старший риелтор",            exp: "14 лет" },
  { name: "Наталья Белова",  role: "Специалист по новостройкам", exp: "9 лет"  },
  { name: "Иван Соколов",    role: "Юрист по недвижимости",      exp: "11 лет" },
];

const PROPERTIES = [
  { id: 1, type: "Квартира",     title: "ЖК «Морской Горизонт»",  location: "Центр Анапы",  price: 6200000,  area: 54,  rooms: 2, image: IMG_APT,    badge: "Новостройка" },
  { id: 2, type: "Квартира",     title: "ЖК «Солнечный берег»",   location: "Пляжная зона", price: 4800000,  area: 38,  rooms: 1, image: IMG_HERO,   badge: "Эксклюзив"  },
  { id: 3, type: "Дом",          title: "Коттедж у моря",          location: "Витязево",     price: 18500000, area: 180, rooms: 5, image: IMG_SUNSET, badge: "Премиум"    },
  { id: 4, type: "Земля",        title: "Участок ИЖС 8 соток",     location: "Джемете",      price: 3200000,  area: 800, rooms: 0, image: IMG_OFFICE, badge: "Выгодно"    },
  { id: 5, type: "Коммерческая", title: "Апарт-отель 12 номеров",  location: "Набережная",   price: 42000000, area: 320, rooms: 0, image: IMG_APT,    badge: "Инвестиции" },
  { id: 6, type: "Квартира",     title: "Апартаменты с видом",     location: "Центр Анапы",  price: 9100000,  area: 72,  rooms: 3, image: IMG_SUNSET, badge: "Видовые"    },
];

const NEWS = [
  { date: "20 апреля 2026", tag: "Новостройки",      title: "Старт продаж ЖК «Морской Горизонт» — специальные цены",       img: IMG_APT,    excerpt: "Новый ЖК в 200 м от набережной открыл продажи. Первые 20 квартир — по ценам старта." },
  { date: "14 апреля 2026", tag: "Законодательство", title: "Изменения в семейной ипотеке 2026: что важно знать покупателям", img: IMG_HERO,   excerpt: "С мая вступают в силу поправки к программе семейной ипотеки. Рассказываем, кого они коснутся." },
  { date: "5 апреля 2026",  tag: "Советы",           title: "5 ошибок при покупке недвижимости в курортном городе",          img: IMG_SUNSET, excerpt: "Специалисты делятся опытом: как не попасть в типичные ловушки при покупке жилья у моря." },
];

const REVIEWS = [
  { name: "Светлана К.", city: "Москва",    stars: 5, text: "Купили квартиру в Анапе за 3 недели. Всё прозрачно, никаких скрытых комиссий. Елена лично сопровождала на каждом этапе. Горячо рекомендуем!" },
  { name: "Михаил Г.",   city: "Воронеж",   stars: 5, text: "Продавали дом — думали займёт полгода. АЯКС нашёл покупателя за месяц по отличной цене. Профессиональная команда." },
  { name: "Ирина Т.",    city: "Краснодар", stars: 5, text: "Инвестировали в апарт-отель. Андрей подобрал правильный объект. Через год получаем стабильный доход. Спасибо!" },
];

const FAQ = [
  { q: "Сколько стоят ваши услуги?",                  a: "Для покупателей консультация и подбор объекта — бесплатно. Комиссия взимается только при успешном завершении сделки." },
  { q: "Работаете ли вы с ипотекой?",                  a: "Да, мы аккредитованы у ведущих банков и помогаем оформить ипотеку на выгодных условиях, в том числе льготную семейную." },
  { q: "Как долго длится сделка купли-продажи?",       a: "В среднем 2–4 недели. Юридическая проверка и оформление документов включены в нашу услугу полностью." },
  { q: "Проверяете ли вы чистоту объекта?",            a: "Обязательно. Наш юрист проверяет историю объекта, обременения, задолженности и права собственника до подписания." },
  { q: "Можно ли купить недвижимость дистанционно?",   a: "Да, мы практикуем онлайн-показы и электронное оформление сделок. Многие наши клиенты приобретают из других городов." },
];

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(".0", "")} млн ₽` : `${Math.round(n / 1000)} тыс. ₽`;

/* ──────────────────────────────────────────────────────────
   ANCHOR SVGs — якорь, компас, штурвал (inline, gold)
────────────────────────────────────────────────────────── */
const AnchorSvg = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="20"/>
    <path d="M5 11h14"/><path d="M5 20c0-3 3-4 7-4s7 1 7 4"/>
  </svg>
);
const CompassSvg = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="rgba(212,175,55,.3)" stroke="#D4AF37"/>
  </svg>
);
const HelmSvg = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/>
    <line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/>
    <line x1="5.64" y1="5.64" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="18.36" y2="18.36"/>
    <line x1="5.64" y1="18.36" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="18.36" y2="5.64"/>
  </svg>
);

/* ──────────────────────────────────────────────────────────
   WAVE HEADER (бирюзовый паттерн)
────────────────────────────────────────────────────────── */
const WavePattern = ({ opacity = 0.12 }: { opacity?: number }) => (
  <svg
    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", pointerEvents: "none", opacity }}
    viewBox="0 0 1440 120" preserveAspectRatio="none"
  >
    <path d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1350,40 1440,60 L1440,120 L0,120 Z" fill="#20B2AA"/>
    <path d="M0,80 C240,110 480,50 720,80 C960,110 1200,50 1440,80 L1440,120 L0,120 Z" fill="#20B2AA" opacity="0.5"/>
  </svg>
);

/* ──────────────────────────────────────────────────────────
   MAIN
────────────────────────────────────────────────────────── */
export default function Index() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [showTop,     setShowTop]     = useState(false);
  const [chatOpen,    setChatOpen]    = useState(false);
  const [typeFilter,  setTypeFilter]  = useState("Все");
  const [priceFilter, setPriceFilter] = useState("Все");
  const [areaFilter,  setAreaFilter]  = useState("Все");
  const [locFilter,   setLocFilter]   = useState("Все");
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);

  useEffect(() => {
    const h = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 500); };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const types     = ["Все", "Квартира", "Дом", "Земля", "Коммерческая"];
  const prices    = ["Все", "до 5 млн", "5–10 млн", "10–20 млн", "от 20 млн"];
  const areas     = ["Все", "до 50 м²", "50–100 м²", "от 100 м²"];
  const locations = ["Все", "Центр Анапы", "Набережная", "Пляжная зона", "Витязево", "Джемете"];

  const filtered = PROPERTIES.filter(p => {
    const tOk = typeFilter === "Все" || p.type === typeFilter;
    const pOk = priceFilter === "Все"
      || (priceFilter === "до 5 млн"  && p.price < 5_000_000)
      || (priceFilter === "5–10 млн"  && p.price >= 5_000_000  && p.price < 10_000_000)
      || (priceFilter === "10–20 млн" && p.price >= 10_000_000 && p.price < 20_000_000)
      || (priceFilter === "от 20 млн" && p.price >= 20_000_000);
    const aOk = areaFilter === "Все"
      || (areaFilter === "до 50 м²"   && p.area < 50)
      || (areaFilter === "50–100 м²"  && p.area >= 50 && p.area <= 100)
      || (areaFilter === "от 100 м²"  && p.area > 100);
    const lOk = locFilter === "Все" || p.location === locFilter;
    return tOk && pOk && aOk && lOk;
  });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* ── Общие стили для select/input ── */
  const inputStyle = {
    border: "1px solid rgba(212,175,55,.35)",
    background: "var(--off-white)",
    color: "var(--text-body)",
    fontFamily: "'Georgia', serif",
    fontSize: "0.95rem",
    padding: "10px 14px",
    outline: "none",
    width: "100%",
  } as React.CSSProperties;

  return (
    <div style={{ background: "var(--canvas)" }}>

      {/* ════════════════════════════
          NAVBAR
      ════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(0,47,95,.97)" : "rgba(0,47,95,.82)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(212,175,55,.3)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,.4)" : "none",
        transition: "all .4s ease",
      }}>
        {/* Gold top stripe */}
        <div style={{ height: 2, background: "linear-gradient(90deg, transparent 0%, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent 100%)" }} />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>
          <a href="#home">
            <img src={LOGO_URL} alt="АЯКС НА БЕРЕГУ" style={{ height: 60, width: "auto" }} />
          </a>

          <div className="hidden xl:flex items-center gap-7">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="nav-link"
                style={{ color: "rgba(255,255,255,.82)", textDecoration: "none" }}>
                {n.label}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <a href="tel:+79061876057" data-tip="Позвонить"
              className="flex items-center gap-2 transition-opacity hover:opacity-75"
              style={{ color: "var(--gold-light)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
              <Icon name="Phone" size={14} />
              8 906 187 60 57
            </a>
            <button className="btn-gold-premium" onClick={() => scrollTo("contacts")}>
              Получить консультацию
            </button>
          </div>

          <button className="xl:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "rgba(255,255,255,.9)" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="xl:hidden px-6 pb-6 pt-2"
            style={{ background: "rgba(0,47,95,.98)", borderTop: "1px solid rgba(212,175,55,.2)" }}>
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                className="block py-3 border-b"
                style={{ color: "rgba(255,255,255,.8)", fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderColor: "rgba(212,175,55,.15)" }}>
                {n.label}
              </a>
            ))}
            <a href="tel:+79061876057" className="flex items-center gap-2 mt-5"
              style={{ color: "var(--gold-light)", textDecoration: "none", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>
              <Icon name="Phone" size={14} /> 8 906 187 60 57
            </a>
            <button className="btn-gold-premium w-full mt-3" onClick={() => { scrollTo("contacts"); setMenuOpen(false); }}>
              Получить консультацию
            </button>
          </div>
        )}
      </nav>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section id="home" className="relative wave-teal-bottom" style={{ minHeight: "100vh", paddingTop: 74 }}>
        {/* Фото */}
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Набережная Анапы" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, rgba(0,47,95,.88) 0%, rgba(0,47,95,.55) 55%, rgba(0,47,95,.2) 100%)" }} />
          {/* Бирюзовые волны поверх */}
          <WavePattern opacity={0.10} />
        </div>

        {/* Canvas-overlay сверху */}
        <div className="absolute top-0 left-0 right-0" style={{ height: 4, background: "var(--gold)", opacity: 0.6 }} />

        <div className="relative z-10 flex items-center" style={{ minHeight: "calc(100vh - 74px)" }}>
          <div className="max-w-7xl mx-auto px-6 pb-24 w-full">
            <div style={{ maxWidth: 680 }}>
              {/* Метка */}
              <div className="anim-up flex items-center gap-3 mb-6">
                <AnchorSvg size={22} />
                <span style={{ color: "var(--gold)", fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Агентство недвижимости Анапы · 27 лет на рынке
                </span>
              </div>

              {/* H1 */}
              <h1 className="anim-up-1 mb-3" style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.08 }}>
                Премиальная недвижимость<br />
                <em style={{ color: "transparent", backgroundImage: "linear-gradient(160deg,#FFD700,#C5A100)", WebkitBackgroundClip: "text", backgroundClip: "text", fontStyle: "italic" }}>
                  у Черного моря
                </em>
              </h1>

              <div className="anim-up-1 my-5" style={{ height: 1, background: "linear-gradient(90deg, var(--gold) 0%, rgba(212,175,55,.3) 60%, transparent 100%)", width: 320 }} />

              <p className="anim-up-2 mb-10" style={{ color: "rgba(255,255,255,.82)", fontFamily: "'Georgia',serif", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: 520 }}>
                Эксклюзивные предложения в Анапе. Квартиры, дома, коммерческая недвижимость.
                Полное сопровождение сделки — от поиска до ключей.
              </p>

              <div className="flex flex-wrap gap-4 anim-up-3">
                <button className="btn-gold-premium" onClick={() => scrollTo("catalog")}>
                  <Icon name="Search" size={14} /> Смотреть объекты
                </button>
                <button className="btn-outline-navy"
                  style={{ borderColor: "rgba(255,255,255,.5)", color: "#fff" }}
                  onClick={() => scrollTo("contacts")}>
                  Бесплатная консультация
                </button>
              </div>
            </div>

            {/* Статистика */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 anim-up-3">
              {[
                { val: "27+",   lbl: "лет опыта",           icon: <HelmSvg size={20} /> },
                { val: "3400+", lbl: "закрытых сделок",      icon: <AnchorSvg size={20} /> },
                { val: "98%",   lbl: "довольных клиентов",   icon: <CompassSvg size={20} /> },
                { val: "№ 1",   lbl: "агентство Анапы",      icon: <HelmSvg size={20} /> },
              ].map(s => (
                <div key={s.val} className="text-center py-5 px-4"
                  style={{ background: "rgba(247,232,201,.08)", border: "1px solid rgba(212,175,55,.3)", backdropFilter: "blur(10px)" }}>
                  <div className="flex justify-center mb-2">{s.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 700, color: "var(--gold-light)", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ color: "rgba(255,255,255,.65)", fontSize: "0.78rem", marginTop: 4, fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.05em" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Канат-разделитель */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          SERVICES STRIP
      ════════════════════════════ */}
      <section className="navy-panel py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Заголовок полосы */}
          <div className="text-center mb-8">
            <span className="text-gold" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 800 }}>
              Эксклюзивные предложения для каждого клиента
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SERVICES.map(s => (
              <a href="#services" key={s.title}
                style={{ background: "rgba(247,232,201,.06)", border: "1px solid rgba(212,175,55,.2)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8, padding: "20px 12px", transition: "all .3s ease", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(247,232,201,.06)"; }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(212,175,55,.12)", border: "1px solid rgba(212,175,55,.3)" }}>
                  <Icon name={s.icon} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <span style={{ color: "rgba(255,255,255,.82)", fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.3 }}>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          ABOUT
      ════════════════════════════ */}
      <section id="about" className="canvas-panel py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">О компании</div>
              <h2 className="mb-3" style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700 }}>
                27 лет рядом с вами
              </h2>
              <h3 className="mb-6 text-gold" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", fontWeight: 600 }}>
                Надёжность, проверенная временем
              </h3>
              <p className="mb-5" style={{ color: "var(--text-body)", lineHeight: 1.85 }}>
                Агентство «АЯКС на берегу» основано в 1997 году в Анапе. За это время мы провели
                более 3&nbsp;400 сделок с недвижимостью и заслужили репутацию самого надёжного
                агентства черноморского побережья Кубани.
              </p>
              <p className="mb-8" style={{ color: "var(--text-body)", lineHeight: 1.85 }}>
                Наш офис расположен прямо на проспекте Революции, в шаге от Центральной набережной.
                Море — это не просто пейзаж за окном; это философия работы, которую мы разделяем с
                каждым клиентом.
              </p>

              <div className="gold-rule-thick mb-8" />

              {/* Преимущества */}
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { svg: <AnchorSvg size={20} />, title: "Безопасность сделок",  desc: "Юридическая проверка каждого объекта включена" },
                  { svg: <CompassSvg size={20} />, title: "Индивидуальный подход", desc: "Персональный менеджер от звонка до ключей" },
                  { svg: <HelmSvg size={20} />,   title: "Широкий выбор",         desc: "Собственная база + эксклюзивные предложения" },
                  { svg: <AnchorSvg size={20} />, title: "Опыт и репутация",      desc: "Лауреат «Лучшее агентство Кубани» 8 лет" },
                ].map(v => (
                  <div key={v.title} className="flex gap-3 items-start">
                    <div style={{ flexShrink: 0, marginTop: 2 }}>{v.svg}</div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "var(--text-sub)", marginBottom: 3 }}>{v.title}</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-light)", lineHeight: 1.5 }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-gold-premium" onClick={() => scrollTo("contacts")}>
                <AnchorSvg size={14} /> Узнать цену
              </button>
            </div>

            <div className="relative">
              <img src={IMG_SUNSET} alt="Анапа" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
              {/* Рамка-акцент */}
              <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(212,175,55,.4)", pointerEvents: "none", margin: 12 }} />
              {/* Бейдж */}
              <div style={{ position: "absolute", bottom: 28, left: 28, background: "var(--navy)", padding: "16px 20px", maxWidth: 160 }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>27</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.75)", fontFamily: "'Montserrat',sans-serif", marginTop: 4 }}>лет на рынке<br />недвижимости</div>
              </div>
            </div>
          </div>

          {/* Команда */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <div className="section-label justify-center">Наши специалисты</div>
              <h2 className="text-gold" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800 }}>Команда профессионалов</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((t, i) => (
                <div key={t.name} className="card-premium text-center p-6"
                  style={{ borderTop: "2px solid var(--gold)" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)", fontSize: "1.8rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "var(--gold)" }}>
                    {t.name[0]}
                  </div>
                  {[<AnchorSvg key="a" size={16}/>, <CompassSvg key="b" size={16}/>, <HelmSvg key="c" size={16}/>, <AnchorSvg key="d" size={16}/>][i]}
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)", margin: "8px 0 4px" }}>{t.name}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: 10 }}>{t.role}</div>
                  <span style={{ background: "linear-gradient(135deg,#FFD700,#D4AF37)", color: "var(--navy)", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", padding: "3px 12px" }}>
                    Опыт {t.exp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          OFFICE
      ════════════════════════════ */}
      <section id="office" className="py-24" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-3">
              <img src={IMG_OFFICE} alt="Офис" style={{ gridColumn: "1/-1", width: "100%", aspectRatio: "16/7", objectFit: "cover", border: "1px solid rgba(212,175,55,.3)" }} />
              <img src={IMG_HERO}   alt="Набережная" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", border: "1px solid rgba(212,175,55,.3)" }} />
              <img src={IMG_SUNSET} alt="Закат"      style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", border: "1px solid rgba(212,175,55,.3)" }} />
            </div>
            <div className="order-1 lg:order-2">
              <div className="section-label">Наш офис</div>
              <h2 className="mb-3" style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700 }}>
                На набережной Анапы
              </h2>
              <h3 className="mb-6" style={{ fontFamily: "'Playfair Display',serif", color: "var(--gold)", fontStyle: "italic", fontWeight: 600, fontSize: "1.3rem" }}>
                В самом сердце курорта
              </h3>
              <p className="mb-7" style={{ color: "var(--text-body)", lineHeight: 1.85 }}>
                Наш офис расположен в самом начале проспекта Революции, в двух шагах от Центральной
                набережной. Это не случайность — мы хотим, чтобы каждый визит ощущался как первый
                вдох морского воздуха.
              </p>

              <div className="gold-rule-thick mb-7" />

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                {[
                  { svg: <Icon name="MapPin" size={16} style={{ color: "var(--gold)" }} />, title: "Адрес",       val: "Краснодарский край, г. Анапа, пр. Революции, 3" },
                  { svg: <Icon name="Clock"  size={16} style={{ color: "var(--gold)" }} />, title: "Часы",        val: "Пн–Пт 09:00–18:00  •  Сб 10:00–16:00" },
                  { svg: <Icon name="Phone"  size={16} style={{ color: "var(--gold)" }} />, title: "Телефон",     val: "8 906 187 60 57" },
                  { svg: <Icon name="Mail"   size={16} style={{ color: "var(--gold)" }} />, title: "Email",       val: "info@ayaks-anapa.ru" },
                ].map(c => (
                  <div key={c.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--canvas)", border: "1px solid rgba(212,175,55,.3)" }}>
                      {c.svg}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 2 }}>{c.title}</div>
                      <div style={{ fontFamily: "'Georgia',serif", fontSize: "0.95rem", color: "var(--text-sub)" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Карта-заглушка */}
              <a href="https://maps.yandex.ru/?text=Анапа+проспект+Революции+3" target="_blank" rel="noreferrer"
                style={{ display: "block", height: 140, background: "linear-gradient(135deg, var(--canvas-mid), var(--teal-pale))", border: "1px solid rgba(32,178,170,.3)", position: "relative", overflow: "hidden", textDecoration: "none", marginBottom: 20 }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <CompassSvg size={32} />
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--navy)" }}>Открыть маршрут на Яндекс.Картах</span>
                  <span style={{ fontFamily: "'Georgia',serif", fontSize: "0.82rem", color: "var(--text-mid)" }}>г. Анапа, пр. Революции, 3</span>
                </div>
              </a>
              <button className="btn-navy" onClick={() => scrollTo("contacts")}>
                <Icon name="Calendar" size={14} /> Записаться на визит
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          SERVICES DETAIL
      ════════════════════════════ */}
      <section id="services" className="navy-panel wave-canvas-top py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center" style={{ color: "rgba(255,255,255,.6)" }}>Наши услуги</div>
            <h2 className="text-gold" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800 }}>
              Полный спектр услуг<br />в сфере недвижимости
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <div key={s.title}
                style={{ background: "rgba(247,232,201,.05)", border: "1px solid rgba(212,175,55,.22)", padding: "28px 28px 24px", cursor: "pointer", transition: "all .3s ease", display: "flex", flexDirection: "column", gap: 12 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,.55)"; (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,.22)"; (e.currentTarget as HTMLElement).style.background = "rgba(247,232,201,.05)"; }}>
                {/* Золотая иконка */}
                <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(212,175,55,.12)", border: "1px solid rgba(212,175,55,.3)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#fff", margin: 0 }}>{s.title}</h4>
                <p style={{ fontFamily: "'Georgia',serif", fontSize: "0.9rem", color: "rgba(255,255,255,.62)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                <button className="btn-gold-premium" style={{ marginTop: 4, fontSize: "0.7rem", padding: "10px 20px", alignSelf: "flex-start" }}
                  onClick={() => scrollTo("contacts")}>
                  Узнать цену
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CATALOG
      ════════════════════════════ */}
      <section id="catalog" className="canvas-dark-panel py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Каталог объектов</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700 }}>
              Актуальные предложения
            </h2>
            <h3 className="text-gold-solid" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontStyle: "italic", marginTop: 4 }}>
              Эксклюзивные объекты Анапы и побережья
            </h3>
          </div>

          {/* Фильтры */}
          <div style={{ background: "var(--off-white)", border: "1px solid rgba(212,175,55,.3)", padding: 20, marginBottom: 24 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Тип",     opts: types,     val: typeFilter,  set: setTypeFilter },
                { label: "Цена",    opts: prices,    val: priceFilter, set: setPriceFilter },
                { label: "Площадь", opts: areas,     val: areaFilter,  set: setAreaFilter },
                { label: "Район",   opts: locations, val: locFilter,   set: setLocFilter },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <select value={f.val} onChange={e => f.set(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", color: "var(--text-light)", marginBottom: 20 }}>
            Найдено: <strong style={{ color: "var(--navy)" }}>{filtered.length}</strong> объектов
          </p>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-light)" }}>
              <CompassSvg size={48} />
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", marginTop: 16 }}>Объекты не найдены</p>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", marginTop: 4 }}>Измените параметры фильтрации</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <div key={p.id} className="card-premium" style={{ overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
                      onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }} />
                    <div className="badge-gold" style={{ position: "absolute", top: 12, left: 12 }}>{p.badge}</div>
                    <div className="badge-navy" style={{ position: "absolute", top: 12, right: 12 }}>{p.type}</div>
                  </div>
                  <div style={{ padding: "20px 22px 22px" }}>
                    <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{p.title}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                      <Icon name="MapPin" size={12} style={{ color: "var(--teal)" }} />
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", color: "var(--text-light)" }}>{p.location}</span>
                    </div>
                    <div className="gold-rule-thick" style={{ marginBottom: 12 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <div style={{ display: "flex", gap: 12, fontSize: "0.8rem", color: "var(--text-light)", fontFamily: "'Montserrat',sans-serif" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icon name="Maximize2" size={11} />{p.area} м²</span>
                        {p.rooms > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icon name="LayoutGrid" size={11} />{p.rooms} комн.</span>}
                      </div>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)" }}>{fmt(p.price)}</span>
                    </div>
                    <button className="btn-gold-premium" style={{ width: "100%", justifyContent: "center", fontSize: "0.72rem", padding: "11px 16px" }}
                      onClick={() => scrollTo("contacts")}>
                      Узнать цену
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button className="btn-outline-navy" onClick={() => scrollTo("contacts")}>Все объекты по запросу</button>
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          NEWS
      ════════════════════════════ */}
      <section id="news" className="canvas-panel py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="section-label">Новости и советы</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700, margin: 0 }}>Полезно знать</h2>
            </div>
            <button className="btn-teal" style={{ display: "none" }}>Все статьи</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <article key={i} className="card-premium" style={{ overflow: "hidden", cursor: "pointer" }}>
                <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                  <img src={n.img} alt={n.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
                    onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,47,95,.65), transparent)" }} />
                  <div className="badge-gold" style={{ position: "absolute", bottom: 12, left: 12 }}>{n.tag}</div>
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", color: "var(--teal)", fontWeight: 600, marginBottom: 8 }}>{n.date}</div>
                  <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8, lineHeight: 1.4 }}>{n.title}</h4>
                  <p style={{ fontFamily: "'Georgia',serif", fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.65, marginBottom: 12 }}>{n.excerpt}</p>
                  <a href="#" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--teal)", fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", transition: "gap .2s" }}>
                    Читать далее <Icon name="ArrowRight" size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          REVIEWS
      ════════════════════════════ */}
      <section id="reviews" className="navy-panel wave-teal-bottom py-24" style={{ position: "relative" }}>
        <WavePattern opacity={0.08} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <div className="section-label justify-center" style={{ color: "rgba(255,255,255,.55)" }}>Отзывы клиентов</div>
            <h2 className="text-gold" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800 }}>
              Нам доверяют тысячи семей
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "rgba(247,232,201,.06)", border: "1px solid rgba(212,175,55,.25)", padding: "28px 26px 26px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} style={{ color: "var(--gold)", fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Georgia',serif", fontSize: "0.95rem", color: "rgba(255,255,255,.75)", fontStyle: "italic", lineHeight: 1.8, marginBottom: 20 }}>
                  «{r.text}»
                </p>
                <div className="gold-rule-thick" style={{ marginBottom: 18 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#D4AF37,#B8941E)", color: "var(--navy)", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>{r.name}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,.4)" }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CTA
      ════════════════════════════ */}
      <section className="py-20 relative overflow-hidden canvas-panel">
        {/* Декор */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <HelmSvg size={400} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 }}>
            <AnchorSvg size={20} />
            <div style={{ height: 1, width: 80, background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <HelmSvg size={28} />
            <div style={{ height: 1, width: 80, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
            <AnchorSvg size={20} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700, marginBottom: 8 }}>
            Готовы найти дом у моря?
          </h2>
          <p className="text-gold" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", marginBottom: 10 }}>
            Премиальная недвижимость по честным ценам
          </p>
          <p style={{ fontFamily: "'Georgia',serif", color: "var(--text-body)", lineHeight: 1.8, marginBottom: 28, maxWidth: 440, margin: "0 auto 32px" }}>
            Позвоните нам или оставьте заявку — перезвоним в течение 15 минут
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            <a href="tel:+79061876057">
              <button className="btn-gold-premium">
                <Icon name="Phone" size={14} /> Позвонить сейчас
              </button>
            </a>
            <button className="btn-navy" onClick={() => scrollTo("contacts")}>
              Получить консультацию
            </button>
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          CONTACTS
      ════════════════════════════ */}
      <section id="contacts" className="canvas-dark-panel py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="section-label">Контакты</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700, marginBottom: 8 }}>Свяжитесь с нами</h2>
              <p className="text-gold-solid" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", marginBottom: 20 }}>
                Мы работаем для вас
              </p>
              <p style={{ fontFamily: "'Georgia',serif", color: "var(--text-body)", lineHeight: 1.85, marginBottom: 28 }}>
                Мы готовы ответить на любые вопросы и подобрать объект под ваши задачи.
                Работаем с клиентами по всей России — приезжайте в офис или консультируемся онлайн.
              </p>

              <div className="gold-rule-thick" style={{ marginBottom: 24 }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
                {[
                  { icon: "MapPin", title: "Адрес",       val: "Краснодарский край, г. Анапа, пр. Революции, 3" },
                  { icon: "Phone",  title: "Телефон",     val: "8 906 187 60 57" },
                  { icon: "Mail",   title: "Email",       val: "info@ayaks-anapa.ru" },
                  { icon: "Clock",  title: "Часы работы", val: "Пн–Пт 09:00–18:00  •  Сб 10:00–16:00" },
                ].map(c => (
                  <div key={c.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 38, height: 38, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)", border: "1px solid rgba(212,175,55,.3)" }}>
                      <Icon name={c.icon} size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 3 }}>{c.title}</div>
                      <div style={{ fontFamily: "'Georgia',serif", fontSize: "0.95rem", color: "var(--text-sub)" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: "MessageCircle", tip: "WhatsApp", href: "https://wa.me/79061876057" },
                  { icon: "Send",          tip: "Telegram", href: "https://t.me/ayaks_anapa" },
                  { icon: "Globe",         tip: "ВКонтакте", href: "https://vk.com/ayaks_anapa" },
                ].map(s => (
                  <a key={s.tip} href={s.href} target="_blank" rel="noreferrer" data-tip={s.tip}
                    style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)", color: "var(--gold)", border: "1px solid rgba(212,175,55,.3)", transition: "all .25s", textDecoration: "none" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--navy)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--navy)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}>
                    <Icon name={s.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div style={{ background: "var(--off-white)", border: "1px solid rgba(212,175,55,.3)", padding: "36px 32px", borderTop: "3px solid var(--gold)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <AnchorSvg size={20} />
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>Оставить заявку</h3>
              </div>
              <p className="text-gold-solid" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.95rem", marginBottom: 20 }}>
                Бесплатная консультация специалиста
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { ph: "Ваше имя *",   type: "text" },
                  { ph: "Телефон *",    type: "tel"  },
                  { ph: "Email",        type: "email"},
                ].map(f => (
                  <input key={f.ph} type={f.type} placeholder={f.ph} style={{ ...inputStyle, border: "1px solid rgba(212,175,55,.3)" }} />
                ))}
                <select style={{ ...inputStyle, cursor: "pointer", border: "1px solid rgba(212,175,55,.3)" }}>
                  <option>Тема обращения</option>
                  <option>Купить квартиру</option>
                  <option>Купить дом</option>
                  <option>Земельный участок</option>
                  <option>Коммерческая недвижимость</option>
                  <option>Инвестиции</option>
                  <option>Продать объект</option>
                  <option>Консультация</option>
                </select>
                <textarea rows={4} placeholder="Ваши пожелания..." style={{ ...inputStyle, resize: "none", border: "1px solid rgba(212,175,55,.3)" }} />
                <button className="btn-gold-premium" style={{ justifyContent: "center" }}>
                  <Icon name="Send" size={14} /> Получить консультацию
                </button>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", textAlign: "center", color: "var(--text-light)", marginTop: 4 }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          FAQ
      ════════════════════════════ */}
      <section className="canvas-panel py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label justify-center">FAQ</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: "var(--navy)", fontWeight: 700 }}>
              Часто задаваемые вопросы
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map((f, i) => (
              <div key={i} style={{ border: "1px solid rgba(212,175,55,.3)", borderLeft: "3px solid var(--gold)", background: "var(--off-white)" }}>
                <button
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.92rem", color: "var(--navy)" }}>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 16px", fontFamily: "'Georgia',serif", fontSize: "0.92rem", color: "var(--text-body)", lineHeight: 1.8 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Канат */}
      <div className="rope-divider" />

      {/* ════════════════════════════
          FOOTER
      ════════════════════════════ */}
      <footer className="navy-panel wave-canvas-top py-14" style={{ borderTop: "2px solid var(--gold)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div style={{ gridColumn: "span 2" }}>
              <img src={LOGO_URL} alt="АЯКС НА БЕРЕГУ" style={{ height: 70, width: "auto", marginBottom: 14 }} />
              <p style={{ fontFamily: "'Georgia',serif", fontSize: "0.9rem", color: "rgba(255,255,255,.55)", maxWidth: 300, lineHeight: 1.8 }}>
                Ведущее агентство недвижимости Анапы с 1997 года. Ваш надёжный якорь у Чёрного моря.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {["MessageCircle", "Send", "Globe"].map(ic => (
                  <div key={ic} style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.25)", transition: "all .25s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,.25)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,.1)"; }}>
                    <Icon name={ic} size={14} style={{ color: "var(--gold)" }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Разделы</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {NAV.map(n => (
                  <a key={n.href} href={n.href} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,.55)", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "var(--gold)"; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,.55)"; }}>
                    {n.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Контакты</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "'Georgia',serif", fontSize: "0.88rem" }}>
                <div style={{ color: "rgba(255,255,255,.55)" }}>г. Анапа, пр. Революции, 3</div>
                <a href="tel:+79061876057" style={{ color: "var(--gold-light)", fontWeight: 600, textDecoration: "none" }}>8 906 187 60 57</a>
                <div style={{ color: "rgba(255,255,255,.55)" }}>info@ayaks-anapa.ru</div>
                <div style={{ color: "rgba(255,255,255,.4)", fontSize: "0.82rem" }}>Пн–Пт 09:00–18:00<br />Сб 10:00–16:00</div>
              </div>
            </div>
          </div>

          <div className="gold-rule-thick" style={{ marginBottom: 20 }} />

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,.3)" }}>
              © 1997–2026 АЯКС НА БЕРЕГУ. Все права защищены.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Политика конфиденциальности", "Пользовательское соглашение"].map(t => (
                <a key={t} href="#" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,.3)", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "var(--gold)"; }}
                  onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,.3)"; }}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Scroll to top ── */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-tip="Наверх"
          style={{ position: "fixed", bottom: 28, right: 28, width: 48, height: 48, background: "var(--navy)", border: "1px solid rgba(212,175,55,.4)", color: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,47,95,.4)", zIndex: 900, transition: "all .25s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--navy)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--navy)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}>
          <Icon name="ArrowUp" size={18} />
        </button>
      )}

      {/* ── Chat Widget ── */}
      <div style={{ position: "fixed", bottom: 28, left: 28, zIndex: 900 }}>
        {chatOpen && (
          <div style={{ marginBottom: 12, width: 290, background: "var(--off-white)", border: "1px solid rgba(212,175,55,.3)", borderTop: "2px solid var(--gold)", boxShadow: "0 8px 40px rgba(0,47,95,.25)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--navy)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}>Онлайн-консультант</span>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.7)" }}>
                <Icon name="X" size={14} />
              </button>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: "'Georgia',serif", fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.7, marginBottom: 12 }}>
                Здравствуйте! Помогу подобрать недвижимость в Анапе. Как вас зовут?
              </p>
              <input placeholder="Ваше сообщение..." style={{ ...inputStyle, border: "1px solid rgba(212,175,55,.3)", marginBottom: 8, fontSize: "0.85rem" }} />
              <button className="btn-gold-premium" style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "0.72rem" }}>Отправить</button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} data-tip="Написать нам"
          style={{ width: 52, height: 52, background: "var(--navy)", border: "2px solid rgba(212,175,55,.5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 24px rgba(0,47,95,.45)", transition: "all .25s", color: "var(--gold)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--navy)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--navy)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}>
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={22} />
        </button>
      </div>

    </div>
  );
}
