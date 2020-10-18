import { Directions } from "../../pages"

export const Controls = ({ directions }: { directions: Directions }) => {
  const setDirection = (actionName, value: boolean, e: MouseEvent) => {
    e.preventDefault()
    directions[actionName] = value
  }

  const ButtonAction = (actionName: keyof Directions) => ({
    onMouseDown: e => setDirection(actionName, true, e),
    onTouchStart: e => setDirection(actionName, true, e),
    onMouseUp: e => setDirection(actionName, false, e),
    onMouseLeave: e => setDirection(actionName, false, e),
    onTouchEnd: e => setDirection(actionName, false, e)
  })

  return (
    <>
      <p>Alpha</p>
      <button className='control' {...ButtonAction('ArrowDown')} >
        Down
    </button>
      <button className='control' {...ButtonAction('ArrowUp')} >
        Up
    </button>
      <button className='control' {...ButtonAction('ArrowLeft')} >
        Left
    </button>
      <button className='control' {...ButtonAction('ArrowRight')} >
        Right
    </button>
    </>
  )
}

