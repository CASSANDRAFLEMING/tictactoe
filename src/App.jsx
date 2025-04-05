import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board.jsx'

function App() {
    const [activePlayer, setActivePlayer] = useState(1)

    function swapPlayer(){
        if(activePlayer === 1){
            setActivePlayer(2);
        }else{
            setActivePlayer(1);
        }
    }

    //win conditions
    /*
        row win: if r[x][0]-r[x][2] all equal same player --- win
        column win: if r[0][x]-r[2][x] all equal same player --- win
        diag left win: if r[0][0], r[1][1], r[2][2] all equal same player --- win
        diag right win: if r[0][2], r[1][1], r[2][0] all equal same player --- win
        else: scratch/cats --- nobody wins
     */


    return (
        <>
            <h1>Tic Tac Toe Game</h1>
            <div className="board">
                <Board player={activePlayer} swapPlayer={swapPlayer}/>
            </div>
            <p className="read-the-docs">
              A tic tac toe game in react app cause why not
            </p>
            <button onClick={swapPlayer}>A BUTTON FOR PLAYER SWAP</button>
        </>
    )
}

export default App
