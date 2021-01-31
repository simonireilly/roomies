import { RoomService } from '@roomservice/browser'
import { InnerPresenceClient } from '@roomservice/browser/dist/PresenceClient'
import { useEffect, useState } from 'react'

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

type Coin = {
  x?: number
  y?: number
}

type Positions = {
  [key: string]: Player
}

export default function Home() {
  const [presence, setPresence] = useState<InnerPresenceClient>()
  const [positions, setPositions] = useState<Positions>({})
  const [coin, setCoin] = useState<Coin>({ x: 50, y: 50 })

  // On boot connect to the room and load all presences
  useEffect(() => {
    async function load() {
      const rs = new RoomService({
        auth: '/api/roomservice'
      })

      // Set presence in the client side state to be the current presence
      const room = await rs.room('demo')
      const p = room.presence()
      const board = room.map('board')
      setPresence(p)

      // Set the initial positions
      const v = await p.getAll<Player>('players')
      setPositions(v)

      // Set the initial coin
      const c = await board.get('coin')
      setCoin(c)

      // Subscribe any updates to the room positions
      room.subscribe<Player>(p, 'players', (msg) => {
        setPositions(msg)
      })

      // Subscribe to updates on the coin
      room.subscribe(board, (msg) => {
        setCoin(msg['coin'])
      })
    }

    load().catch(console.error)
  }, [])

  const directions: Directions = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
  }

  const boxWidth = 3;

  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [name, setName] = useState<string>('anon')
  const [gameSpeed, setGameSpeed] = useState<number>(20)
  const [generatingCoin, setGeneratingCoin] = useState<boolean>(false)

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

      const checkOverlap = async () => {
        if (generatingCoin) return

        const box = document.getElementById('box');
        const coin = document.getElementById('coin');
        const coinLocation = coin.getBoundingClientRect();
        const playerLocation = box.getBoundingClientRect();

        const overlap = !(coinLocation.right < playerLocation.left ||
          coinLocation.left > playerLocation.right ||
          coinLocation.bottom < playerLocation.top ||
          coinLocation.top > playerLocation.bottom)

        console.info({ generatingCoin, overlap })

        if (overlap && !generatingCoin) {
          setGeneratingCoin(true)
          await fetch('api/score')
        }

        if (!overlap) {
          setGeneratingCoin(false)
        }
      }

      const interval = setInterval(() => {
        setLeft((left) => newValue(left, 'ArrowLeft', 'ArrowRight'))
        setTop((top) => newValue(top, 'ArrowUp', 'ArrowDown'))
        checkOverlap()
      }, gameSpeed);
      return () => clearInterval(interval);
    }
  }, [gameSpeed])

  useEffect(() => {
    if (!presence) return

    presence.set(
      'players',
      {
        x: left,
        y: top,
        name: name
      },
      3000
    )
  }, [left, top, name])

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
        <div
          id="box"
          className="player"
          style={{ left, top }}
          title="you"
        ></div>
        <div
          className="coin"
          id="coin"
          style={{
            left: coin?.x,
            top: coin?.y
          }}>
        </div>
        {presence && Object.keys(positions)
          .filter(userName => userName !== presence.me)
          .map(userName => (
            <div
              key={userName}
              title={positions[userName].name}
              className="opponent"
              style={{
                left: positions[userName].x,
                top: positions[userName].y
              }}>
              <span className="pill">
                {positions[userName].name}
              </span>
            </div>
          ))}
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
    </div>
  )
}
