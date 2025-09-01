import Container from "../Container/Container.jsx";
import Button from "../Button/Button.jsx";
import Logo from '../../assets/Logo.svg'

import st from './style.module.scss'
import {scrollToElement} from "../../utils/scrollToElement.js";

const Header = () => {



    return (
            <header className={st.header}>
                <Container>
                    <nav className={st.header__navigation}>
                        <div className="logo">
                            <img src={Logo} alt=""/>
                        </div>
                        <div className={st.header__action}>
                            <Button data-href={'users'} handleClick={scrollToElement}>
                                User
                            </Button>
                            <Button data-href={'form'} handleClick={scrollToElement}>
                                Sign up
                            </Button>
                        </div>
                    </nav>
                
                   
                </Container>
                    
            </header>

    )

}
export default Header;