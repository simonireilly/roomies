import { usePresence } from "@roomservice/react";
import { Player } from "../../page-components/room";

export default function Scoreboard() {
  const [players, setMyPlayer] = usePresence<Player>("demo", "players");

  return <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {
          players && Object.entries(players)
            .sort((a, b) => b[1].score - a[1].score)
            .map(([key, val]) => 
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.score || 0}</td>
              </tr>
            )
        }
      </tbody>
    </table>
  </div >
}
