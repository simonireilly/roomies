// user has a room ID, the room id is used to access teh active game

import { useMap, usePresence } from '@roomservice/react'
import { useEffect, useState } from 'react'
import { isOverlapping } from '../utils/is-overlapping'
import Controls from '../components/games/controls'
import Coin from '../components/games/coin'
import Opponent from '../components/games/opponent'
import Scoreboard from '../components/games/scoreboard'
import Link from 'next/link'

export type Directions = {
  ArrowUp: boolean
  ArrowDown: boolean
  ArrowRight: boolean
  ArrowLeft: boolean
}

export type Player = {
  x: string
  y: string
  name: string
  score?: number
}

const directions: Directions = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
}

const boxWidth = 3

export default function Room() {
  const [players, setMyPlayer] = usePresence<Player>('demo', 'players')
  const [coin, map] = useMap('demo', 'coin')

  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [name, setName] = useState<string>('anon')
  const [score, setScore] = useState<number>(0)
  const [gameSpeed, setGameSpeed] = useState<number>(20)

  useEffect(() => {
    map?.set('position', {
      x: 100,
      y: 100,
    })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.addEventListener('keydown', function (e) {
        directions[e.key] = true
      })

      document.body.addEventListener('keyup', function (e) {
        directions[e.key] = false
      })

      const box = document.getElementById('box')
      const pane = document.getElementById('pane')
      const maxWidth = pane.offsetWidth - box.offsetWidth

      const newValue = (
        value: number,
        lowerArrowKeyName: string,
        upperArrowKeyName: string
      ): number => {
        var n =
          value -
          (directions[lowerArrowKeyName] ? boxWidth : 0) +
          (directions[upperArrowKeyName] ? boxWidth : 0)
        return n < 0 ? 0 : n > maxWidth ? maxWidth : n
      }

      const interval = setInterval(() => {
        setLeft((left) => newValue(left, 'ArrowLeft', 'ArrowRight'))
        setTop((top) => newValue(top, 'ArrowUp', 'ArrowDown'))
      }, gameSpeed)
      return () => clearInterval(interval)
    }
  }, [gameSpeed])

  useEffect(() => {
    if (!players) return

    setMyPlayer.set({
      x: left.toString(),
      y: top.toString(),
      name: name,
      score: score,
    })
  }, [left, top, name])

  useEffect(() => {
    if (!coin?.position) return

    const interval = setInterval(() => {
      const coinElement = document.getElementById('coin')
      const boxElement = document.getElementById('box')

      const overlap = isOverlapping(coinElement, boxElement)
      if (overlap) {
        map?.set('position', {
          x: Math.floor(Math.random() * 300),
          y: Math.floor(Math.random() * 300),
        })
        setScore((val) => val + 10)
      }
    }, gameSpeed)
    return () => clearInterval(interval)
  }, [map])

  return (
    <div className="wrapper">
      <p>Use the arrow keys to move</p>
      <div>
        <Link href="/">
          <button className="button button-negative">Leave Room</button>
        </Link>
      </div>
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
        {Object.entries(players)
          .filter(([_, val]) => val.name !== name)
          .map(([key, val]) => {
            return <Opponent key={key} {...val} />
          })}
        {coin?.position && <Coin {...coin.position} />}
      </div>
      <Scoreboard />
      <div className="controls">
        <Controls directions={directions} />
      </div>
    </div>
  )
}
