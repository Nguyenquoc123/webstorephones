import React, { useEffect } from "react";
import '../popup/Popup.css'
function Popup({type, message, onclose}){
    useEffect(() => {
    
        setTimeout(() => {
            onclose();
        }, 2000)
    }, [onclose])
    return(
        <div className="popup">
            <img id="img-popup" src={type === true? '/images/success.png':'/images/fail.png'} alt="" />
            <p id="content-popup">{message}</p>
        </div>
    )
}

export default Popup