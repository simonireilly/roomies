export default function Opponent({ x, y, name, key }: { x: string, y: string, name: string, key: string }) {
  console.info({ x, y, name, key })
  return <div
    key={key}
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
