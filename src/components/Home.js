import { useEffect, useState } from 'react';
import { onSnapshot, collection } from '@firebase/firestore';
import db from "../firebase";
import { handleNewGame, handleJoinGame } from "../utils/utils";

function Home() {
    
    const [games, setGames] = useState([{name: "Loading...", id: "initial"}]);

    useEffect(
      () => 
        onSnapshot(collection(db, "games"),(snapchot) => 
          setGames(snapchot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
      []
    );

    return (
        <div>
            <div>
                <p>Game en cours :</p>
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>
                            {game.name}
                            <button className="button" onClick={() => handleJoinGame(game.id)}>Join</button>
                        </li>
                    ))}
                </ul>
            </div>
            <input type="text" placeholder="Nom de la partie..." id="input"></input>
            <button className="button" onClick={handleNewGame}>Play</button>
        </div>
    )
}

export default Home
