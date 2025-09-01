import st from './style.module.scss'

const Container = ({contentCenter=false,children})=>{

    return(
        <div className={st.container} style={{textAlign:contentCenter?'center':'left'}} >
            {children}
        </div>
    )
}
export default Container;