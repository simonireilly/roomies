import { useMap, usePresence } from '@roomservice/react'
import { useEffect, useState } from 'react'
import Coin from '../components/games/coin'
import { Controls } from '../components/games/controls'
import Opponent from '../components/games/opponent'
import { isOverlapping } from '../utils/is-overlapping'

export type Directions = {
  ArrowUp: boolean
  ArrowDown: boolean
  ArrowRight: boolean
  ArrowLeft: boolean
}

type Player = {
  x: string
  y: string
  name: string
}

const directions: Directions = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}

export default function Home() {
  const [players, setMyPlayer] = usePresence<Player>("demo", "players");
  const [coin, map] = useMap("demo", "coin");
  const boxWidth = 3;

  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [name, setName] = useState<string>('anon')
  const [gameSpeed, setGameSpeed] = useState<number>(50)

  useEffect(() => {
    map?.set("position", {
      x: 100,
      y: 100
    })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.addEventListener('keydown', function (e) {
        directions[e.key] = true;
      });

      document.body.addEventListener('keyup', function (e) {
        directions[e.key] = false;
      });

      const box = document.getElementById('box');
      const pane = document.getElementById('pane');
      const maxWidth = pane.offsetWidth - box.offsetWidth

      const newValue = (value: number, lowerArrowKeyName: string, upperArrowKeyName: string): number => {
        var n = value - (directions[lowerArrowKeyName] ? boxWidth : 0) + (directions[upperArrowKeyName] ? boxWidth : 0);
        return n < 0 ? 0 : n > maxWidth ? maxWidth : n;
      }

      const interval = setInterval(() => {
        setLeft((left) => newValue(left, 'ArrowLeft', 'ArrowRight'))
        setTop((top) => newValue(top, 'ArrowUp', 'ArrowDown'))
      }, gameSpeed);
      return () => clearInterval(interval);
    }
  }, [gameSpeed])

  useEffect(() => {
    if (!players) return

    setMyPlayer.set({
      x: left.toString(),
      y: top.toString(),
      name: name
    })
  }, [left, top, name])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!coin?.position) return

      const coinElement = document.getElementById("coin")
      const boxElement = document.getElementById("box")

      const overlap = isOverlapping(coinElement, boxElement)
      if (overlap) {
        map?.set("position", {
          x: Math.floor(Math.random() * 300),
          y: Math.floor(Math.random() * 300)
        })
      }
    }, gameSpeed);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className='wrapper'>
      <p>
        Use the arrow keys to move
      </p>
      <label>
        UserName: &nbsp;
        <input onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <div id="pane">
        <div id="box" className="player" style={{ left, top }} title="you" ></div>
        {
          Object.entries(players)
            .filter(([_, val]) => val.name !== name)
            .map(([key, val]) => {
              console.info({ key, val })
              const props = { key, ...val }
              return <Opponent {...props} />
            })
        }
        {coin?.position && <Coin {...coin.position} />}
      </div>
      <div className="controls">
        <h3>{gameSpeed}</h3>
        <label>
          Set game speed: &nbsp;
          <input
            className="gameSpeedInput"
            type="number"
            min="1"
            max="50"
            onBlur={(e) => setGameSpeed(e.target.valueAsNumber)} />
        </label>
      </div>
      <div className="controls">
        <Controls directions={directions} />
      </div>
    </div>
  )
}
