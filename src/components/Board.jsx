import Tile from './Tile.jsx';
import {useEffect, useRef, useState} from "react";

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

    function winStateCheck(){
        let winState = false;
        let winner;
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

                if (rowCheck.length === 3) {
                    for (let x = 1; x < 3; x++) {
                        if (rowCheck[x] === rowCheck[x-1]){
                            winState = true;
                        }else{
                            winState = false;
                            console.log("we hit the false condition");
                        }
                    }
                    if (winState) {
                        if (rowCheck[0] === 1){
                            winner = "player1";
                        }else{
                            winner = "player2";
                        }
                        alert(`The winner is ${winner}`);
                    }

                }
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
                    console.log(columnCheck);
                    if (columnCheck.length === 3) {
                        for (let x = 1; x < 3; x++) {
                            if (columnCheck[x] === columnCheck[x-1]){
                                winState = true;
                            }else{
                                winState = false;
                            }
                        }
                        if (winState) {
                            if (columnCheck[0] === 1){
                                winner = "player1";
                            }else{
                                winner = "player2";
                            }
                            alert(`The winner is ${winner}`);
                        }

                    }
                    columnCheck = [];
                }


            }

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
