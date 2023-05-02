import PadariaCard from "../../components/PadariaCard";
import "./styles.scss"

interface Padaria {
    id: number,
    name: string,
    rating: number,
}

const PadariasList = () => {

    const padarias : Padaria[] = [
        {
            id: 1,
            name: "Padaria Pão Bom",
            rating: 4.2
        },
        {
            id: 2,
            name: "Padaria da Dona Mariazinha",
            rating: 4.2
        },
        {
            id: 3,
            name: "Já pão",
            rating: 5
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },
        {
            id: 4,
            name: "Cacetinho do Zé",
            rating: 4
        },

    ]; 


    return <div id="padarias-list">

        <h2>Padarias</h2>

        <div className="grid">
            {
                padarias.map(padaria => 
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