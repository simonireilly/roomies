import { FC } from 'react'

interface CoinProps {
  x: string
  y: string
}

const Coin: FC<CoinProps> = ({ x, y }) => {
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

export default Coin
