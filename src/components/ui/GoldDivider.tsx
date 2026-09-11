export default function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-6">
      <div style={{ width: 40, height: 1, background: "var(--gold)" }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--gold)">
        <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" />
      </svg>
      <div style={{ width: 40, height: 1, background: "var(--gold)" }} />
    </div>
  )
}
