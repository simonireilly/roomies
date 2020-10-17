import { RoomService } from '@roomservice/browser'
import { InnerPresenceClient } from '@roomservice/browser/dist/PresenceClient'
import { useEffect, useState } from 'react'

export default function Home() {
  const [presence, setPresence] = useState<InnerPresenceClient>()
  const [positions, setPositions] = useState({})

  // On boot connect to the room and load all presences
  useEffect(() => {
    async function load() {
      const rs = new RoomService({
        auth: '/api/roomservice'
      })

      // Set presence in the client side state to be the current presence
      const room = await rs.room('demo')
      const p = room.presence()
      setPresence(p)

      // Set the initial positions
      const v = await p.getAll('position')
      setPositions(v)

      // Subscribe any updates to the room positions
      return room.subscribe(p, 'position', (msg) => {
        console.log('Position message:', msg)
        setPositions(msg)
      })
    }

    load().catch(console.error)
  }, [])

  const d = {};
  const boxWidth = 3;

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.addEventListener('keydown', function (e) {
        d[e.key] = true;
      });

      document.body.addEventListener('keyup', function (e) {
        d[e.key] = false;
      });

      const box = document.getElementById('box');
      const pane = document.getElementById('pane');
      const maxWidth = pane.offsetWidth - box.offsetWidth


      const newValue = (value, lowerArrowKeyName, upperArrowKeyName) => {
        var n = parseInt(value, 10) - (d[lowerArrowKeyName] ? boxWidth : 0) + (d[upperArrowKeyName] ? boxWidth : 0);
        return n < 0 ? 0 : n > maxWidth ? maxWidth : n;
      }

      setInterval(() => {
        setLeft((left) => newValue(left, 'ArrowLeft', 'ArrowRight'))
        setTop((top) => newValue(top, 'ArrowUp', 'ArrowDown'))
      }, 20);
    }
  }, [])

  useEffect(() => {
    if (!presence) return
    console.log(presence)
    presence.set(
      'position',
      {
        x: left,
        y: top
      }
    )
  }, [left, top])

  return (
    <>
      <div id="pane">
        <div
          id="box"
          className="box"
          style={{ left, top }}
          title="you"
        ></div>
        {presence && Object.keys(positions)
          .filter(userName => userName !== presence.me)
          .map(userName => (
            <div
              key={userName}
              title={userName}
              className="box"
              style={{
                left: positions[userName].x,
                top: positions[userName].y
              }}>
            </div>
          ))}
      </div>
      { JSON.stringify(positions, undefined, 2)}
    </>
  )
}
