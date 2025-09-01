import { useRef, useState} from "react";

export const useFetch = () => {
    const [data,setData] = useState({users:[],page:1,total_pages:1});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const loadingReq = useRef(false);

    const fetchData = async (page=1,type="CREATE") => {
        try {

            setLoading(true);
            if(!loadingReq.current){
                loadingReq.current = true;
                const res = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
                const json = await res.json();
                setLoading(false);
                if(type==='CREATE'){
                    setData(prevState => ({...prevState,users: [...prevState.users,...json.users],
                        page:json.page,
                        total_pages:json.total_pages}));

                }else if(type==='RESET'){
                    setData({users: [...json.users],page:json.page,total_pages:json.total_pages});

                }
                loadingReq.current = false;
            }

        }catch(err){
            setLoading(false);
            loadingReq.current = false;
            setError(err);
        }

    }



    return {fetchData,data, error, loading};
}