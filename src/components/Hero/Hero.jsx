import Button from "../Button/Button.jsx";
import Text from "../Text/Text.jsx";
import BG from '../../assets/pexels-alexandr-podvalny-1227513.jpeg'
import st from './style.module.scss'
import {scrollToElement} from "../../utils/scrollToElement.js";


const Hero = () => {
    const styles = {
        backgroundImage: `url(${BG})`,
    }
    return (
        <>
            <section className={st.hero} style={styles}>
                <div className={st.hero__wrapper}>
                    <div className={st.hero__content}>
                        <Text type={'heading'} tag={'h1'}>
                            Test assignment for front-end developer
                        </Text>
                        <Text>
                            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a
                            vast understanding of User design thinking as they'll be building web interfaces with accessibility
                            in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                        </Text>
                    </div>

                    <Button data-href={'form'} handleClick={scrollToElement}>
                        Sign up
                    </Button>
                </div>

            </section>


        </>
    )

}
export default Hero;