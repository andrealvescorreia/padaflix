import "./styles.scss"
import axiosInstance from '../../axios';
import { useEffect, useState } from "react";

interface Padaria {
    id: number,
    nome_fantasia: string
}

export const usePadarias = () => {
    
    const [padarias, setPadarias] = useState<Padaria[]> ([]);

    const fetchPadarias = async () => {
        axiosInstance.get('/')
        .then((response) => {
            setPadarias(response.data.padarias);
        })
        .catch(() => {
            alert("Ih Serjão, sujou!")
        })
    }

    useEffect(() => {
        fetchPadarias()
    }, [])

    return { padarias };
}
 
