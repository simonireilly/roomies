import { FC } from 'react'
import { Player } from '../../page-components/room'

const Scoreboard: FC<{ players: { [key: string]: Player } }> = ({
  players,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players &&
            Object.entries(players)
              .sort((a, b) => b[1].score - a[1].score)
              .map(([key, val]) => (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.score || 0}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
