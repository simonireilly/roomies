import { FC } from 'react'
import { Directions } from '../../page-components/room'

const Controls: FC<{ directions: Directions }> = ({ directions }) => {
  const setDirection = (actionName, value: boolean, e: MouseEvent) => {
    e.preventDefault()
    directions[actionName] = value
  }

  const ButtonAction = (actionName: keyof Directions) => ({
    onMouseDown: (e) => setDirection(actionName, true, e),
    onTouchStart: (e) => setDirection(actionName, true, e),
    onMouseUp: (e) => setDirection(actionName, false, e),
    onMouseLeave: (e) => setDirection(actionName, false, e),
    onTouchEnd: (e) => setDirection(actionName, false, e),
  })

  return (
    <>
      <div className="up-down-control">
        <button className="control" {...ButtonAction('ArrowUp')}>
          &uarr;
        </button>
        <button className="control" {...ButtonAction('ArrowDown')}>
          &darr;
        </button>
      </div>
      <div className="left-right-control">
        <button className="control" {...ButtonAction('ArrowLeft')}>
          &larr;
        </button>
        <button className="control" {...ButtonAction('ArrowRight')}>
          &rarr;
        </button>
      </div>
    </>
  )
}

export default Controls
