import Container from "../Container/Container.jsx";
import Text from "../Text/Text.jsx";
import Button from "../Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import SuccessForm from "./SuccessForm.jsx";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Upload from "../Upload/Upload.jsx";
import {useUsers} from "../../context.jsx";


const validation = {
    name:{
        required:true,
        length: {min: 2, max: 60},
    },
    email:{
        required: true,
        pattern:/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone:{
        required:true,
        pattern: /^[+][380][0-9]{10}/
    },
    position_id:{
        required:true,
    },
    photo:{
        required:true,
    }

}

const Form = () => {
    const {fetchData} = useUsers()
    const [successFormSend, setSuccessFormSend] = useState(false);
    const [position, setPosition] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position_id: '',
        photo: null

    })
    const errorList = useRef([]);
    const disableBtn  = useRef(true);


    useEffect(() => {
        async function fetchPosition() {
            const res = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`);
            const json = await res.json();
            setPosition(json?.positions);
            return json;
        }

        fetchPosition()
    }, []);

    const getToken = async ()=>{
      const res =  await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        const json = await res.json();
        return json?.token;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(errorList.current.length > 0){
            return;
        }

       const token =  await getToken();
        const formDataReq = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataReq.append(key, value);
        })

        disableBtn.current = true;
       const res = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Token": token
            },
            body: formDataReq
        })
        const data = await res.json();

        if (data?.success){
            setSuccessFormSend(true);
            setTimeout(() => {
                setSuccessFormSend(false);
            }, 4000);
            fetchData(1,"RESET")
        }


    }

    const handleCheckBtnDisable = (state) => {
        const isValid = Object.values(state).every((item) => !!item);
        if(isValid && errorList.current.length === 0) return disableBtn.current=false
        return disableBtn.current=true

    }

    const handleSetDataForm = (e) => {

        if(validation[e.target.name]){
            Object.entries(validation[e.target.name]).forEach(([key, value]) => {
                const val = e.target.value.trim();

                if (key === "required" && value === true) {
                    if (val === "" || val === null) {
                        if (!errorList.current.includes(e.target.name)) {
                            errorList.current.push(e.target.name);
                        }
                    } else {
                        errorList.current = errorList.current.filter(
                            (item) => item !== e.target.name
                        );
                    }
                }

                if (key === "length") {
                    if (val.length < value.min || val.length > value.max) {
                        if (!errorList.current.includes(e.target.name)) {
                            errorList.current.push(e.target.name);
                        }
                    } else {
                        errorList.current = errorList.current.filter(
                            (item) => item !== e.target.name
                        );
                    }
                }

                if(key === "pattern"){

                    if(!new RegExp(value).test(val)){
                        if (!errorList.current.includes(e.target.name)) {
                            errorList.current.push(e.target.name);
                        }
                    }else{
                        errorList.current = errorList.current.filter(
                            (item) => item !== e.target.name
                        );
                    }
                }

            })
        }


        const newState = {...formData, [e.target.name]: e.target.value,}
        setFormData(newState)

        handleCheckBtnDisable(newState)
    }
    const handleSetPhoto = (e) => {
        const newState = {...formData,'photo': e,}
        setFormData(newState)

        handleCheckBtnDisable(newState)
    }

    const formatterNumber =(e)=>{
        let raw = e.target.value.replace(/[\D]/g, ""); // оставить только цифры

        if (!raw.startsWith("380")) {
            raw = "380" + raw;
        }

        const formatted = raw.replace(
            /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
            "+$1 ($2) $3 - $4 - $5"
        );

        e.target.value = formatted;
    }

    return (
        <section id={'form'}>
            <Container contentCenter={true}>
                {!successFormSend && <>
                    <Text tag={'h2'} type={'heading'}>Working with Post request </Text>
                    <form action="" style={{
                        maxWidth: '380px',
                        marginBlock: '50px',
                        width: '100%',
                        display: "flex",
                        marginInline: 'auto',
                        flexDirection: 'column',
                        gap: '50px'
                    }}>

                        <TextField error={errorList.current.includes('name')}
                                   fullWidth name={'name'}
                                   onChange={handleSetDataForm}
                                   id="name"
                                   label="Your name"
                                   variant="outlined"
                                   helperText={
                                       errorList.current.includes('name') && (
                                       formData['name'].length === 0 ? "should be not empty":
                                       formData['name'].length < 2 ? 'should be more than 2':
                                           formData['name'].length > 60 ?'should be less than 60':null)
                                   }
                        />
                        <TextField
                            error={errorList.current.includes('email')}
                            fullWidth name={'email'} type={'email'} onChange={handleSetDataForm} id="email" label="Email"
                                   variant="outlined"
                                   helperText={
                                       errorList.current.includes('email') ? "should be not empty":null
                        }
                        />
                        <TextField
                            error={errorList.current.includes('phone')}
                            fullWidth
                            onChange={handleSetDataForm}
                            onFocus={(e)=>{
                                e.target.value = e.target.value.trim().replace(/[^\d+]/g, "");
                            }}
                            onBlur={(e)=>
                                formatterNumber(e)
                            }
                            id="phone"
                            name="phone"
                            label="Phone"
                            inputProps={{
                                maxLength: 13,
                            }}
                            helperText="+38 (XXX) XXX - XX - XX"

                        />


                        <FormControl>
                            <FormLabel
                                sx={{
                                    textAlign: 'start',
                                    color:'rgba(0, 0, 0, 0.87)',
                                    marginBottom: '11px',
                                    "&.Mui-focused": {  color:'rgba(0, 0, 0, 0.87)'}
                                }}
                                id="demo-radio-buttons-group-label">
                                <Text>
                                    Select your position
                                </Text>
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="position_id"
                                onChange={handleSetDataForm}
                                sx={{
                                    gap: '7px',
                                }}

                            >
                                {
                                    position?.map((item, index) => (
                                        <FormControlLabel
                                            sx={{
                                                '& .Mui-checked':{
                                                    color:'#00BDD3'
                                                },
                                                '& .Mui-checked:hover':{
                                                    color:' rgba(0, 228, 255, 0.38)'
                                                }
                                            }}
                                            key={index} value={item.id} control={<Radio
                                        sx={{
                                            color:'#D0CFCF',
                                            paddingBlock: 0,

                                            '&.Mui-checked': {
                                                color: '#00BDD3',
                                            }
                                        }}
                                        />}
                                            label={<Text>{item.name}</Text>}/>
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        <Upload name={'photo'}
                                setPhoto={handleSetPhoto}/>

                        <Button
                            customCss={{marginInline: 'auto'}}
                            disabled={disableBtn.current} handleClick={handleSubmit} >
                            Sign up
                        </Button>
                    </form>
                </>}

                {successFormSend && <SuccessForm/>}

            </Container>
        </section>
    )
}
export default Form