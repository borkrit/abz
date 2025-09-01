const Input = ({text,htmlFor ,type='radio'})=>{
    return(
        <div>

            <input name={htmlFor} id={text} type={type}/>
            <label htmlFor={text}>
                {text}
            </label>
        </div>
    )
}
export default Input;