import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO   = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/b33c7890-f5b7-47da-b45a-ef3491897785.jpg";
const IMG_SUNSET = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/b6f655e9-3b24-4554-8d7d-a85f560b7e31.jpg";
const IMG_OFFICE = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/3f88d22c-904c-40ca-a3f6-65f6783591f1.jpg";
const IMG_APT    = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/97757112-680b-4d09-bee8-284758aceb39.jpg";
const LOGO_URL   = "https://cdn.poehali.dev/files/fee01970-62d5-4486-bb5c-7c5a78bfb6cc.png";

const NAV = [
  { label: "Главная",    href: "#home" },
  { label: "О компании", href: "#about" },
  { label: "Наш офис",   href: "#office" },
  { label: "Услуги",     href: "#services" },
  { label: "Объекты",    href: "#catalog" },
  { label: "Новости",    href: "#news" },
  { label: "Отзывы",     href: "#reviews" },
  { label: "Контакты",   href: "#contacts" },
];

const SERVICES = [
  { icon: "Building2",  title: "Квартиры",                desc: "Новостройки и вторичное жильё в Анапе и Краснодарском крае" },
  { icon: "Home",       title: "Дома и коттеджи",         desc: "Частные дома, таунхаусы и коттеджи у моря и в черте города" },
  { icon: "Landmark",   title: "Земельные участки",       desc: "ИЖС, СНТ, коммерческое назначение — любые категории земель" },
  { icon: "Store",      title: "Коммерческая",            desc: "Офисы, торговые помещения, склады, гостиницы, апартаменты" },
  { icon: "TrendingUp", title: "Инвестирование",          desc: "Подбор объектов с максимальной доходностью и ростом капитала" },
  { icon: "FileText",   title: "Юридическое сопровождение", desc: "Проверка документов, безопасное оформление сделки под ключ" },
];

const TEAM = [
  { name: "Елена Морозова",  role: "Директор агентства",        exp: "27 лет" },
  { name: "Андрей Климов",   role: "Старший риелтор",           exp: "14 лет" },
  { name: "Наталья Белова",  role: "Специалист по новостройкам", exp: "9 лет"  },
  { name: "Иван Соколов",    role: "Юрист по недвижимости",     exp: "11 лет" },
];

const PROPERTIES = [
  { id: 1, type: "Квартира",     title: "ЖК «Морской Горизонт»",   location: "Центр Анапы",  price: 6200000,  area: 54,  rooms: 2, image: IMG_APT,    badge: "Новостройка" },
  { id: 2, type: "Квартира",     title: "ЖК «Солнечный берег»",    location: "Пляжная зона", price: 4800000,  area: 38,  rooms: 1, image: IMG_HERO,   badge: "Горящее" },
  { id: 3, type: "Дом",          title: "Коттедж у моря",           location: "Витязево",     price: 18500000, area: 180, rooms: 5, image: IMG_SUNSET, badge: "Эксклюзив" },
  { id: 4, type: "Земля",        title: "Участок ИЖС 8 соток",      location: "Джемете",      price: 3200000,  area: 800, rooms: 0, image: IMG_OFFICE, badge: "Выгодно" },
  { id: 5, type: "Коммерческая", title: "Апарт-отель 12 номеров",   location: "Набережная",   price: 42000000, area: 320, rooms: 0, image: IMG_APT,    badge: "Инвестиции" },
  { id: 6, type: "Квартира",     title: "Апартаменты с видом",      location: "Центр Анапы",  price: 9100000,  area: 72,  rooms: 3, image: IMG_SUNSET, badge: "Видовые" },
];

const NEWS = [
  { date: "20 апреля 2026", tag: "Новостройки",      title: "Старт продаж ЖК «Морской Горизонт» — специальные цены", excerpt: "Новый ЖК в 200 м от набережной открыл продажи. Первые 20 квартир — по ценам старта." },
  { date: "14 апреля 2026", tag: "Законодательство", title: "Изменения в семейной ипотеке 2026: что важно знать",     excerpt: "С мая вступают в силу поправки к программе семейной ипотеки. Рассказываем, кого они коснутся." },
  { date: "5 апреля 2026",  tag: "Советы",           title: "5 ошибок при покупке недвижимости в курортном городе",   excerpt: "Специалисты «АЯКС на берегу» делятся опытом: как не попасть в типичные ловушки." },
];

const REVIEWS = [
  { name: "Светлана К.", city: "Москва",    stars: 5, text: "Купили квартиру в Анапе за 3 недели. Всё прозрачно, никаких скрытых комиссий. Елена лично сопровождала на каждом этапе. Рекомендуем!" },
  { name: "Михаил Г.",   city: "Воронеж",   stars: 5, text: "Продавали дом — думали займёт полгода. АЯКС нашёл покупателя за месяц по хорошей цене. Очень профессиональная команда." },
  { name: "Ирина Т.",    city: "Краснодар", stars: 5, text: "Инвестировали в апарт-отель. Андрей помог выбрать правильный объект. Через год получаем стабильный доход." },
];

const FAQ = [
  { q: "Сколько стоят ваши услуги?",                  a: "Для покупателей консультация и подбор объекта — бесплатно. Комиссия взимается только при успешном завершении сделки." },
  { q: "Работаете ли вы с ипотекой?",                  a: "Да, мы аккредитованы у ведущих банков и помогаем оформить ипотеку на выгодных условиях, в том числе льготную." },
  { q: "Как долго длится сделка купли-продажи?",       a: "В среднем 2–4 недели. Юридическая проверка и оформление документов включены в нашу услугу." },
  { q: "Проверяете ли вы чистоту объекта?",            a: "Обязательно. Наш юрист проверяет историю объекта, обременения, задолженности и права собственника." },
  { q: "Можно ли купить недвижимость дистанционно?",   a: "Да, мы практикуем онлайн-показы и электронное оформление сделок. Многие наши клиенты из других городов." },
];

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(".0", "")} млн ₽` : `${Math.round(n / 1000)} тыс. ₽`;

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
    const h = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 400); };
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

  return (
    <div style={{ background: "#fff", fontFamily: "'Inter', sans-serif", color: "var(--text-dark)" }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 2px 20px rgba(26,94,138,.12)" : "none",
          borderBottom: "1px solid rgba(93,173,226,.2)",
        }}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
          <a href="#home"><img src={LOGO_URL} alt="АЯКС НА БЕРЕГУ" className="h-10 w-auto" /></a>

          <div className="hidden xl:flex items-center gap-6">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="nav-link text-xs font-medium"
                style={{ color: "var(--text-dark)", letterSpacing: "0.03em" }}>
                {n.label}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <a href="tel:+79061876057" data-tip="Позвонить"
              className="flex items-center gap-2 font-semibold text-sm transition-colors hover:text-[var(--sea)]"
              style={{ color: "var(--sea-deep)" }}>
              <Icon name="Phone" size={15} />8 906 187 60 57
            </a>
            <button className="btn-sea ml-1" onClick={() => scrollTo("contacts")}>Связаться с нами</button>
          </div>

          <button className="xl:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "var(--sea-deep)" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="xl:hidden px-5 pb-5 pt-1" style={{ background: "#fff", borderTop: "1px solid var(--sea-pale)" }}>
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-medium border-b"
                style={{ color: "var(--text-dark)", borderColor: "var(--sea-pale)" }}>
                {n.label}
              </a>
            ))}
            <a href="tel:+79061876057" className="flex items-center gap-2 mt-4 font-semibold" style={{ color: "var(--sea)" }}>
              <Icon name="Phone" size={14} />8 906 187 60 57
            </a>
            <button className="btn-sea w-full mt-3">Связаться с нами</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative" style={{ minHeight: "100vh", paddingTop: 64 }}>
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Набережная Анапы" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(26,94,138,.82)0%,rgba(26,94,138,.4)55%,rgba(0,0,0,.15)100%)" }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,30 1440,40 L1440,80 L0,80 Z" fill="#fff" />
          </svg>
        </div>
        <div className="relative z-10 flex items-center" style={{ minHeight: "calc(100vh - 64px)" }}>
          <div className="max-w-7xl mx-auto px-5 pb-20 w-full">
            <div className="max-w-2xl">
              <div className="section-label anim-up" style={{ color: "rgba(255,255,255,.85)" }}>
                Агентство недвижимости Анапы · 27 лет на рынке
              </div>
              <h1 className="anim-up-1 mb-5 font-semibold leading-tight"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.4rem,5.5vw,4.2rem)", color: "#fff" }}>
                Ваша недвижимость<br />
                <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>у Черного моря</em>
              </h1>
              <p className="anim-up-2 mb-9 leading-relaxed" style={{ color: "rgba(255,255,255,.82)", fontSize: "1.05rem", maxWidth: 480 }}>
                Более 27 лет мы помогаем жителям России обрести дом мечты в солнечной Анапе.
                Квартиры, дома, земля, коммерция — полное сопровождение сделки.
              </p>
              <div className="flex flex-wrap gap-3 anim-up-3">
                <a href="#catalog"><button className="btn-gold">Смотреть объекты</button></a>
                <button className="btn-outline-sea" style={{ color: "#fff", borderColor: "rgba(255,255,255,.6)" }}
                  onClick={() => scrollTo("contacts")}>
                  Бесплатная консультация
                </button>
              </div>
            </div>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 anim-up-3">
              {[
                { val: "27+",   lbl: "лет опыта" },
                { val: "3400+", lbl: "закрытых сделок" },
                { val: "98%",   lbl: "довольных клиентов" },
                { val: "№ 1",   lbl: "агентство Анапы" },
              ].map(s => (
                <div key={s.val} className="text-center px-4 py-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.25)" }}>
                  <div className="font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "var(--gold-light)" }}>{s.val}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,.75)" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section style={{ background: "var(--sea-pale)", borderBottom: "1px solid rgba(93,173,226,.2)" }} className="py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SERVICES.map(s => (
              <a href="#services" key={s.title}
                className="card-hover flex flex-col items-center text-center gap-2 p-5 rounded-xl cursor-pointer"
                style={{ background: "#fff", border: "1px solid rgba(93,173,226,.2)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "var(--sea-pale)" }}>
                  <Icon name={s.icon} size={20} style={{ color: "var(--sea)" }} />
                </div>
                <span className="text-xs font-semibold leading-snug" style={{ color: "var(--text-dark)" }}>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">О компании</div>
              <h2 className="mb-5 font-semibold leading-snug"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text-dark)" }}>
                27 лет рядом с вами —<br />
                <em style={{ color: "var(--sea)", fontStyle: "italic" }}>надёжность проверена временем</em>
              </h2>
              <p className="mb-4 leading-relaxed text-sm" style={{ color: "var(--text-mid)" }}>
                Агентство «АЯКС на берегу» основано в 1997 году. За это время мы провели более 3 400 сделок
                и заслужили репутацию самого надёжного агентства Анапы. Наш офис расположен прямо на набережной —
                потому что море — это не просто пейзаж, это образ жизни, который мы разделяем с нашими клиентами.
              </p>
              <p className="mb-8 leading-relaxed text-sm" style={{ color: "var(--text-mid)" }}>
                Мы не гонимся за объёмом — мы строим отношения. Каждый клиент получает персонального менеджера,
                юридическую защиту сделки и поддержку после её закрытия.
              </p>
              <hr className="gold-line mb-8" />
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { icon: "ShieldCheck", title: "Безопасность сделок",  desc: "Юридическая проверка каждого объекта включена в стоимость" },
                  { icon: "Users",       title: "Индивидуальный подход", desc: "Персональный менеджер ведёт вас от первого звонка до ключей" },
                  { icon: "Globe",       title: "Широкий выбор",         desc: "Собственная база объектов + эксклюзивные предложения" },
                  { icon: "Award",       title: "Опыт и репутация",      desc: "Лауреат рейтинга «Лучшее агентство Кубани» 8 лет подряд" },
                ].map(v => (
                  <div key={v.title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "var(--sea-pale)" }}>
                      <Icon name={v.icon} size={16} style={{ color: "var(--sea)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-dark)" }}>{v.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: "var(--text-mid)" }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-sea" onClick={() => scrollTo("contacts")}>Связаться с нами</button>
            </div>
            <div className="relative">
              <img src={IMG_SUNSET} alt="Анапа" className="w-full rounded-xl object-cover" style={{ aspectRatio: "4/3" }} />
              <div className="absolute -bottom-5 -right-5 p-5 rounded-xl shadow-xl"
                style={{ background: "var(--sea)", color: "#fff", maxWidth: 180 }}>
                <div className="font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem" }}>27</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>лет на рынке недвижимости Анапы</div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mt-20">
            <h3 className="text-center mb-10 font-semibold"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", color: "var(--text-dark)" }}>
              Наша команда
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map(t => (
                <div key={t.name} className="card-hover text-center p-6 rounded-xl"
                  style={{ border: "1px solid rgba(93,173,226,.2)", background: "var(--sea-pale)" }}>
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                    style={{ background: "var(--sea)", color: "#fff", fontFamily: "'Playfair Display',serif" }}>
                    {t.name[0]}
                  </div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-dark)" }}>{t.name}</div>
                  <div className="text-xs mb-2" style={{ color: "var(--text-mid)" }}>{t.role}</div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: "rgba(41,128,185,.12)", color: "var(--sea)" }}>
                    Опыт {t.exp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE ── */}
      <section id="office" className="py-24" style={{ background: "var(--sea-pale)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <img src={IMG_OFFICE} alt="Офис" className="rounded-xl w-full object-cover col-span-2" style={{ aspectRatio: "16/7" }} />
              <img src={IMG_HERO}   alt="Набережная" className="rounded-xl w-full object-cover" style={{ aspectRatio: "4/3" }} />
              <img src={IMG_SUNSET} alt="Закат"      className="rounded-xl w-full object-cover" style={{ aspectRatio: "4/3" }} />
            </div>
            <div className="order-1 lg:order-2">
              <div className="section-label">Наш офис</div>
              <h2 className="mb-4 font-semibold"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "var(--text-dark)" }}>
                На набережной Анапы —<br /><em style={{ color: "var(--sea)", fontStyle: "italic" }}>в сердце города</em>
              </h2>
              <p className="mb-7 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                Наш офис расположен в самом начале проспекта Революции, в двух шагах от Центральной набережной.
                Это не случайно: мы хотим, чтобы каждый визит ощущался как первый день отпуска у моря.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "MapPin", title: "Адрес",       val: "Краснодарский край, г. Анапа, пр. Революции, 3" },
                  { icon: "Clock",  title: "Часы работы", val: "Пн–Пт 09:00–18:00  •  Сб 10:00–16:00" },
                  { icon: "Phone",  title: "Телефон",     val: "8 906 187 60 57" },
                  { icon: "Mail",   title: "Email",       val: "info@ayaks-anapa.ru" },
                ].map(c => (
                  <div key={c.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: "#fff", border: "1px solid rgba(93,173,226,.3)" }}>
                      <Icon name={c.icon} size={16} style={{ color: "var(--sea)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--text-light)" }}>{c.title}</div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-dark)" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://maps.yandex.ru/?text=Анапа+проспект+Революции+3" target="_blank" rel="noreferrer">
                <div className="rounded-xl overflow-hidden mb-5 cursor-pointer group relative"
                  style={{ height: 150, background: "linear-gradient(135deg,var(--sea-pale),var(--sky))", border: "1px solid rgba(93,173,226,.3)" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Icon name="MapPin" size={30} style={{ color: "var(--sea)" }} />
                    <span className="text-sm font-semibold" style={{ color: "var(--sea-deep)" }}>Открыть маршрут на Яндекс.Картах</span>
                    <span className="text-xs" style={{ color: "var(--text-mid)" }}>г. Анапа, пр. Революции, 3</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(41,128,185,.08)" }} />
                </div>
              </a>
              <button className="btn-sea" onClick={() => scrollTo("contacts")}>Записаться на визит</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <div className="section-label justify-center">Наши услуги</div>
            <h2 className="font-semibold"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text-dark)" }}>
              Полный спектр услуг<br />в сфере недвижимости Анапы
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="card-hover p-7 rounded-xl group cursor-pointer"
                style={{ background: i % 2 === 0 ? "var(--sea-pale)" : "#fff", border: "1px solid rgba(93,173,226,.2)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--sea)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "#fff" }} />
                </div>
                <h3 className="mb-2 font-semibold"
                  style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "var(--text-dark)" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-mid)" }}>{s.desc}</p>
                <button className="btn-outline-sea text-xs py-2 px-4" onClick={() => scrollTo("contacts")}>
                  Узнать больше
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-24" style={{ background: "var(--sand-light)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Наши объекты</div>
            <h2 className="font-semibold"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text-dark)" }}>
              Актуальные предложения
            </h2>
          </div>
          <div className="rounded-xl p-5 mb-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ background: "#fff", border: "1px solid rgba(93,173,226,.2)", boxShadow: "0 2px 16px rgba(26,94,138,.06)" }}>
            {[
              { label: "Тип",     opts: types,     val: typeFilter,  set: setTypeFilter },
              { label: "Цена",    opts: prices,    val: priceFilter, set: setPriceFilter },
              { label: "Площадь", opts: areas,     val: areaFilter,  set: setAreaFilter },
              { label: "Район",   opts: locations, val: locFilter,   set: setLocFilter },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-light)" }}>
                  {f.label}
                </label>
                <select value={f.val} onChange={e => f.set(e.target.value)}
                  className="w-full text-sm px-3 py-2.5 rounded-lg outline-none"
                  style={{ border: "1.5px solid rgba(93,173,226,.35)", background: "var(--sea-pale)", color: "var(--text-dark)" }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <p className="mb-5 text-sm" style={{ color: "var(--text-mid)" }}>
            Найдено: <strong style={{ color: "var(--text-dark)" }}>{filtered.length}</strong> объектов
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: "var(--text-mid)" }}>
              <div className="mb-3 flex justify-center"><Icon name="SearchX" size={42} style={{ color: "var(--sea-light)" }} /></div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem" }}>Объекты не найдены</p>
              <p className="text-sm mt-1">Измените параметры фильтрации</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <div key={p.id} className="card-hover rounded-xl overflow-hidden"
                  style={{ background: "#fff", border: "1px solid rgba(93,173,226,.2)" }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-md"
                      style={{ background: "var(--gold)", color: "var(--text-dark)" }}>{p.badge}</span>
                    <span className="absolute top-3 right-3 text-xs px-2.5 py-1.5 rounded-md"
                      style={{ background: "rgba(26,94,138,.85)", color: "#fff" }}>{p.type}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1 font-semibold"
                      style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "var(--text-dark)" }}>
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Icon name="MapPin" size={12} style={{ color: "var(--sea)" }} />
                      <span className="text-xs" style={{ color: "var(--text-mid)" }}>{p.location}</span>
                    </div>
                    <hr className="gold-line mb-3" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-3 text-xs" style={{ color: "var(--text-mid)" }}>
                        <span className="flex items-center gap-1"><Icon name="Maximize2" size={11} />{p.area} м²</span>
                        {p.rooms > 0 && <span className="flex items-center gap-1"><Icon name="LayoutGrid" size={11} />{p.rooms} комн.</span>}
                      </div>
                      <span className="font-bold" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "var(--sea-deep)" }}>
                        {fmt(p.price)}
                      </span>
                    </div>
                    <button className="btn-sea w-full justify-center py-2.5 text-xs" onClick={() => scrollTo("contacts")}>
                      Связаться для просмотра
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <button className="btn-outline-sea" onClick={() => scrollTo("contacts")}>Все объекты по запросу</button>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="section-label">Новости и советы</div>
              <h2 className="font-semibold"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "var(--text-dark)" }}>
                Полезно знать
              </h2>
            </div>
            <button className="hidden md:block btn-outline-sea">Все статьи</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <article key={i} className="card-hover rounded-xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid rgba(93,173,226,.2)" }}>
                <div className="relative overflow-hidden" style={{ height: 176 }}>
                  <img src={[IMG_APT, IMG_HERO, IMG_SUNSET][i]} alt={n.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(26,94,138,.6),transparent)" }} />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{ background: "var(--gold)", color: "var(--text-dark)" }}>{n.tag}</span>
                </div>
                <div className="p-5">
                  <div className="text-xs mb-2 font-medium" style={{ color: "var(--sea)" }}>{n.date}</div>
                  <h3 className="font-semibold mb-2 leading-snug hover:text-[var(--sea)] transition-colors"
                    style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "var(--text-dark)" }}>
                    {n.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>{n.excerpt}</p>
                  <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--sea)" }}>
                    Читать далее <Icon name="ArrowRight" size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24" style={{ background: "var(--sea-deep)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <div className="section-label justify-center" style={{ color: "rgba(255,255,255,.7)" }}>Отзывы клиентов</div>
            <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "#fff" }}>
              Нам доверяют тысячи семей
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-7 rounded-xl"
                style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.15)" }}>
                <div className="flex mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} style={{ color: "var(--gold-light)", fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,.78)", fontStyle: "italic" }}>«{r.text}»</p>
                <hr className="gold-line mb-5" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{ background: "var(--sea-light)", color: "#fff", fontFamily: "'Playfair Display',serif" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#fff" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,.45)" }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg,var(--gold)0%,#E8B422 100%)" }} className="py-16">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="mb-3 font-semibold"
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", color: "var(--text-dark)" }}>
            Готовы найти дом у моря?
          </h2>
          <p className="text-sm mb-7 mx-auto" style={{ color: "rgba(28,43,58,.75)", maxWidth: 420 }}>
            Позвоните нам или оставьте заявку — перезвоним в течение 15 минут
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+79061876057">
              <button className="btn-sea"><Icon name="Phone" size={14} />Позвонить сейчас</button>
            </a>
            <button className="btn-outline-sea" style={{ borderColor: "var(--sea-deep)", color: "var(--sea-deep)" }}
              onClick={() => scrollTo("contacts")}>
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24" style={{ background: "var(--sea-pale)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="section-label">Контакты</div>
              <h2 className="mb-5 font-semibold"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "var(--text-dark)" }}>
                Свяжитесь с нами
              </h2>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-mid)" }}>
                Мы готовы ответить на любые вопросы и подобрать объект под ваши задачи.
                Работаем для всей России — приезжайте в офис или консультируем онлайн.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { icon: "MapPin", title: "Адрес",       val: "Краснодарский край, г. Анапа, пр. Революции, 3" },
                  { icon: "Phone",  title: "Телефон",     val: "8 906 187 60 57" },
                  { icon: "Mail",   title: "Email",       val: "info@ayaks-anapa.ru" },
                  { icon: "Clock",  title: "Часы работы", val: "Пн–Пт 09:00–18:00  •  Сб 10:00–16:00" },
                ].map(c => (
                  <div key={c.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: "#fff", border: "1.5px solid rgba(93,173,226,.3)" }}>
                      <Icon name={c.icon} size={16} style={{ color: "var(--sea)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--text-light)" }}>{c.title}</div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-dark)" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[
                  { icon: "MessageCircle", tip: "WhatsApp",  href: "https://wa.me/79061876057" },
                  { icon: "Send",          tip: "Telegram",  href: "https://t.me/ayaks_anapa" },
                  { icon: "Globe",         tip: "ВКонтакте", href: "https://vk.com/ayaks_anapa" },
                ].map(s => (
                  <a key={s.tip} href={s.href} target="_blank" rel="noreferrer" data-tip={s.tip}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "var(--sea)", color: "#fff" }}>
                    <Icon name={s.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-8" style={{ background: "#fff", boxShadow: "0 4px 32px rgba(26,94,138,.1)" }}>
              <h3 className="mb-5 font-semibold"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: "var(--text-dark)" }}>
                Оставить заявку
              </h3>
              <div className="space-y-4">
                {[
                  { ph: "Ваше имя *",   type: "text" },
                  { ph: "Телефон *",    type: "tel"  },
                  { ph: "Email",        type: "email"},
                ].map(f => (
                  <input key={f.ph} type={f.type} placeholder={f.ph}
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none"
                    style={{ border: "1.5px solid rgba(93,173,226,.3)", background: "var(--sea-pale)", color: "var(--text-dark)" }} />
                ))}
                <select className="w-full px-4 py-3 text-sm rounded-lg outline-none"
                  style={{ border: "1.5px solid rgba(93,173,226,.3)", background: "var(--sea-pale)", color: "var(--text-mid)" }}>
                  <option>Тема обращения</option>
                  <option>Купить квартиру</option>
                  <option>Купить дом</option>
                  <option>Земельный участок</option>
                  <option>Коммерческая недвижимость</option>
                  <option>Инвестиции</option>
                  <option>Продать объект</option>
                  <option>Консультация</option>
                </select>
                <textarea rows={4} placeholder="Ваш вопрос или пожелания..."
                  className="w-full px-4 py-3 text-sm rounded-lg outline-none resize-none"
                  style={{ border: "1.5px solid rgba(93,173,226,.3)", background: "var(--sea-pale)", color: "var(--text-dark)" }} />
                <button className="btn-sea w-full justify-center py-3.5">
                  <Icon name="Send" size={14} />Отправить заявку
                </button>
                <p className="text-xs text-center" style={{ color: "var(--text-light)" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff" }} className="py-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="section-label justify-center">FAQ</div>
            <h2 className="font-semibold"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "var(--text-dark)" }}>
              Часто задаваемые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(93,173,226,.2)" }}>
                <button className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm transition-colors"
                  style={{ background: openFaq === i ? "var(--sea-pale)" : "#fff", color: "var(--text-dark)" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16}
                    style={{ color: "var(--sea)", flexShrink: 0, marginLeft: 12 }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-mid)", background: "var(--sea-pale)" }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--text-dark)", color: "rgba(255,255,255,.6)" }} className="py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <img src={LOGO_URL} alt="АЯКС НА БЕРЕГУ" className="h-12 w-auto mb-4" style={{ filter: "brightness(0) invert(1)" }} />
              <p className="text-sm leading-relaxed mb-5" style={{ maxWidth: 290 }}>
                Ведущее агентство недвижимости Анапы с 1997 года. Ваш надёжный партнёр у Чёрного моря.
              </p>
              <div className="flex gap-3">
                {["MessageCircle", "Send", "Globe"].map(ic => (
                  <div key={ic} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)" }}>
                    <Icon name={ic} size={14} style={{ color: "var(--sky)" }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-[.18em] uppercase mb-4" style={{ color: "var(--gold-light)" }}>Разделы</h4>
              <div className="space-y-2">
                {NAV.map(n => (
                  <a key={n.href} href={n.href} className="block text-sm transition-colors hover:text-white">{n.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-[.18em] uppercase mb-4" style={{ color: "var(--gold-light)" }}>Контакты</h4>
              <div className="space-y-3 text-sm">
                <div>г. Анапа, пр. Революции, 3</div>
                <a href="tel:+79061876057" className="block font-semibold" style={{ color: "var(--sky)" }}>8 906 187 60 57</a>
                <div>info@ayaks-anapa.ru</div>
                <div style={{ color: "rgba(255,255,255,.4)" }}>Пн–Пт 09:00–18:00<br />Сб 10:00–16:00</div>
              </div>
            </div>
          </div>
          <hr className="gold-line mb-6" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,.35)" }}>
            <span>© 1997–2026 АЯКС НА БЕРЕГУ. Все права защищены.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-tip="Наверх"
          className="fixed z-50 flex items-center justify-center transition-all hover:scale-110"
          style={{ bottom: 28, right: 28, width: 44, height: 44, borderRadius: "50%", background: "var(--sea)", color: "#fff", boxShadow: "0 4px 16px rgba(26,94,138,.4)", border: "none", cursor: "pointer" }}>
          <Icon name="ArrowUp" size={18} />
        </button>
      )}

      {/* Chat widget */}
      <div style={{ position: "fixed", bottom: 28, left: 28, zIndex: 900 }}>
        {chatOpen && (
          <div className="mb-3 rounded-xl shadow-2xl overflow-hidden"
            style={{ width: 280, background: "#fff", border: "1px solid rgba(93,173,226,.25)" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "var(--sea)", color: "#fff" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
                <span className="text-sm font-semibold">Онлайн-консультант</span>
              </div>
              <button onClick={() => setChatOpen(false)}><Icon name="X" size={14} /></button>
            </div>
            <div className="p-4">
              <div className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-mid)" }}>
                Здравствуйте! Помогу подобрать недвижимость в Анапе. Как вас зовут?
              </div>
              <input placeholder="Ваше сообщение..." className="w-full px-3 py-2 text-xs rounded-lg outline-none mb-2"
                style={{ border: "1.5px solid rgba(93,173,226,.3)", background: "var(--sea-pale)" }} />
              <button className="btn-sea w-full justify-center py-2 text-xs">Отправить</button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} data-tip="Написать нам"
          className="flex items-center justify-center transition-all hover:scale-110"
          style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--sea)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(26,94,138,.45)" }}>
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={20} />
        </button>
      </div>

    </div>
  );
}
