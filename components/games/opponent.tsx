export default function Opponent({ x, y, name, }: { x: string, y: string, name: string }) {
  return <div
    title={name}
    className="opponent"
    style={{
      left: parseInt(x),
      top: parseInt(y)
    }}
  >
    <span className="pill">
      {name}
    </span>
  </div>
}
