import axiosInstance from "../../axios";
import PadariaCard from "../../components/PadariaCard";
import { PadariaUser, User } from "../../types/User";
import "./styles.scss"
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { useSnackbar } from 'notistack';

interface Props {
    user: User | PadariaUser | undefined
}
interface Padaria {
    id: number,
    nome_fantasia: string
}

const PadariasList = ({user} : Props) => {
    const [padarias, setPadarias] = useState<Padaria[]> ([]);
    const [isFetching, setIsFetching] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const fetchPadarias = async () => {
        setIsFetching(true)
        axiosInstance.get('/padarias/cep/'+user?.endereco.cep)
        .then((response) => {
            setPadarias(response.data);
        })
        .catch((err) => {
            enqueueSnackbar("Ocorreu um erro")
            console.log(err.response.data)
        })
        .finally(()=>{
            setIsFetching(false)
        })
   }

    useEffect(() => {
       fetchPadarias()
    }, [])


    return <div id="padarias-list">
        { isFetching ? <LinearProgress className="linear-progress" /> : null}
        <h2>Padarias</h2>

        <div className="grid">
            {
                padarias?.map(padaria => 
                    <PadariaCard 
                        {...padaria} 
                        key={padaria.id} 
                    />
                )
            }
            {
                padarias.length == 0 && !isFetching &&
                <h2>Sem padarias na sua cidade :(</h2>
            }
        </div>
    </div>;
}
 
export default PadariasList;



