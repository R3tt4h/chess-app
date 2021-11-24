import React, { useState, useEffect } from "react";
import "../App.css";
import Chessboard from "chessboardjsx";
import { playerMove, playerTurn } from "../utils/utils";
import { onSnapshot, collection, orderBy, query, doc, getDoc } from '@firebase/firestore';
import db from "../firebase";




const Chess = require("chess.js");


function Game() {

    const gameId = localStorage.getItem("gameId")
    const [chess] = useState(
        new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    );
    const [fen, setFen] = useState(chess.fen());
    const [moves, setMoves] = useState([{from: " ", to: " ", promotion: "q",  id: "initial"}]);





    useEffect(() => {
        const collectionRef = collection(db, `/games/${gameId}/moves`);

        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsub = onSnapshot(q,(snapshot) => {
          setMoves(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
          snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
                console.log("Modified : ", change.doc.data());
                handleMove(change.doc.data())
            }

          });

        });
        return unsub;
    }, []);
    
    const [ whoIsNext, setWhoIsNext ] = useState(true)

    const handleMove = (move) => {
        if (chess.move(move)) {
        setTimeout(() => {
            chess.moves();
            playerTurn(gameId)
            console.log("whoIsNext : ", whoIsNext)

        });
        setFen(chess.fen());
        }
    };

    const handleClickHistoric = () => {
        document.getElementById('historic').className = 'show'
        document.getElementById('chat').className = 'hide'
    }

    const handleClickChat = () => {
        document.getElementById('historic').className = 'hide'
        document.getElementById('chat').className = 'show'
    }


    return (
        <div className="main center">
            <div className="game">
                <div className="row">
                    <div className="chessboard">
                        player_2
                        <Chessboard
                            id="board"
                            width={520}
                            position = {fen}
                            onDrop={(move) =>
                                playerMove(gameId, {
                                    from: move.sourceSquare,
                                    to: move.targetSquare,
                                    promotion: "q",
                                })
                            }
                            transitionDuration={300}
                            boardStyle={{
                                borderRadius: `5px`,
                                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                            }}
                        />
                        player_1
                    </div>
                    <div className="utilitary">
                        <div className="title">
                            <h1>Chess</h1>
                            <p>
                                {( whoIsNext ? "player_1" : "player_2" ) + " it's your turn !"}
                            </p>
                        </div>
                        <div className="selector_2">
                            <button onClick={handleClickChat} >Chat</button>
                            <button onClick={handleClickHistoric} >Historic</button>
                        </div>
                        <div id="historic" className="hide">
                            {moves.map((moves) => (
                                <li key={moves.id}>
                                    from : {moves.from} <br/> to : {moves.to}
                                    <br/>
                                    <br/>

                                </li>
                            ))}
                        </div>
                        <div id="chat" className="show">
                            <div>
                                <p>Chat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
