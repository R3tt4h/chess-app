import React, { useState } from "react";
import "../App.css";
import Chessboard from "chessboardjsx";
import { playerMove, playerTurn } from "../utils/utils";

const Chess = require("chess.js");

function Game() {

    const gameId = localStorage.getItem("gameId")
    const [whoIsNext, setWhoIsNext] = useState(true);
    const [chess] = useState(
        new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    );


    const [fen, setFen] = useState(chess.fen());

    const handleMove = (move) => {
        if (chess.move(move)) {
        setTimeout(() => {
            chess.moves();
            setWhoIsNext(!whoIsNext);
            playerTurn(gameId)
            playerMove(gameId,move)
            
            console.log(move)
        });
        setFen(chess.fen());
        }
    };

    const handleStart = (position) => {
        return position = "start"
    }

    return (
        <div className="flex-center">
            <h1>Chess</h1>
            <p>
                {"Next Player: " + (whoIsNext ? "player_1" : "player_2")}
                <button id="startBtn" onClick={handleStart}>Start Position</button>

            </p>
            <p>Joueur 2</p>
            <Chessboard
                id="board"
                width={400}
                position = {fen}
                onDrop={(move) =>
                handleMove({
                    from: move.sourceSquare,
                    to: move.targetSquare,
                    promotion: "q",
                })
                }
                transitionDuration={300}
                boardStyle={{
                    borderRadius: "5px",
                    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                }}
            />
            <p>Joueur 1</p>
        </div>
    );
};

export default Game;
