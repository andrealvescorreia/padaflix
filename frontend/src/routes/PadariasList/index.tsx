import axiosInstance from "../../axios";
import PadariaCard from "../../components/PadariaCard";
import { PadariaUser, User } from "../../types/User";
import "./styles.scss"
import { useEffect, useState } from "react";

interface Props {
    user: User | PadariaUser | undefined
}
interface Padaria {
    id: number,
    nome_fantasia: string
}

const PadariasList = ({user} : Props) => {
   const [padarias, setPadarias] = useState<Padaria[]> ([]);

   const fetchPadarias = async () => {
       axiosInstance.get('/padarias/cep/'+user?.endereco.cep)
       .then((response) => {
           setPadarias(response.data);
       })
       .catch(() => {
           alert("Ih Serjão, sujou!")
       })
   }

   useEffect(() => {
       fetchPadarias()
    }, [])


    return <div id="padarias-list">

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
        </div>
    </div>;
}
 
export default PadariasList;



