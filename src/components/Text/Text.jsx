import React from "react";
import Font from "../Font/Font.jsx";

const Text =({tag='p',type='text',children})=>{
    return(
        <Font type={type}>
            {React.createElement(tag, null, children)}
        </Font>
    )
}

export default Text