import React, { useEffect } from "react";
import '../popup/Popup.css'
import imgsuccess from '../../icons/success.png'
import imgfail from '../../icons/fail.png'
function Popup({type, message, onclose}){
    useEffect(() => {
    
        setTimeout(() => {
            onclose();
        }, 2000)
    }, [onclose])
    return(
        <div className="popup">
            <img id="img-popup" src={type === true? imgsuccess:imgfail} alt="" />
            <p id="content-popup">{message}</p>
        </div>
    )
}

export default Popup