import st from "./style.module.scss"
import Font from "../Font/Font.jsx";
const Button = ({ disabled=false, children,handleClick,...props})=>{
    return (
        <button style={props?.customCss} disabled={disabled} className={`${st.button} ${props.customClass}`} onClick={handleClick} {...props}>
            <Font>
                {children}
            </Font>
        </button>
    )
}
export default Button;