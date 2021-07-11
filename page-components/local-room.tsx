import { useEffect, useState } from 'react'
import { isOverlapping } from '../utils/is-overlapping'
import Controls from '../components/games/controls'
import Coin from '../components/games/coin'
import Link from 'next/link'
import { NextPage } from 'next'

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

const LocalRoom: NextPage<{ roomID: string }> = ({ roomID }) => {
  const [coin, setCoin] = useState({
    x: '100',
    y: '100',
  })

  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const gameSpeed = 20

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
        const n =
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
    if (!coin) return

    const interval = setInterval(() => {
      // @TODO: These should be refs
      const coinElement = document.getElementById('coin')
      const boxElement = document.getElementById('box')

      const overlap = isOverlapping(coinElement, boxElement)
      if (overlap) {
        setCoin({
          x: String(Math.floor(Math.random() * 300)),
          y: String(Math.floor(Math.random() * 300)),
        })
        setScore((val) => val + 10)
      }
    }, gameSpeed)
    return () => clearInterval(interval)
  }, [coin])

  return (
    <div className="wrapper">
      <p>Room ID: {roomID}</p>
      <p>Use the arrow keys to move</p>
      <div>
        <Link href="/" passHref>
          <button className="button button-negative">Leave Room</button>
        </Link>
      </div>
      <br />
      <div id="pane">
        <div
          id="box"
          className="player"
          style={{ left, top }}
          title="you"
        ></div>
        {coin && <Coin {...coin} />}
      </div>
      <div>
        <em>Score: {score}</em>
      </div>
      <div className="controls">
        <Controls directions={directions} />
      </div>
    </div>
  )
}

export default LocalRoom
