import "./styles.scss"
import { FaStar } from 'react-icons/fa';

interface PadariaCardProps {
    id: number,
    nome_fantasia: string,
    rating?: number,
}

const PadariaCard = ( padaria : PadariaCardProps ) => {
    return <div id="padaria-card">

        <img className="logo"></img>

        <div className="information-container">
            <h3 className="padaria-name">{padaria.nome_fantasia}</h3>
            <div className="rating">
                <FaStar className="star"/>
                <p className="number">{padaria.rating? padaria.rating : 0}</p>
            </div>
        </div>


    </div>;
}
 
export default PadariaCard;