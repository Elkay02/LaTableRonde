// Lines are drawn as borders rather than 1px-tall boxes: browsers snap border
// widths to whole device pixels, so every divider renders at the same
// thickness regardless of its position on the page or the display scaling.
const LINE_STYLE = { width: 40, borderTop: "1px solid var(--gold)" }

export default function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-6">
      <div style={LINE_STYLE} />
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="var(--gold)"
        style={{ display: "block", flexShrink: 0 }}
      >
        <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" />
      </svg>
      <div style={LINE_STYLE} />
    </div>
  )
}
