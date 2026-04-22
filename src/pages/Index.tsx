import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/18de3e99-e1bd-4eec-876b-fcc730cc2807.jpg";
const APARTMENT_IMG = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/f2af673b-8a48-4130-8fd4-031d54aaec04.jpg";
const OFFICE_IMG = "https://cdn.poehali.dev/projects/3c3e026b-92ac-4dda-8b8f-127a160ca91d/files/ae05b6ed-2fb8-4b49-aae5-1b3f963ddb9d.jpg";
const LOGO_URL = "https://cdn.poehali.dev/files/fee01970-62d5-4486-bb5c-7c5a78bfb6cc.png";

const navItems = [
  { label: "Главная", href: "#home" },
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Объекты", href: "#catalog" },
  { label: "Новости", href: "#news" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const properties = [
  { id: 1, type: "Квартира", title: "ЖК «Морской Бриз»", location: "Центральный район", price: 8500000, area: 65, rooms: 2, image: APARTMENT_IMG, badge: "Новостройка" },
  { id: 2, type: "Апартаменты", title: "Резиденция «Олимп»", location: "Адлер", price: 14200000, area: 95, rooms: 3, image: HERO_IMG, badge: "Видовые" },
  { id: 3, type: "Вилла", title: "Вилла «Золотой Берег»", location: "Хоста", price: 42000000, area: 280, rooms: 5, image: OFFICE_IMG, badge: "Эксклюзив" },
  { id: 4, type: "Квартира", title: "ЖК «Лазурный»", location: "Лазаревское", price: 5900000, area: 48, rooms: 1, image: APARTMENT_IMG, badge: "Горящее" },
  { id: 5, type: "Апартаменты", title: "Комплекс «Ривьера»", location: "Центральный район", price: 19500000, area: 120, rooms: 4, image: HERO_IMG, badge: "Готовое" },
  { id: 6, type: "Коммерческая", title: "БЦ «Прибрежный»", location: "Адлер", price: 25000000, area: 180, rooms: 0, image: OFFICE_IMG, badge: "Инвестиции" },
];

const news = [
  { date: "18 апреля 2026", title: "Открытие нового жилого комплекса «Морской Бриз»", excerpt: "Продажи квартир в новом комплексе стартуют с эксклюзивными ценами для первых покупателей." },
  { date: "10 апреля 2026", title: "Рынок недвижимости Сочи: итоги квартала", excerpt: "Эксперты АЯКС НА БЕРЕГУ подвели итоги первого квартала 2026 года. Спрос вырос на 23%." },
  { date: "2 апреля 2026", title: "Новые ипотечные программы для приобретения жилья", excerpt: "Партнёрство с ведущими банками позволяет получить ипотеку от 4,9% годовых." },
];

const reviews = [
  { name: "Наталья К.", city: "Москва", text: "Приобрели квартиру в Сочи через АЯКС. Профессиональный подход, полное сопровождение сделки. Рекомендуем всем!", rating: 5 },
  { name: "Дмитрий В.", city: "Санкт-Петербург", text: "Долго искали подходящий вариант. Менеджеры проявили терпение и нашли именно то, что хотели. Спасибо!", rating: 5 },
  { name: "Елена М.", city: "Краснодар", text: "Отличная компания. Честно рассказали обо всех нюансах, помогли с ипотекой. Теперь живём у моря!", rating: 5 },
];

const services = [
  { icon: "Home", title: "Покупка недвижимости", desc: "Полное сопровождение от выбора объекта до регистрации права собственности" },
  { icon: "TrendingUp", title: "Инвестиции", desc: "Подбор объектов с максимальной доходностью на черноморском побережье" },
  { icon: "Key", title: "Аренда", desc: "Посуточная и долгосрочная аренда апартаментов и вилл у моря" },
  { icon: "FileText", title: "Юридическое сопровождение", desc: "Проверка документов, сопровождение сделок, оформление ипотеки" },
  { icon: "Building2", title: "Новостройки", desc: "Эксклюзивные предложения от застройщиков по ценам без наценок" },
  { icon: "Landmark", title: "Коммерческая недвижимость", desc: "Офисы, торговые площади и апарт-отели для вашего бизнеса" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("Все");
  const [priceFilter, setPriceFilter] = useState("Все");
  const [areaFilter, setAreaFilter] = useState("Все");
  const [locationFilter, setLocationFilter] = useState("Все");

  const types = ["Все", "Квартира", "Апартаменты", "Вилла", "Коммерческая"];
  const prices = ["Все", "до 8 млн", "8–20 млн", "от 20 млн"];
  const areas = ["Все", "до 60 м²", "60–120 м²", "от 120 м²"];
  const locations = ["Все", "Центральный район", "Адлер", "Хоста", "Лазаревское"];

  const filtered = properties.filter((p) => {
    const typeOk = typeFilter === "Все" || p.type === typeFilter;
    const priceOk =
      priceFilter === "Все" ||
      (priceFilter === "до 8 млн" && p.price < 8000000) ||
      (priceFilter === "8–20 млн" && p.price >= 8000000 && p.price <= 20000000) ||
      (priceFilter === "от 20 млн" && p.price > 20000000);
    const areaOk =
      areaFilter === "Все" ||
      (areaFilter === "до 60 м²" && p.area < 60) ||
      (areaFilter === "60–120 м²" && p.area >= 60 && p.area <= 120) ||
      (areaFilter === "от 120 м²" && p.area > 120);
    const locOk = locationFilter === "Все" || p.location === locationFilter;
    return typeOk && priceOk && areaOk && locOk;
  });

  const formatPrice = (n: number) =>
    n >= 1000000 ? `${(n / 1000000).toFixed(1).replace(".0", "")} млн ₽` : `${(n / 1000).toFixed(0)} тыс. ₽`;

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Montserrat', sans-serif" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: "rgba(250,250,247,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#home">
            <img src={LOGO_URL} alt="АЯКС НА БЕРЕГУ" className="h-10 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--navy)", letterSpacing: "0.1em" }}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+78002003040" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--gold)" }}>
              <Icon name="Phone" size={14} />
              8 800 200-30-40
            </a>
            <button className="btn-gold ml-2">Консультация</button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "var(--navy)" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden px-6 pb-6 pt-2" style={{ background: "var(--warm-white)" }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium tracking-widest uppercase border-b"
                style={{ color: "var(--navy)", borderColor: "rgba(201,168,76,0.2)" }}>
                {item.label}
              </a>
            ))}
            <a href="tel:+78002003040" className="flex items-center gap-2 mt-4 text-sm font-medium" style={{ color: "var(--gold)" }}>
              <Icon name="Phone" size={14} />
              8 800 200-30-40
            </a>
            <button className="btn-gold w-full mt-3">Консультация</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative pt-16" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMG} alt="Сочи недвижимость" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(26,32,51,0.85) 0%, rgba(26,32,51,0.5) 60%, rgba(26,32,51,0.3) 100%)" }} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="var(--cream)" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-6 pb-24 pt-16">
            <div className="max-w-2xl animate-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: "var(--gold)" }} />
                <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "var(--gold-light)" }}>
                  Недвижимость у моря
                </span>
              </div>
              <h1 className="mb-6 font-light leading-tight" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "white" }}>
                Жизнь на берегу<br />
                <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>Чёрного моря</em>
              </h1>
              <p className="mb-10 font-light leading-relaxed text-lg" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "500px" }}>
                АЯКС НА БЕРЕГУ — ваш надёжный партнёр в приобретении недвижимости в Сочи.
                Квартиры, апартаменты и виллы с видом на море.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up-delay-1">
                <a href="#catalog"><button className="btn-gold">Смотреть объекты</button></a>
                <a href="#contacts">
                  <button className="btn-outline-gold" style={{ color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.5)" }}>
                    Получить консультацию
                  </button>
                </a>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up-delay-2">
              {[
                { num: "500+", label: "Реализованных объектов" },
                { num: "15 лет", label: "На рынке Сочи" },
                { num: "98%", label: "Довольных клиентов" },
                { num: "24/7", label: "Поддержка клиентов" },
              ].map((s) => (
                <div key={s.num} className="text-center p-4 rounded" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <div className="font-bold mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--gold-light)", fontSize: "2rem" }}>{s.num}</div>
                  <div className="text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: "var(--gold)" }} />
                <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>О компании</span>
              </div>
              <h2 className="mb-6 font-light leading-tight" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--navy)" }}>
                Более 15 лет мы помогаем<br />
                <em style={{ fontStyle: "italic" }}>находить дом у моря</em>
              </h2>
              <p className="mb-5 leading-relaxed text-sm" style={{ color: "#5a6070" }}>
                АЯКС НА БЕРЕГУ — одно из ведущих агентств недвижимости черноморского побережья.
                Мы специализируемся исключительно на рынке Сочи и глубоко знаем каждый его район,
                каждый жилой комплекс и каждого застройщика.
              </p>
              <p className="mb-8 leading-relaxed text-sm" style={{ color: "#5a6070" }}>
                Наша миссия — сделать приобретение недвижимости у моря максимально комфортным,
                прозрачным и выгодным для вас. Мы сопровождаем каждую сделку от первого звонка
                до получения ключей.
              </p>
              <div className="gold-divider mb-8" />
              <div className="grid grid-cols-3 gap-6">
                {[
                  { val: "500+", lbl: "Объектов" },
                  { val: "15", lbl: "Лет опыта" },
                  { val: "1200+", lbl: "Клиентов" },
                ].map((s) => (
                  <div key={s.lbl}>
                    <div className="font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--gold)", fontSize: "2.5rem" }}>{s.val}</div>
                    <div className="text-xs tracking-wide mt-1" style={{ color: "#8a9090" }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={HERO_IMG} alt="О компании" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 rounded shadow-lg" style={{ background: "var(--navy)", maxWidth: "200px" }}>
                <div className="font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--gold-light)", fontSize: "2rem" }}>№1</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>По продажам элитной недвижимости в Сочи</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR OFFICE */}
      <section id="office" className="py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src={OFFICE_IMG} alt="Наш офис" className="w-full rounded object-cover" style={{ aspectRatio: "4/3" }} />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: "var(--gold)" }} />
                <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>Наш офис</span>
              </div>
              <h2 className="mb-6 font-light" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--navy)" }}>
                Офис в самом сердце Сочи
              </h2>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: "#5a6070" }}>
                Наш главный офис расположен в центре Сочи, в 5 минутах от набережной.
                Уютная атмосфера и профессиональная команда ждут вас для личной встречи.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "MapPin", text: "г. Сочи, ул. Навагинская, 16, офис 301" },
                  { icon: "Clock", text: "Пн–Пт 9:00–20:00, Сб–Вс 10:00–18:00" },
                  { icon: "Phone", text: "+7 (862) 200-30-40" },
                  { icon: "Mail", text: "info@ayaks-sochi.ru" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--gold-pale)", border: "1px solid rgba(201,168,76,0.3)" }}>
                      <Icon name={item.icon} size={14} style={{ color: "var(--gold)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#4a5060" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="btn-gold mt-8">Записаться на встречу</button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>Услуги</span>
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--navy)" }}>
              Полный спектр услуг<br />в сфере недвижимости
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-8 rounded group cursor-pointer transition-all duration-300 hover:shadow-xl"
                style={{ background: "white", border: "1px solid rgba(201,168,76,0.15)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "var(--gold-pale)" }}>
                  <Icon name={s.icon} size={20} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="mb-3 font-medium" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.3rem", color: "var(--navy)" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6a7080" }}>{s.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--gold)" }}>
                  Подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>Каталог</span>
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--navy)" }}>
              Актуальные объекты
            </h2>
          </div>

          {/* Filters */}
          <div className="p-6 rounded mb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)" }}>
            {[
              { label: "Тип", options: types, value: typeFilter, set: setTypeFilter },
              { label: "Цена", options: prices, value: priceFilter, set: setPriceFilter },
              { label: "Площадь", options: areas, value: areaFilter, set: setAreaFilter },
              { label: "Район", options: locations, value: locationFilter, set: setLocationFilter },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-medium mb-2 tracking-wider uppercase" style={{ color: "#8a9090" }}>
                  {f.label}
                </label>
                <select
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full text-sm px-3 py-2.5 rounded outline-none"
                  style={{ border: "1px solid rgba(201,168,76,0.3)", background: "var(--warm-white)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          <p className="mb-6 text-sm" style={{ color: "#8a9090" }}>
            Найдено объектов: <span className="font-semibold" style={{ color: "var(--navy)" }}>{filtered.length}</span>
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#8a9090" }}>
              <div className="mb-4 flex justify-center">
                <Icon name="Search" size={40} style={{ color: "rgba(201,168,76,0.4)" }} />
              </div>
              <p className="text-lg" style={{ fontFamily: "'Cormorant', serif" }}>По выбранным фильтрам объектов не найдено</p>
              <p className="text-sm mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="property-card rounded overflow-hidden cursor-pointer"
                  style={{ background: "white", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-sm tracking-wider"
                        style={{ background: "var(--gold)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif" }}>
                        {p.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2.5 py-1.5 rounded-sm"
                        style={{ background: "rgba(26,32,51,0.85)", color: "white" }}>
                        {p.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium mb-1" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.25rem", color: "var(--navy)" }}>
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Icon name="MapPin" size={12} style={{ color: "var(--gold)" }} />
                      <span className="text-xs" style={{ color: "#8a9090" }}>{p.location}</span>
                    </div>
                    <div className="gold-divider mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#6a7080" }}>
                        <span className="flex items-center gap-1">
                          <Icon name="Maximize2" size={11} /> {p.area} м²
                        </span>
                        {p.rooms > 0 && (
                          <span className="flex items-center gap-1">
                            <Icon name="LayoutGrid" size={11} /> {p.rooms} комн.
                          </span>
                        )}
                      </div>
                      <div className="font-semibold" style={{ color: "var(--gold)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
                        {formatPrice(p.price)}
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-200"
                      style={{ border: "1px solid rgba(201,168,76,0.4)", color: "var(--navy)", background: "transparent" }}
                      onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = "var(--gold)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = "transparent"; }}>
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button className="btn-outline-gold" style={{ color: "var(--navy)" }}>Загрузить больше объектов</button>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: "var(--gold)" }} />
                <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>Новости</span>
              </div>
              <h2 className="font-light" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--navy)" }}>
                Последние новости
              </h2>
            </div>
            <button className="hidden md:block btn-outline-gold" style={{ color: "var(--navy)" }}>Все новости</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <article key={i} className="group cursor-pointer p-6 rounded transition-all duration-300 hover:shadow-lg"
                style={{ background: "white", border: "1px solid rgba(201,168,76,0.15)" }}>
                <div className="text-xs mb-3 font-medium tracking-wide" style={{ color: "var(--gold)" }}>{n.date}</div>
                <h3 className="font-medium mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "1.2rem", color: "var(--navy)" }}>
                  {n.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6a7080" }}>{n.excerpt}</p>
                <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--gold)" }}>
                  Читать <Icon name="ArrowRight" size={12} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>Отзывы</span>
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
              Что говорят наши клиенты
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="p-8 rounded" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <span key={j} style={{ color: "var(--gold)", fontSize: "0.9rem" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}>
                  «{r.text}»
                </p>
                <div className="gold-divider mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "var(--gold)", color: "var(--navy)" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "white" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--gold) 0%, #B8941E 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <path d="M0,80 C360,140 720,20 1080,80 C1260,110 1350,60 1440,80 L1440,200 L0,200 Z" fill="white" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-light mb-4" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--navy)" }}>
            Готовы найти недвижимость своей мечты?
          </h2>
          <p className="text-sm mb-8 mx-auto" style={{ color: "rgba(26,32,51,0.75)", maxWidth: "450px" }}>
            Оставьте заявку — наши эксперты свяжутся с вами в течение 15 минут
          </p>
          <a href="#contacts">
            <button className="px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-2xl"
              style={{ background: "var(--navy)", color: "var(--gold-light)", letterSpacing: "0.15em" }}>
              Оставить заявку
            </button>
          </a>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: "var(--gold)" }} />
                <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>Контакты</span>
              </div>
              <h2 className="mb-6 font-light" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--navy)" }}>
                Свяжитесь с нами
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: "#6a7080" }}>
                Мы готовы ответить на все ваши вопросы и помочь найти идеальный объект.
                Оставьте заявку и мы перезвоним вам в удобное время.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { icon: "Phone", title: "Телефон", val: "8 800 200-30-40 (бесплатно)", sub: "+7 (862) 200-30-40" },
                  { icon: "Mail", title: "Email", val: "info@ayaks-sochi.ru" },
                  { icon: "MapPin", title: "Адрес", val: "г. Сочи, ул. Навагинская, 16", sub: "офис 301, 3 этаж" },
                  { icon: "Clock", title: "Режим работы", val: "Пн–Пт 9:00–20:00", sub: "Сб–Вс 10:00–18:00" },
                ].map((c) => (
                  <div key={c.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--gold-pale)", border: "1px solid rgba(201,168,76,0.3)" }}>
                      <Icon name={c.icon} size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-medium tracking-wider uppercase mb-0.5" style={{ color: "#8a9090" }}>{c.title}</div>
                      <div className="text-sm font-medium" style={{ color: "var(--navy)" }}>{c.val}</div>
                      {c.sub && <div className="text-xs mt-0.5" style={{ color: "#8a9090" }}>{c.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded" style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)" }}>
              <h3 className="mb-6 font-medium" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.6rem", color: "var(--navy)" }}>
                Оставить заявку
              </h3>
              <div className="space-y-4">
                {[
                  { placeholder: "Ваше имя *", type: "text" },
                  { placeholder: "Телефон *", type: "tel" },
                  { placeholder: "Email", type: "email" },
                ].map((f) => (
                  <input
                    key={f.placeholder}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3.5 text-sm outline-none"
                    style={{ border: "1px solid rgba(201,168,76,0.3)", background: "var(--warm-white)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif" }}
                  />
                ))}
                <select className="w-full px-4 py-3.5 text-sm outline-none"
                  style={{ border: "1px solid rgba(201,168,76,0.3)", background: "var(--warm-white)", color: "#6a7080", fontFamily: "'Montserrat', sans-serif" }}>
                  <option>Тип запроса</option>
                  <option>Покупка квартиры</option>
                  <option>Покупка апартаментов</option>
                  <option>Аренда</option>
                  <option>Инвестиции</option>
                  <option>Консультация</option>
                </select>
                <textarea
                  rows={4}
                  placeholder="Ваши пожелания..."
                  className="w-full px-4 py-3.5 text-sm outline-none resize-none"
                  style={{ border: "1px solid rgba(201,168,76,0.3)", background: "var(--warm-white)", color: "var(--navy)", fontFamily: "'Montserrat', sans-serif" }}
                />
                <button className="btn-gold w-full py-4">Отправить заявку</button>
                <p className="text-xs text-center" style={{ color: "#aab0b0" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--navy)" }} className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <img src={LOGO_URL} alt="АЯКС НА БЕРЕГУ" className="h-12 w-auto mb-4" style={{ filter: "brightness(0) invert(1)" }} />
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "300px" }}>
                Ваш надёжный партнёр в мире недвижимости на черноморском побережье с 2010 года.
              </p>
              <div className="flex gap-3">
                {["MessageCircle", "Send", "Instagram"].map((ic) => (
                  <div key={ic} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                    <Icon name={ic} size={14} style={{ color: "var(--gold)" }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--gold)" }}>Навигация</h4>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="block text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--gold)" }}>Контакты</h4>
              <div className="space-y-3">
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>г. Сочи, ул. Навагинская, 16</div>
                <a href="tel:+78002003040" className="block text-sm" style={{ color: "var(--gold-light)" }}>8 800 200-30-40</a>
                <a href="mailto:info@ayaks-sochi.ru" className="block text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>info@ayaks-sochi.ru</a>
              </div>
            </div>
          </div>
          <div className="gold-divider mb-6" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 АЯКС НА БЕРЕГУ. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>Политика конфиденциальности</a>
              <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
