import SuccessFormImg from '../../assets/success-image.svg'
import Text from "../Text/Text.jsx";
const SuccessForm = () => {
    return(
        <>
            <Text tag={'h2'} type={'heading'}>User successfully registered</Text>
            <img src={SuccessFormImg} alt=""/>
        </>
    )
}
export default SuccessForm;