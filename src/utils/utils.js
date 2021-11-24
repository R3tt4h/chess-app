import { collection, addDoc, doc, serverTimestamp, getDoc, updateDoc } from '@firebase/firestore';
import db from "../firebase";


export const handleNewGame = async () => {

    const name = document.getElementById("input").value;
    const collectionRef = collection(db, "games");

    const player_1 = "player_1"
    const player_2 = "null"
    const whoIsNext = true
    const payload = { name, player_1, player_2, whoIsNext };

    const docRef = await addDoc(collectionRef, payload);
    localStorage.setItem("gameId", docRef.id)

    window.location = (`/${docRef.id}`)
};

export const handleJoinGame = async (id) => {

    const docRef = doc(db, "games", id);
    const player_2 = "player_2"
    const payload = { player_2 }

    await updateDoc(docRef, payload)
    localStorage.setItem("gameId", docRef.id)


    window.location = (`/${docRef.id}`)

}

export const playerTurn = async (gameId) => {
    
    const docRef = doc(db, "games", gameId);
    const gameData = await getDoc(docRef);

    if(gameData.data().whoIsNext === true) {
        const whoIsNext = false
        const payload = { whoIsNext };
        await updateDoc(docRef, payload);

        console.log("turn :", whoIsNext)
        console.log("gameId : ", gameId)
    } else {
        const whoIsNext = true;
        const payload = { whoIsNext };
        await updateDoc(docRef, payload);

        console.log("turn :", whoIsNext)
        console.log("gameId : ", gameId)
    }
}

export const playerMove = async (gameId, move) => {
    const collectionRef = collection(db, `/games/${gameId}/moves`);
    const payload = { from: move.from, to: move.to, promotion: move.promotion, timestamp: serverTimestamp() };
    await addDoc(collectionRef, payload);
    // Ajouter a une liste
    // onChange Event
    
    }


// Copier/Coller playerTurn + onSnapshot setBoard

// prompt pseudo apres selection du nom de la partie