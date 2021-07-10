export default function Coin({ x, y }: { x: string; y: string }) {
  return (
    <div
      id="coin"
      className="coin"
      style={{
        left: parseInt(x),
        top: parseInt(y),
      }}
    ></div>
  )
}
