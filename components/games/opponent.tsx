import { FC } from 'react'

interface Opponent {
  x: string
  y: string
  name: string
}

const Opponent: FC<Opponent> = ({ x, y, name }) => {
  return (
    <div
      title={name}
      className="opponent"
      style={{
        left: parseInt(x),
        top: parseInt(y),
      }}
    >
      <span className="pill">{name}</span>
    </div>
  )
}

export default Opponent
