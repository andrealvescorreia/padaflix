import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import PlanoCard from "../../components/PlanoCard";
import "./styles.scss"

const PadariaProfile = () => {
    const { id } = useParams();
    const [planos, setPlanos] = useState<PlanoAssinatura[]>();

    const fetchPlanos = async () => {
        axiosInstance.get('/plano_de_assinatura/'+id)
        .then((response)=>{
            setPlanos(response.data)
        })
    }

    useEffect(() => {
        fetchPlanos()
    }, [])


    return (
        <div id="padaria-profile">
            <div className="grid">
                {
                    planos?.map(plano => <PlanoCard plano={plano} />)
                } 
            </div>
        </div>
    );
}
 
export default PadariaProfile;