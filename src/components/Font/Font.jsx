import React from "react";

const Font = ({children,type='text',fontWeight='normal'})=>{

    const style= {
        fontFamily:`Nunito, sans-serif`,
        lineHeight: type==='text'?'26px':'40px',
        fontSize:`${type==='text'?'16':'40'}px`,
        fontWeight:fontWeight,
        textWrap:'balance',
    }

    return(
        <div style={style}>
            {children}
        </div>
    )
}
export default Font
