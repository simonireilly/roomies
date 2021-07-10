import { usePresence } from "@roomservice/react";
import { Player } from "../../page-components/room";

export default function Scoreboard() {
  const [players, setMyPlayer] = usePresence<Player>("demo", "players");

  return <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sore</th>
        </tr>
      </thead>
      <tbody>
        {
          players && Object.entries(players)
            .map(([key, val]) => {
              return <tr key={key}>
                <td>{val.name}</td>
                <td>{val.score || 0}</td>
              </tr>
            })
        }
      </tbody>
    </table>
  </div >
}
