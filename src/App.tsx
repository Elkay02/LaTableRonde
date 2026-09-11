import { useState, useEffect, useRef, useCallback } from 'react';
import logoTransparent from '@/imports/La_Table_Ronde_logo_transparent.png';

type Page = 'home' | 'about' | 'services' | 'gallery' | 'contact';

const CONTACT = {
  phone: '+961 71 809 232',
  email: 'hello@la-tableronde.com',
  location: 'Zalka, Lebanon',
};
const INSTAGRAM_URL = 'https://www.instagram.com/latableronde.lb/';

/* ─── IMAGES ─────────────────────────────────────────────── */
const IMG = {
  hero:       'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800&h=1000&fit=crop&auto=format',
  about:      'https://images.unsplash.com/photo-1562050147-fda1cc9a6378?w=1400&h=700&fit=crop&auto=format',
  chef:       'https://images.unsplash.com/photo-1564844536308-50b114a1d946?w=1400&h=700&fit=crop&auto=format',
  grill:      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&h=700&fit=crop&auto=format',
  finedining: 'https://images.unsplash.com/photo-1572387147902-d7d137cb0fbd?w=1400&h=700&fit=crop&auto=format',
  cooking:    'https://images.unsplash.com/photo-1769955817432-641929f613f0?w=900&h=700&fit=crop&auto=format',
  feast:      'https://images.unsplash.com/photo-1681353523973-926db2891d30?w=900&h=700&fit=crop&auto=format',
  outdoor:    'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=800&h=600&fit=crop&auto=format',
  wedding:    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop&auto=format',
  corporate:  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&auto=format',
};

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop&auto=format', alt: 'Elegant table setting' },
  { src: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&h=800&fit=crop&auto=format', alt: 'Grilled meat on charcoal' },
  { src: 'https://images.unsplash.com/photo-1564844536308-50b114a1d946?w=1200&h=800&fit=crop&auto=format', alt: 'Chef at live station' },
  { src: 'https://images.unsplash.com/photo-1769955817432-641929f613f0?w=1200&h=800&fit=crop&auto=format', alt: 'Chef cooking at night' },
  { src: 'https://images.unsplash.com/photo-1562050147-fda1cc9a6378?w=1200&h=800&fit=crop&auto=format', alt: 'Candlelit dining' },
  { src: 'https://images.unsplash.com/photo-1572387147902-d7d137cb0fbd?w=1200&h=800&fit=crop&auto=format', alt: 'Fine dining setup' },
  { src: 'https://images.unsplash.com/photo-1681353523973-926db2891d30?w=1200&h=800&fit=crop&auto=format', alt: 'Outdoor gathering around grill' },
  { src: 'https://images.unsplash.com/photo-1651948512032-8b4d4b37fe74?w=1200&h=800&fit=crop&auto=format', alt: 'Food preparation' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=800&fit=crop&auto=format', alt: 'Colorful food spread' },
  { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&h=800&fit=crop&auto=format', alt: 'BBQ station' },
  { src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=800&fit=crop&auto=format', alt: 'Plated steak' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop&auto=format', alt: 'Grilled ribs' },
  { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=800&fit=crop&auto=format', alt: 'Fresh salad display' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=800&fit=crop&auto=format', alt: 'Wood-fired pizza' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop&auto=format', alt: 'Overhead food shot' },
  { src: 'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=1200&h=800&fit=crop&auto=format', alt: 'Outdoor event setup' },
  { src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=800&fit=crop&auto=format', alt: 'Wedding reception setup' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop&auto=format', alt: 'Corporate event dining' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format', alt: 'Gourmet plating' },
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&h=800&fit=crop&auto=format', alt: 'Chef plating a dish' },
];

const TESTIMONIALS = [
  { quote: "An unforgettable evening. The live grill station was the highlight of the whole night, and our guests couldn't stop talking about it.", name: 'Jean-Marc', event: 'Engagement Party' },
  { quote: "The food, the setup, the team, everything was seamless. Our guests were genuinely impressed.", name: 'Karim', event: 'Outdoor Gathering' },
  { quote: "Honestly, we were worried about the catering more than anything else. La Table Ronde made it the easiest part of the whole evening. Everything just flowed.", name: 'Yasmina', event: 'Engagement Party' },
  { quote: "Watching the chefs cook right there in front of everyone felt like a real show. They were the heart of the party.", name: 'Omar', event: 'Private Party' },
  { quote: "The live stations brought so much warmth and energy to the evening. It stopped feeling like catering the moment the chefs started cooking.", name: 'Nour', event: 'Private Party' },
];

/* ─── HELPERS ────────────────────────────────────────────── */
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="var(--gold)" stroke="none" />
    </svg>
  );
}

function CocktailIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Left glass */}
      <path d="M5 6 L10 16 L10 23" />
      <line x1="7" y1="23" x2="13" y2="23" />
      <path d="M5 6 L15 6 L10 16" />
      {/* Right glass */}
      <path d="M17 6 L22 16 L22 23" />
      <line x1="19" y1="23" x2="25" y2="23" />
      <path d="M17 6 L27 6 L22 16" />
      {/* Clink lines */}
      <line x1="13.5" y1="4" x2="15" y2="2.5" strokeWidth="1" opacity="0.7" />
      <line x1="16" y1="3.5" x2="16" y2="1.5" strokeWidth="1" opacity="0.7" />
      <line x1="18.5" y1="4" x2="17" y2="2.5" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-6">
      <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--gold)"><polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" /></svg>
      <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
    </div>
  );
}

/* ─── ICONS ─────────────────────────────────────────────── */
const IconExcellence = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><polygon points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12" stroke="var(--gold)" strokeWidth="1.2" fill="none" /></svg>;
const IconHeritage = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="7" y="15" width="4" height="13" stroke="var(--gold)" strokeWidth="1" fill="none" />
    <rect x="14" y="15" width="4" height="13" stroke="var(--gold)" strokeWidth="1" fill="none" />
    <rect x="21" y="15" width="4" height="13" stroke="var(--gold)" strokeWidth="1" fill="none" />
    <polygon points="2,15 16,4 30,15" stroke="var(--gold)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    <line x1="4" y1="15" x2="28" y2="15" stroke="var(--gold)" strokeWidth="1" />
  </svg>
);
const IconPrecision = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="3" y="3" width="26" height="26" stroke="var(--gold)" strokeWidth="1.2" fill="none" /><rect x="8" y="8" width="16" height="16" stroke="var(--gold)" strokeWidth="0.6" fill="none" /><circle cx="16" cy="16" r="3" fill="var(--gold)" /></svg>;
const IconPassion = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M9 26 C9 26 7 24 7 19 L7 15 C7 14 7.5 13 8.5 13 C9.5 13 10 14 10 15 L10 19" stroke="var(--gold)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M10 19 L10 14 C10 13 10.5 12 11.5 12 C12.5 12 13 13 13 14 L13 18" stroke="var(--gold)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M13 18 L13 13.5 C13 12.5 13.5 12 14.5 12 C15.5 12 16 12.7 16 13.5 L16 18" stroke="var(--gold)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M16 18 L16 14.5 C16 13.5 16.5 13 17.5 13 C18.5 13 19 14 19 15 L19 21 C19 23 18.5 24 17 25.5 L16 26" stroke="var(--gold)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M16 26 C14 28 9 26 9 26" stroke="var(--gold)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M16 5 C16 5 14 3 12.5 4.5 C11 6 13 8 16 10 C19 8 21 6 19.5 4.5 C18 3 16 5 16 5Z" stroke="var(--gold)" strokeWidth="1" fill="none" />
  </svg>
);

const LIVE_STATIONS_PILLAR = 'Live cooking stations, set up on site at your venue and in front of your guests, transforming every moment into a lasting memory.';

/* ─── NAV ────────────────────────────────────────────────── */
function Navbar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const el = document.getElementById('page-scroll');
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', h);
    return () => el.removeEventListener('scroll', h);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Services', page: 'services' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact Us', page: 'contact' },
  ];
  const navBg = current === 'home' && !scrolled ? 'transparent' : 'rgba(26,26,26,0.97)';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: navBg, borderBottom: scrolled || current !== 'home' ? '1px solid rgba(249,193,10,0.15)' : 'none' }}>
      <div className="w-full max-w-screen-2xl mx-auto px-8 lg:px-16 py-3 flex items-center justify-between">
        <button onClick={() => { onNav('home'); setMenuOpen(false); }} className="cursor-pointer flex-shrink-0">
          <img src={logoTransparent} alt="La Table Ronde" style={{ width: 58, height: 58, objectFit: 'contain' }} />
        </button>
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(l => (
            <button key={l.page} onClick={() => onNav(l.page)}
              className="font-display tracking-[0.18em] uppercase transition-colors duration-200 relative pb-1"
              style={{ color: current === l.page ? 'var(--gold)' : 'rgba(255,255,255,0.8)', fontSize: '0.63rem', whiteSpace: 'nowrap' }}>
              {l.label}
              <span className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{ height: 1, background: 'var(--gold)', transform: current === l.page ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }} />
            </button>
          ))}
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(o => !o)}>
          {[0,1,2].map(i => <span key={i} style={{ display:'block', width:22, height:1, background:'var(--gold)' }} />)}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden" style={{ background: 'rgba(26,26,26,0.98)', borderTop: '1px solid rgba(249,193,10,0.15)' }}>
          {links.map(l => (
            <button key={l.page} onClick={() => { onNav(l.page); setMenuOpen(false); }}
              className="block w-full text-left px-8 py-4 font-display tracking-[0.2em] uppercase border-b"
              style={{ color: current === l.page ? 'var(--gold)' : 'rgba(255,255,255,0.7)', borderColor: 'rgba(249,193,10,0.1)', fontSize: '0.65rem' }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── PAGE BANNER ────────────────────────────────────────── */
function PageBanner({ title, subtitle, bgImage }: { title: string; subtitle?: string; bgImage?: string }) {
  return (
    <div className="relative pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden" style={{ background: 'var(--ink)' }}>
      {bgImage && <img src={bgImage} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.3 }} />}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.55), rgba(26,26,26,0.75))' }} />
      <div className="relative text-center px-8">
        <p className="font-display tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>La Table Ronde</p>
        <h1 className="font-display tracking-[0.1em] uppercase mb-4" style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}>{title}</h1>
        {subtitle && (
          <div className="flex items-center gap-3 justify-center mt-5">
            <div style={{ width: 50, height: 1, background: 'var(--gold)' }} />
            <p className="font-heading italic" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>{subtitle}</p>
            <div style={{ width: 50, height: 1, background: 'var(--gold)' }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── HOME ───────────────────────────────────────────────── */
function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div>
      <div className="relative flex flex-col overflow-hidden" style={{ minHeight: '100vh', background: '#111' }}>
        <img src={IMG.hero} alt="Elegant banquet table setting" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.72))' }} />

        <div style={{ height: 'calc(64px + 6vh)', flexShrink: 0 }} />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <img src={logoTransparent} alt="La Table Ronde" style={{ width: 130, height: 130, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
          </div>
          <h1 className="font-display tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--gold)', lineHeight: 1.05, fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            La Table<br />Ronde
          </h1>
          <p className="font-body mb-12 mx-auto" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: 560 }}>
            Full end-to-end catering excellence,<br />brought to life through authentic live stations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => onNav('contact')}
              className="font-display tracking-[0.28em] uppercase px-12 py-4 transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '0.7rem', minWidth: 200 }}>
              Book an Event
            </button>
            <button onClick={() => onNav('services')}
              className="font-display tracking-[0.28em] uppercase px-12 py-4 transition-all duration-300 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.45)', color: 'rgba(255,255,255,0.9)', fontSize: '0.7rem', minWidth: 200 }}>
              Our Services
            </button>
          </div>
        </div>

        <div className="relative flex flex-col items-center pb-10 pt-8 flex-shrink-0">
          <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div className="w-full h-1/2" style={{ background: 'var(--gold)', animation: 'slideDown 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="py-24 px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>Our Philosophy</p>
          <h2 className="font-heading mb-6" style={{ color: 'var(--ink)', fontWeight: 400, lineHeight: 1.35, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
            Where Culinary Craft<br />Meets Lebanese Hospitality
          </h2>
          <GoldDivider />
          <p className="font-body leading-loose mt-6 mx-auto" style={{ color: 'var(--charcoal)', maxWidth: 640, fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)' }}>
            At La Table Ronde, every event is a curated experience. From intimate gatherings to grand celebrations,
            we bring the warmth of Lebanese tradition and the theatre of live cooking to your table, crafted with precision, served with grace.
          </p>
        </div>
      </div>

      {/* Two pillars */}
      <div style={{ background: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-0">
          {[
            { num: '01', title: 'Live Stations', desc: LIVE_STATIONS_PILLAR },
            { num: '02', title: 'End-to-End Catering', desc: 'Complete services covering menu design, preparation, staff, and equipment for any occasion, from intimate dinners to grand celebrations.' },
          ].map((p, i) => (
            <div key={i} className="px-10 lg:px-16 py-14 flex flex-col" style={{ borderRight: i === 0 ? '1px solid var(--border)' : 'none' }}>
              <span className="font-display mb-5" style={{ color: 'var(--gold)', fontSize: '2.2rem', lineHeight: 1 }}>{p.num}</span>
              <h3 className="font-display tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--ink)', fontSize: '0.85rem' }}>{p.title}</h3>
              <div style={{ width: 30, height: 1, background: 'var(--gold)', marginBottom: 18 }} />
              <p className="font-body leading-loose" style={{ color: 'var(--charcoal)', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ height: 340 }}>
        {[IMG.grill, IMG.finedining, IMG.cooking, IMG.feast].map((src, i) => (
          <div key={i} className="relative overflow-hidden" style={{ background: '#1a1a1a' }}>
            <img src={src} alt="Catering event" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" style={{ opacity: 0.8 }} />
          </div>
        ))}
      </div>

      {/* Gold CTA */}
      <div className="py-20 px-8 text-center" style={{ background: 'var(--gold)' }}>
        <p className="font-display tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--ink)', fontSize: '0.8rem', fontWeight: 700 }}>Ready to Host?</p>
        <h2 className="font-display tracking-[0.08em] uppercase mb-6" style={{ color: 'var(--ink)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Plan Your Next Event With Us</h2>
        <button onClick={() => onNav('contact')}
          className="font-display tracking-[0.28em] uppercase px-12 py-4 transition-all duration-300 hover:opacity-80"
          style={{ background: 'var(--ink)', color: 'var(--gold)', fontSize: '0.7rem' }}>
          Get in Touch
        </button>
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────── */
function AboutPage() {
  return (
    <div>
      <PageBanner title="About Us" subtitle="Who Are We" bgImage={IMG.about} />
      <div className="py-24 px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-display tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>Our Story</p>
            <h2 className="font-heading mb-5" style={{ color: 'var(--ink)', fontWeight: 400, lineHeight: 1.35, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
              Born From a Passion<br />For Lebanese Hospitality
            </h2>
            <GoldDivider />
            <div className="font-body leading-loose space-y-5 mt-6" style={{ color: 'var(--charcoal)', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
              <p>La Table Ronde was founded in 2024 with a singular vision: to elevate catering in Lebanon by blending the rich traditions of Lebanese cuisine with the excitement of live culinary theatre.</p>
              <p>We believe that food is the heart of every gathering, and that truly great catering goes beyond the plate. It is about the sizzle of the grill, the warmth of the fire, and the shared joy of a meal crafted right before your eyes. Every event we serve is a reflection of that belief.</p>
              <p>Rooted in Lebanon and driven by hospitality, our team brings together skilled chefs, gracious service staff, and meticulous event coordination to deliver experiences that guests remember long after the last plate is cleared.</p>
            </div>
          </div>
          <div className="relative" style={{ height: 540 }}>
            <img src={IMG.about} alt="Candlelit table arrangement" className="w-full h-full object-cover" />
            <div className="absolute -bottom-5 -left-5 hidden md:block" style={{ width: 100, height: 100, border: '2px solid var(--gold)', opacity: 0.4 }} />
          </div>
        </div>
      </div>

      <div className="py-24 px-8 lg:px-16" style={{ background: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>What We Stand For</p>
            <h2 className="font-heading" style={{ color: 'var(--ink)', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <IconExcellence />, title: 'Excellence', desc: 'We hold every detail to the highest standard, from sourcing the finest ingredients to the presentation of every dish.' },
              { icon: <IconHeritage />, title: 'Authenticity', desc: 'Our menus draw on the depth of Lebanese culinary heritage, honouring tradition while welcoming contemporary flair.' },
              { icon: <IconPrecision />, title: 'Precision', desc: 'Every event is planned with meticulous care, coordinating chefs, staff, and logistics seamlessly from start to finish.' },
              { icon: <IconPassion />, title: 'Passion', desc: 'Every dish we prepare and every station we light is driven by a genuine love for food and hospitality, the ingredient that turns good catering into something truly memorable.' },
            ].map((v, i) => (
              <div key={i} className="p-7 flex flex-col items-start" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}>
                <div className="mb-5">{v.icon}</div>
                <h3 className="font-display tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ink)', fontSize: '0.75rem' }}>{v.title}</h3>
                <div style={{ width: 24, height: 1, background: 'var(--gold)', marginBottom: 16 }} />
                <p className="font-body text-sm leading-loose" style={{ color: 'var(--charcoal)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: 440 }}>
        <img src={IMG.chef} alt="Chef at live cooking station" className="w-full h-full object-cover" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,26,26,0.88) 40%, transparent 100%)' }} />
        <div className="absolute inset-0 flex items-center px-12 md:px-20 lg:px-32">
          <div style={{ maxWidth: 520 }}>
            <p className="font-display tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>Live. Crafted. Served.</p>
            <h2 className="font-display tracking-[0.06em] uppercase mb-5" style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>The Art of<br />Live Cooking</h2>
            <p className="font-body leading-loose" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}>
              Our live stations transform catering into theatre. Each fire lit, each cut made, in full view of your guests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICES ───────────────────────────────────────────── */
function ServicesPage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div>
      <PageBanner title="Our Services" subtitle="What We Offer" bgImage={IMG.chef} />

      <div className="py-20 px-8 lg:px-16 text-center" style={{ background: 'var(--cream)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading mb-5" style={{ color: 'var(--ink)', fontWeight: 400, lineHeight: 1.35, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
            An Unmatched Culinary Experience
          </h2>
          <GoldDivider />
          <p className="font-body leading-loose mt-4 mx-auto" style={{ color: 'var(--charcoal)', maxWidth: 620, fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
            From the first flame to the final plate, every element of your event is crafted with intention,
            delivered with grace, and experienced by your guests as something truly out of the ordinary.
          </p>
        </div>
      </div>

      {/* 01 / 02 pillars */}
      <div style={{ background: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-0">
          {[
            { num: '01', title: 'Live Stations', desc: LIVE_STATIONS_PILLAR },
            { num: '02', title: 'End-to-End Catering', desc: 'Complete services covering menu design, preparation, staff, and equipment for any occasion, from intimate dinners to grand celebrations.' },
          ].map((p, i) => (
            <div key={i} className="px-10 lg:px-14 py-14 flex flex-col" style={{ borderRight: i === 0 ? '1px solid var(--border)' : 'none' }}>
              <span className="font-display mb-5" style={{ color: 'var(--gold)', fontSize: '2.2rem', lineHeight: 1 }}>{p.num}</span>
              <h3 className="font-display tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--ink)', fontSize: '0.85rem' }}>{p.title}</h3>
              <div style={{ width: 30, height: 1, background: 'var(--gold)', marginBottom: 18 }} />
              <p className="font-body leading-loose" style={{ color: 'var(--charcoal)', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 01 Live Stations deep-dive */}
      <div className="py-20 px-8 lg:px-16" style={{ background: 'var(--ink)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-display tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 600 }}>01 Live Stations</p>
            <h2 className="font-heading mb-5" style={{ color: '#ffffff', fontWeight: 400, lineHeight: 1.35, fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
              An Experience at<br />Every Station
            </h2>
            <div style={{ width: 50, height: 1, background: 'var(--gold)', margin: '16px 0 24px' }} />
            <p className="font-body leading-loose mb-7" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}>
              Our live stations are more than food, they are theatre. Set up directly at your venue and operated by our skilled chefs, each station delivers the full experience right in front of your guests, cooking, carving, and serving live, transforming every moment into a lasting memory.
            </p>
            <p className="font-display tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--gold)', fontSize: '0.68rem' }}>Signature Stations</p>
            <ul className="space-y-3 mb-3">
              {[
                'Open-fire spit roaster',
                'Cast-iron grill',
                'Tandoor oven',
                'Artisanal oven',
                'Pasta bar',
                'Traditional saj',
                'Ice cream cart',
                'Soft serve counter',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 font-body" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, display: 'block' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body italic" style={{ color: 'rgba(249,193,10,0.6)', fontSize: '0.9rem', paddingLeft: 42 }}>and more...</p>
          </div>
          <div className="relative" style={{ height: 480 }}>
            <img src={IMG.grill} alt="Live grilling station" className="w-full h-full object-cover" />
            <div className="absolute -top-4 -right-4 hidden md:block" style={{ width: 80, height: 80, border: '1.5px solid var(--gold)', opacity: 0.35 }} />
          </div>
        </div>
      </div>

      {/* 02 End-to-End Catering deep-dive */}
      <div className="py-20 px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 md:order-1" style={{ height: 480 }}>
            <img src={IMG.finedining} alt="Elegant catering setup" className="w-full h-full object-cover" />
            <div className="absolute -bottom-5 -left-5 hidden md:block" style={{ width: 80, height: 80, border: '1.5px solid var(--gold)', opacity: 0.35 }} />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-display tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 600 }}>02 End-to-End Catering</p>
            <h2 className="font-heading mb-5" style={{ color: 'var(--ink)', fontWeight: 400, lineHeight: 1.35, fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
              A Complete Service,<br />Start to Finish
            </h2>
            <div style={{ width: 50, height: 1, background: 'var(--gold)', margin: '16px 0 24px' }} />
            <p className="font-body leading-loose mb-7" style={{ color: 'var(--charcoal)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}>
              We manage the complete catering journey, so you can focus entirely on your guests.
              From the first consultation to the final clean-up, we coordinate every element with precision and care.
            </p>
            <ul className="space-y-3">
              {['Menu Design & Consultation', 'Ingredient Sourcing & Procurement', 'Kitchen Preparation & Cooking', 'Equipment, Setup & Breakdown', 'Service Staff Coordination', 'Event Timeline Management', 'Post-Event Clean-up'].map(item => (
                <li key={item} className="flex items-center gap-3 font-body" style={{ color: 'var(--charcoal)', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, display: 'block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bar catering partnership banner */}
      <div className="px-8 lg:px-16 pb-0" style={{ background: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto" style={{ position: 'relative' }}>
          <div className="relative px-10 md:px-16 py-10" style={{ background: 'var(--ink)', overflow: 'visible' }}>
            {/* Bottom-right gold square: 4/5 inside, 1/5 outside */}
            <div className="hidden md:block" style={{ position: 'absolute', bottom: -10, right: -10, width: 50, height: 50, border: '1.5px solid var(--gold)', opacity: 0.5 }} />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0" style={{ marginLeft: -14 }}>
                <CocktailIcon />
              </div>
              <p className="font-body leading-loose" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
                We also provide{' '}
                <span className="font-body" style={{ color: 'var(--gold)', fontWeight: 600 }}>full bar catering services</span>
                {' '}in partnership with our sister brand{' '}
                <span className="font-body" style={{ color: 'var(--gold)', fontWeight: 600 }}>Les Buveurs</span>
                {', '}ensuring every aspect of your event, from the first toast to the last sip, is handled with the same care and expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events we cater for */}
      <div className="py-20 px-8 lg:px-16" style={{ background: '#ffffff', borderTop: '1px solid var(--border)', marginTop: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading mb-4" style={{ color: 'var(--ink)', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              We Cater for Every Celebration
            </h2>
            <p className="font-body mx-auto" style={{ color: 'var(--charcoal)', maxWidth: 580, fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
              From an intimate garden gathering to a cherished wedding celebration, our team brings the same passion and precision to every table, for any occasion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              { title: 'Private Parties & Outdoor Gatherings', img: IMG.outdoor, desc: 'Birthdays, anniversaries, family reunions, and casual outdoor feasts, brought to life with live stations and warm hospitality.' },
              { title: 'Weddings & Engagements', img: IMG.wedding, desc: 'Elegant, bespoke catering for your most cherished milestones, crafted with the detail and care that every special occasion deserves.' },
              { title: 'Corporate Events', img: IMG.corporate, desc: 'Professional catering for corporate dinners, team events, and product launches, seamlessly managed from start to finish.' },
            ].map((ev, i) => (
              <div key={i} className="flex flex-col overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}>
                <div className="overflow-hidden flex-shrink-0" style={{ height: 220, background: '#1a1a1a' }}>
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" style={{ opacity: 0.85 }} />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display tracking-[0.1em] uppercase mb-3" style={{ color: 'var(--ink)', fontSize: '0.75rem', minHeight: '2.4rem' }}>{ev.title}</h3>
                  <div style={{ width: 24, height: 1, background: 'var(--gold)', marginBottom: 14 }} />
                  <p className="font-body text-sm leading-loose" style={{ color: 'var(--charcoal)' }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works — 4 steps */}
      <div className="py-20 px-8 lg:px-16" style={{ background: 'var(--ink)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading mb-4" style={{ color: 'var(--gold)', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Working With Us</h2>
            <p className="font-body mx-auto" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 520, fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.8 }}>
              We co-create your event with you, from the very first idea to the final detail, so that every choice reflects your vision and every moment feels entirely yours. Our journey together unfolds across four simple stages, each one bringing us closer to the event you have in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { num: '01', title: 'Consult', desc: 'We start with a conversation, understanding your vision, your event, and what you want your guests to experience.' },
              { num: '02', title: 'Design', desc: 'Together we build a bespoke menu and station plan, tailored to your occasion, your tastes, and your timeline.' },
              { num: '03', title: 'Taste', desc: 'Before your big day, we invite you to a private tasting at our premises so every detail of the menu is perfected.' },
              { num: '04', title: 'Celebrate', desc: 'Sit back, enjoy your day, and let us take care of everything from the first flame to the last plate.' },
            ].map((step, i) => (
              <div key={i} className="px-8 py-10 flex flex-col relative"
                style={{ borderRight: i < 3 ? '1px solid rgba(249,193,10,0.15)' : 'none', borderBottom: '1px solid rgba(249,193,10,0.08)' }}>
                <span className="font-display mb-2" style={{ color: 'rgba(249,193,10,0.2)', fontSize: '3rem', lineHeight: 1, fontWeight: 700 }}>{step.num}</span>
                <h3 className="font-display tracking-[0.12em] uppercase mb-3" style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>{step.title}</h3>
                <div style={{ width: 24, height: 1, background: 'rgba(249,193,10,0.4)', marginBottom: 14 }} />
                <p className="font-body text-sm leading-loose" style={{ color: 'rgba(255,255,255,0.6)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-8 text-center" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <p className="font-body italic text-base mb-6" style={{ color: 'var(--charcoal)' }}>Ready to plan your event?</p>
        <button onClick={() => onNav('contact')}
          className="font-display tracking-[0.28em] uppercase px-12 py-4 transition-all duration-300 hover:opacity-85"
          style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '0.7rem' }}>
          Request a Quote
        </button>
      </div>
    </div>
  );
}

/* ─── GALLERY CAROUSEL ───────────────────────────────────── */
function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const startTimer = useCallback(() => {
    if (reducedMotion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % GALLERY_IMAGES.length), 5000);
  }, [reducedMotion]);

  useEffect(() => {
    if (!paused) startTimer();
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, startTimer]);

  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[current];
    if (!strip || !thumb) return;
    strip.scrollTo({ left: thumb.offsetLeft + thumb.offsetWidth / 2 - strip.offsetWidth / 2, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [current, reducedMotion]);

  const goTo = (i: number) => { setCurrent(i); startTimer(); };
  const prev = () => goTo((current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const next = () => goTo((current + 1) % GALLERY_IMAGES.length);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const transitionDur = reducedMotion ? '0ms' : '400ms';

  return (
    <div className="py-4 px-4 md:px-8"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={e => { if (!containerRef.current?.contains(e.relatedTarget as Node)) setPaused(false); }}>

      <div ref={containerRef} tabIndex={0} onKeyDown={handleKey}
        className="relative flex items-center justify-center mx-auto outline-none"
        style={{ maxWidth: 940 }}>

        <button onClick={prev} aria-label="Previous image" className="gallery-arrow"
          style={{ position: 'relative', zIndex: 10, width: 52, flexShrink: 0, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <polyline points="17,5 9,14 17,23" stroke="var(--gold)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div style={{ flex: 1, maxWidth: 820, position: 'relative' }}>
          <div className="hidden md:block absolute pointer-events-none" style={{ top: -12, left: -12, width: 44, height: 44, borderTop: '1.5px solid var(--gold)', borderLeft: '1.5px solid var(--gold)', opacity: 0.5, zIndex: 2 }} />
          <div className="hidden md:block absolute pointer-events-none" style={{ bottom: -12, right: -12, width: 44, height: 44, borderBottom: '1.5px solid var(--gold)', borderRight: '1.5px solid var(--gold)', opacity: 0.5, zIndex: 2 }} />
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)' }}
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} style={{ position:'absolute', inset:0, opacity: i === current ? 1 : 0, transition:`opacity ${transitionDur} ease`, pointerEvents: i === current ? 'auto':'none' }}>
                <img src={img.src} alt={img.alt} loading={i < 2 ? 'eager' : 'lazy'} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={next} aria-label="Next image" className="gallery-arrow"
          style={{ position:'relative', zIndex:10, width:52, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <polyline points="11,5 19,14 11,23" stroke="var(--gold)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip — no counter */}
      <div className="mx-auto mt-6" style={{ maxWidth: 820 }}>
        <div ref={stripRef} style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none', msOverflowStyle:'none', padding:'4px 2px', WebkitOverflowScrolling:'touch' }}>
          {GALLERY_IMAGES.map((img, i) => (
            <button key={i} ref={el => { thumbRefs.current[i] = el; }} onClick={() => goTo(i)}
              style={{ flexShrink:0, width:72, height:50, borderRadius:5, overflow:'hidden', padding:0, border:'none', cursor:'pointer', outline: i === current ? '2px solid var(--gold)':'2px solid transparent', outlineOffset:2, opacity: i === current ? 1:0.55, transition:'opacity 0.2s, outline 0.2s' }}>
              <img src={img.src} alt={img.alt} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TESTIMONIALS CAROUSEL ──────────────────────────────── */
function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((i: number) => {
    setFade(false);
    setTimeout(() => { setCurrent(i); setFade(true); }, 260);
  }, []);

  const next = useCallback(() => goTo((current + 1) % TESTIMONIALS.length), [current, goTo]);
  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, 12000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  const t = TESTIMONIALS[current];

  return (
    <div className="py-20 px-8 lg:px-16" style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading" style={{ color: 'var(--ink)', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>Memories We Have Forged</h2>
          <GoldDivider />
        </div>

        <div className="relative flex items-center gap-4">
          <button onClick={prev} aria-label="Previous testimonial" className="gallery-arrow flex-shrink-0"
            style={{ background:'none', border:'none', cursor:'pointer', width:40, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <polyline points="17,5 9,14 17,23" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex-1 text-center px-4 md:px-10" style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.26s ease', minHeight: 200, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <div className="font-heading mb-4" style={{ color: 'var(--gold)', fontSize: '5rem', lineHeight: 0.8, fontWeight: 700, fontStyle: 'normal' }}>&ldquo;</div>
            <p className="font-heading italic mb-6 leading-loose mx-auto" style={{ color: 'var(--ink)', fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', maxWidth: 640, fontWeight: 400 }}>
              {t.quote}
            </p>
            <div style={{ width: 32, height: 1, background: 'var(--gold)', margin: '0 auto 16px' }} />
            <p className="font-display tracking-[0.2em] uppercase" style={{ color: 'var(--ink)', fontSize: '0.72rem' }}>{t.name}</p>
            <p className="font-body mt-1" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{t.event}</p>
          </div>

          <button onClick={next} aria-label="Next testimonial" className="gallery-arrow flex-shrink-0"
            style={{ background:'none', border:'none', cursor:'pointer', width:40, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <polyline points="11,5 19,14 11,23" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? 'var(--gold)' : 'var(--border)', border:'none', cursor:'pointer', padding:0, transition:'all 0.3s ease' }}
              aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── GALLERY PAGE ───────────────────────────────────────── */
function GalleryPage() {
  return (
    <div>
      <PageBanner title="Gallery" subtitle="Our Highlights" bgImage={IMG.finedining} />
      <div className="py-20 px-8 lg:px-16 text-center" style={{ background: 'var(--cream)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading mb-5" style={{ color:'var(--ink)', fontWeight:400, lineHeight:1.35, fontSize:'clamp(1.8rem, 3vw, 2.4rem)' }}>
            Moments We Have Crafted
          </h2>
          <GoldDivider />
          <p className="font-body leading-loose mt-4 mx-auto" style={{ color:'var(--charcoal)', maxWidth:600, fontSize:'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
            A glimpse into the events, stations, and culinary experiences we have had the privilege of bringing to life.
            Each image tells the story of a moment transformed into a memory.
          </p>
        </div>
      </div>
      <div style={{ background:'var(--cream)', paddingBottom:'5rem' }}>
        <GalleryCarousel />
      </div>
      <TestimonialsCarousel />
    </div>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', event:'', date:'', guests:'', message:'' });
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const inputBase = "w-full px-4 py-3 font-body text-sm outline-none transition-colors duration-200";
  const inputStyle: React.CSSProperties = { background:'var(--cream)', border:'1px solid var(--border)', color:'var(--ink)', fontFamily:"'Source Sans 3', sans-serif" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => { (e.target as HTMLElement).style.borderColor = 'var(--gold)'; };
  const onBlur  = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="font-display tracking-[0.18em] uppercase block mb-2" style={{ color:'var(--charcoal)', fontSize:'0.68rem' }}>{children}</label>
  );

  return (
    <div>
      <PageBanner title="Contact Us" subtitle="We Would Love to Hear From You" bgImage={IMG.finedining} />

      <div className="py-24 px-8 lg:px-16" style={{ background:'var(--cream)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="font-display tracking-[0.3em] uppercase mb-3" style={{ color:'var(--gold)', fontSize:'0.75rem' }}>Reach Us</p>
              <h2 className="font-heading mb-4" style={{ color:'var(--ink)', fontWeight:400, fontSize:'clamp(1.3rem, 2vw, 1.6rem)', lineHeight:1.35 }}>
                Let's Create Something<br />Memorable
              </h2>
              <div style={{ width:40, height:1, background:'var(--gold)' }} />
            </div>
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13 19.79 19.79 0 0 1 1.08 4.4 2 2 0 0 1 3.06 2.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, label:'Phone / WhatsApp', value: CONTACT.phone, href: null },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label:'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, label:'Location', value: CONTACT.location, href: null },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-display tracking-[0.18em] uppercase mb-1" style={{ color:'var(--charcoal)', fontSize:'0.65rem' }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-body text-sm transition-opacity duration-200 hover:opacity-70" style={{ color:'var(--ink)', textDecoration:'underline', textUnderlineOffset:3 }}>{item.value}</a>
                  ) : (
                    <p className="font-body text-sm" style={{ color:'var(--ink)' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div>
              <p className="font-display tracking-[0.18em] uppercase mb-4" style={{ color:'var(--charcoal)', fontSize:'0.65rem' }}>Follow Us</p>
              <a href={INSTAGRAM_URL} onClick={e => { e.preventDefault(); window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer'); }} className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70" style={{ cursor:'pointer' }}>
                <InstagramIcon size={18} />
                <span className="font-display tracking-[0.18em] uppercase" style={{ color:'var(--gold)', fontSize:'0.65rem', textDecoration:'underline', textUnderlineOffset:4 }}>@latableronde.lb</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-6">
                  <circle cx="24" cy="24" r="23" stroke="var(--gold)" strokeWidth="1.2" fill="none" />
                  <polyline points="14,24 21,31 34,17" stroke="var(--gold)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-display tracking-[0.15em] uppercase mb-3" style={{ color:'var(--ink)', fontSize:'0.8rem' }}>Message Received</h3>
                <p className="font-body text-sm" style={{ color:'var(--charcoal)' }}>Thank you for reaching out. We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Full Name *</Label><input required className={inputBase} style={inputStyle} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} onFocus={onFocus} onBlur={onBlur} /></div>
                  <div><Label>Email Address *</Label><input required type="email" className={inputBase} style={inputStyle} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} onFocus={onFocus} onBlur={onBlur} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Phone / WhatsApp *</Label><input required type="tel" className={inputBase} style={inputStyle} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} onFocus={onFocus} onBlur={onBlur} /></div>
                  <div>
                    <Label>Event Type</Label>
                    <select className={inputBase} style={{...inputStyle, appearance:'none'} as React.CSSProperties} value={form.event} onChange={e=>setForm(f=>({...f,event:e.target.value}))} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select an option</option>
                      <option>Wedding</option><option>Corporate Event</option><option>Private Party</option><option>Outdoor Gathering</option><option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Event Date</Label><input type="date" min={today} className={inputBase} style={inputStyle} value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} onFocus={onFocus} onBlur={onBlur} /></div>
                  <div><Label>Number of Guests</Label><input type="number" min="1" className={inputBase} style={inputStyle} value={form.guests} onChange={e=>setForm(f=>({...f,guests:e.target.value}))} onFocus={onFocus} onBlur={onBlur} /></div>
                </div>
                <div><Label>Message *</Label><textarea required rows={5} className={inputBase} style={{...inputStyle, resize:'none'} as React.CSSProperties} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} onFocus={onFocus} onBlur={onBlur} /></div>
                <button type="submit" className="w-full font-display tracking-[0.28em] uppercase py-4 transition-all duration-300 hover:opacity-85"
                  style={{ background:'var(--gold)', color:'var(--ink)', fontSize:'0.7rem' }}>
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Join Our Team — white background for contrast */}
      <div className="px-8 lg:px-16 py-14" style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="font-heading mb-4" style={{ color: 'var(--gold)', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>Join Our Team</h2>
            <p className="font-body leading-loose" style={{ color: 'var(--charcoal)', maxWidth: 520, fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}>
              Whether you are a seasoned chef, a hospitality professional, or someone who simply loves great food and great service, we would love to hear from you.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href={`mailto:${CONTACT.email}?subject=CV Submission — La Table Ronde`}
              className="inline-block font-display tracking-[0.28em] uppercase px-10 py-4 transition-all duration-300 hover:opacity-85"
              style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '0.7rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Submit Your CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer style={{ background:'var(--ink)', borderTop:'1px solid rgba(249,193,10,0.12)' }}>
      <div className="w-full max-w-screen-xl mx-auto px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <img src={logoTransparent} alt="La Table Ronde" style={{ width:72, height:72, objectFit:'contain', marginBottom:12 }} />
            <span className="block font-display tracking-[0.3em] uppercase mb-3" style={{ color:'var(--gold)', fontSize:'0.68rem' }}>La Table Ronde</span>
            <p className="font-body text-sm leading-loose" style={{ color:'rgba(255,255,255,0.45)', maxWidth:320 }}>
              Full end-to-end catering services and live stations.<br />Established 2024, Lebanon.
            </p>
          </div>
          <div>
            <p className="font-display tracking-[0.25em] uppercase mb-5" style={{ color:'var(--gold)', fontSize:'0.65rem' }}>Navigation</p>
            <div className="space-y-3">
              {(['home','about','services','gallery','contact'] as Page[]).map(p => (
                <button key={p} onClick={()=>onNav(p)} className="block font-body text-sm transition-colors duration-200 hover:text-white" style={{ color:'rgba(255,255,255,0.45)' }}>
                  {p==='home'?'Home':p==='about'?'About Us':p==='services'?'Our Services':p==='gallery'?'Gallery':'Contact Us'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display tracking-[0.25em] uppercase mb-5" style={{ color:'var(--gold)', fontSize:'0.65rem' }}>Contact</p>
            <div className="space-y-3 font-body text-sm" style={{ color:'rgba(255,255,255,0.45)' }}>
              <a href={`mailto:${CONTACT.email}`} className="block transition-opacity duration-200 hover:opacity-70" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'underline', textUnderlineOffset:3 }}>{CONTACT.email}</a>
              <p>{CONTACT.phone}</p>
              <a href={INSTAGRAM_URL} onClick={e => { e.preventDefault(); window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer'); }} className="flex items-center gap-2 pt-2 transition-opacity duration-200 hover:opacity-70" style={{ cursor:'pointer' }}>
                <InstagramIcon size={15} />
                <span className="font-display tracking-[0.18em] uppercase" style={{ color:'var(--gold)', fontSize:'0.6rem' }}>@latableronde.lb</span>
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:24 }} className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm" style={{ color:'rgba(255,255,255,0.3)' }}>© 2024 La Table Ronde. All rights reserved.</p>
          <p className="font-display tracking-[0.3em] uppercase" style={{ color:'rgba(249,193,10,0.35)', fontSize:'0.55rem' }}>Lebanon's Premier Live Catering Experience</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>('home');
  const navigate = (p: Page) => { setPage(p); document.getElementById('page-scroll')?.scrollTo({ top:0 }); };
  return (
    <div id="page-scroll" className="size-full overflow-y-auto" style={{ background:'var(--cream)' }}>
      <style>{`
        @keyframes slideDown { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        .gallery-arrow { transition: opacity 0.2s, transform 0.2s; opacity:0.75; }
        .gallery-arrow:hover { opacity:1; transform:scale(1.1); }
        .gallery-arrow:focus-visible { outline:2px solid var(--gold); outline-offset:4px; border-radius:4px; opacity:1; }
        @media (max-width:767px) {
          .gallery-arrow { position:absolute !important; background:rgba(0,0,0,0.4) !important; padding:8px !important; border-radius:4px !important; opacity:0.85 !important; }
        }
      `}</style>
      <Navbar current={page} onNav={navigate} />
      <main>
        {page==='home'    &&<HomePage    onNav={navigate}/>}
        {page==='about'   &&<AboutPage  />}
        {page==='services'&&<ServicesPage onNav={navigate}/>}
        {page==='gallery' &&<GalleryPage/>}
        {page==='contact' &&<ContactPage/>}
      </main>
      <Footer onNav={navigate}/>
    </div>
  );
}
