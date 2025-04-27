import { BsCircle } from "react-icons/bs";
import { RiCloseLargeFill } from "react-icons/ri";
import {useState, useRef} from "react";

function Tile({activePlayer, swapPlayer, winState}) {
    const ref = useRef(null);
    const [circle, setCircle] = useState("unclicked");
    const [x, setx] = useState("unclicked");



    function handleClick(e) {

        let classes = ref.current.classList;
        if (!classes.contains("player1") && !classes.contains("player2")){
            console.log(classes);
            if (activePlayer === 1) {
                setx("clicked");
                e.target.classList.add("player1");
                swapPlayer();
            }else{
                setCircle("clicked");
                e.target.classList.add("player2");
                swapPlayer();
            }
            winState();
        }
    }

    return (
        <>

            <div className="tile" ref={ref} onClick={(e)=>{handleClick(e)}}>
                <RiCloseLargeFill id={x}/>
                <BsCircle id={circle}/>
            </div>

        </>
    )

}

export default Tile;