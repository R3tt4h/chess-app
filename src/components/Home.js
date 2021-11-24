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

    const handleClickCurrentGame = () => {
        document.getElementById('current_game_list').className = 'show'
        document.getElementById('new_game_form').className = 'hide'
    }

    const handleClickNewGame = () => {
        document.getElementById('current_game_list').className = 'hide'
        document.getElementById('new_game_form').className = 'show'
    }


    return (
        <main className="main center">
            <div className="menu">
                <h1>Chess</h1>
                <div className="selector">
                    <button onClick={handleClickCurrentGame} >Rejoindre une partie</button>
                    <button onClick={handleClickNewGame} >Créer une partie</button>
                </div>
                <div id="current_game_list" className="show">
                    <ul className="current_game_list">
                        {games.map((game) => (
                            <li key={game.id}>
                                <p>{game.name}</p>
                                <button onClick={() => handleJoinGame(game.id)}>Rejoindre</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="new_game_form" className="hide">
                    <div className="new_game_form">
                        <input type="text" placeholder="Nom de la partie..." id="input"></input>
                        <button onClick={handleNewGame}>Créer</button>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Home
