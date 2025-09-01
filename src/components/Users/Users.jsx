import { useRef} from "react";

import Container from "../Container/Container.jsx";
import Button from "../Button/Button.jsx";
import Card from "../Card/Card.jsx";
import Text from "../Text/Text.jsx";
import {useUsers} from "../../context.jsx";
import st from './style.module.scss'
import Preloader from "../Preloader/Preloader.jsx";



const Users = () => {
    const {data,fetchData,loading,error} = useUsers()

    const handleClick = async ()=>{
        fetchData(data?.page+1)
    }
    if (error){
        return <div>Opps...</div>
    }

    return (
        <section id="users">
            <Container contentCenter={true}>
                <Text tag={'h2'} type={'heading'}>Working with GET request </Text>
                {(loading && data?.page === 1) && <Preloader /> }
                {
                    data?.users &&  <div className={st.users__lists}>

                        {
                            data?.users?.map((user, index) => <Card key={index} userInfo={user} />)
                        }
                    </div>
                }

                {
                    data?.page !== data?.total_pages ?
                        <Button handleClick={handleClick} customCss={{paddingInline:'19px 18px',width:'max-content'}}>

                            {loading ? 'Loading...':'Show more'
                            }
                        </Button>:null
                }

            </Container>
        </section>
    )
}
export default Users;