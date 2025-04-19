import Tile from './Tile.jsx';
import {useEffect, useRef, useState} from "react";
import tile from "./Tile.jsx";

/*

the overall game board
    smaller boards
        tiles: innerContent "x" : "O" -->
            direction check:
                grab the "director indicator"
                    if the smolBoard indicated by the direction indicator is unclaimed, move into that space for play
                    else: play state is the same as the opening move
                continue
            territory check:
                if a player has won the tictactoe game in the smolBoard, they win the square
                the square takes on the ID of that player "x" : "O"
                the square is marked "permDisabled"
            win state check:
                Compare claimed territory on the board, if win conditions met - declare winner & reset
                Else: continue


 */

function Board(props) {
    //tiles are named after the row (R) and column (C) they are in. tileR1C1 is tile Row 1 Column 1

    //we need to use the useRef react hook to snag the tiles. We don't need the tiles to rerender anyway so its fine
    const boardRef = useRef(null);
    let winner;

    function setWinner(winArr){
        if (winArr[0] === 1){
            return "player1";
        }else{
            return "player2";
        }
    }

    function evalWinState(winArr){
        //accepts an array and determines if the values are the same
        if (winArr.length === 3) {
            for (let x = 1; x < 3; x++) {
                if (winArr[x] !== winArr[x-1]){
                    return false;
                }
            }
            winner = setWinner(winArr);
            return true;
        }
    }

    function winStateCheck(){
        let winState = false;
        let rowCheck = [];
        let columnCheck = []

        //row win condition check

        for (let item of boardRef.current.children) {
            if(!winState){
                for (let tile of item.children) {
                    if (tile.classList.contains("player1")) {
                        rowCheck.push(1);
                    }else if (tile.classList.contains("player2")){
                        rowCheck.push(2);
                    }else{
                        break;
                    }
                }

                winState = evalWinState(rowCheck);
                rowCheck = [];
            }

        }

        // column win condition check

        for (let x = 0; x < 3; x++) { //we know we have 3 columns
            if(!winState){
                for (let y = 0; y <= 3; y++) { // each column has 3 rows
                    for (let item of boardRef.current.children) {
                        if (item.children[x].classList.contains("player1")) {
                            columnCheck.push(1);
                        } else if (item.children[x].classList.contains("player2")) {
                            columnCheck.push(2);
                        } else {
                            break;
                        }
                    }
                    winState = evalWinState(columnCheck);
                    columnCheck = [];
                }
            }
        }

        // diagonal win condition check --- essentially we need [0][0], [1][1], [2][2] and [0][2], [1][1], [2][0]
        if (!winState){
            if (boardRef.current.children[0].children[0].classList.contains("player1")) {
                if (boardRef.current.children[1].children[1].classList.contains("player1")){
                    if (boardRef.current.children[2].children[2].classList.contains("player1")){
                        winner = "player1";
                        winState = true;
                    }
                }
            }else if (boardRef.current.children[0].children[0].classList.contains("player2")) {
                if (boardRef.current.children[1].children[1].classList.contains("player2")) {
                    if (boardRef.current.children[2].children[2].classList.contains("player2")) {
                        winner = "player2";
                        winState = true;
                    }
                }
            }else if (boardRef.current.children[0].children[2].classList.contains("player1")) {
                if (boardRef.current.children[1].children[1].classList.contains("player1")) {
                    if (boardRef.current.children[2].children[0].classList.contains("player1")) {
                        winner = "player1";
                        winState = true;
                    }
                }
            }else if (boardRef.current.children[0].children[2].classList.contains("player2")) {
                if (boardRef.current.children[1].children[1].classList.contains("player2")) {
                    if (boardRef.current.children[2].children[0].classList.contains("player2")) {
                        winner = "player2";
                        winState = true;
                    }
                }
            }
        }

        if (winState) {
            window.alert(`The winner is ${winner}`);
        }

    }

    return (
        <>
            <h2>BEHOLD, the board</h2>
            <h3>Active Player: Player {props.player}</h3>
            <div id="board" ref={boardRef}>
                <div id="row1" className="row">
                    <Tile id="tileR1C1" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                    <Tile id="tileR1C2" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                    <Tile id="tileR1C3" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                </div>
                <div id="row2" className="row">
                    <Tile id="tileR2C1" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                    <Tile id="tileR2C2" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                    <Tile id="tileR2C3" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                </div>
                <div id="row3" className="row">
                    <Tile id="tileR3C1" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                    <Tile id="tileR3C2" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                    <Tile id="tileR3C3" winState={winStateCheck} activePlayer={props.player} swapPlayer={props.swapPlayer}></Tile>
                </div>
            </div>

        </>
        )
}

export default Board;
