import { usePresence } from "@roomservice/react";
import { Player } from "../../pages";

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
            .filter(([_, val]) => val.name !== name)
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
