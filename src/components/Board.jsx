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
        console.log("winStateCheck has been triggered!")

        //rowCheck
        for (let item of boardRef.current.children) {
            for (let tile of item.children) {
                if (tile.classList.contains("player1")) {
                    rowCheck.push(1);
                }else{
                    break;
                }
            }
            if (rowCheck.length === 3) {
                winState = true;
                if (rowCheck[0] === 1){
                    winner = "player1";
                }else{
                    winner = "player2";
                }
                console.log("The winner is " + winner);

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
