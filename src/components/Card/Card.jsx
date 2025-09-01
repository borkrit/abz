import st from './style.module.scss'
import Text from '../Text/Text.jsx'
import DefaultImage from '../../assets/photo-cover.svg'
import {Button, Tooltip} from "@mui/material";

const Card = ({userInfo})=>{

    const {name,photo,position,email,phone} = userInfo
    const photoUser = photo || DefaultImage
    return (
        <>
        <div className={st.card}>
            <img src={photoUser} alt=""/>
            <Tooltip title={name} arrow>
                <Button>
                    <Text>{name}</Text>
                </Button>
            </Tooltip>
            <div className={st.card__information}>
                <Tooltip title={position} arrow>
                    <Button>
                        <Text>{position}</Text>
                    </Button>
                </Tooltip>
                <Tooltip title={email} arrow>
                    <Button>
                    <Text>{email}</Text></Button>
                </Tooltip>
                <Tooltip title={phone} arrow>
                    <Button>
                    <Text>
                        {phone}
                    </Text>
                        </Button>

                </Tooltip>

            </div>

        </div>
        </>
    )
}
export default Card;