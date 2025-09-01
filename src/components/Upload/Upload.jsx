import {TextField} from "@mui/material";
import {useRef, useState} from "react";
import Text from '../Text/Text.jsx'
import Button from "../Button/Button.jsx";

import st from './style.module.scss'
const initialState = {txt:'',display:false}

const Upload =({name,setPhoto})=>{
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(initialState);

    const uploadHandle = (e)=>{
        e.preventDefault();
        inputRef.current.click();
    }

    const handleSetPhoto = (e)=>{
        if(e.target.files[0].size > 5 * 1024 * 1024){
            setError({display: true,txt: 'file is too large should be less than 5MB'});
            setFile(null)
            setPhoto(null)
            return
        }
        const image =  new Image();
        image.src = URL.createObjectURL(e.target.files[0]);

        image.onload = () => {
            URL.revokeObjectURL(image.src);
            if( image.width < 70 && image.height < 70){
                setError({display: true,txt: 'resolution should be larger than 70x70'});
                setFile(null)
                setPhoto(null)
                return
            }
            setError(initialState)
            setFile(e.target.files[0])
            setPhoto(e.target.files[0])

        };




    }


    return(
        <>
            <div className={st.upload}>
                <input name={name} id={name} onChange={(e)=>handleSetPhoto(e)} ref={inputRef} type="file"
                       hidden
                       accept="image/jpeg, image/jpg"
                />
                <div
                    className={`${st.upload__wrapper} ${error.display && st.upload__wrapper__error}`}
                >
                    <Button onClick={uploadHandle} customClass={`${st.upload__btn} ${error.display && st.upload__btn__error}`}>
                        <Text>
                            Upload
                        </Text>
                    </Button>
                    <TextField
                        fullWidth
                        error={error.display}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{
                            '& .MuiInputBase-input':{
                                padding: '15.5px 16px',
                            },
                            '& .MuiOutlinedInput-notchedOutline':{
                                borderRadius: '0px 4px 4px 0px',
                                borderLeft: 'none',
                                },
                            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                                borderColor: 'transparent'
                            },
                        }}
                        value={file?.name || null}
                        placeholder={'Upload your photo'}
                    />
                    {
                        error.display && <div className={st.error} style={{}}>
                            <Text>
                                {error.txt}
                            </Text>
                        </div>
                    }
                </div>


            </div>
        </>
    )

}
export default Upload;
