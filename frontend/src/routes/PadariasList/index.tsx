import PadariaCard from "../../components/PadariaCard";
import "./styles.scss"
import axiosInstance from '../../axios';
import { useEffect, useState } from "react";

interface Padaria {
    id: number,
    nome_fantasia: string
}

const PadariasList = () => {

    const [padarias, setPadarias] = useState<Padaria[]> ([]);

    useEffect(() => {
    (
        async () => {
        axiosInstance.get('/')
        .then((response) => {
            setPadarias(response.data.padarias);
        })
        .catch(() => {
            alert("Ih Serjão, sujou!")
        })
        }
    )();
    })


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