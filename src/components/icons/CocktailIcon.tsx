export default function CocktailIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 32 32"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
  )
}
