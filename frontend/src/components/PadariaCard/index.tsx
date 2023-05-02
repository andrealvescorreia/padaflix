import "./styles.scss"
import { FaStar } from 'react-icons/fa';

interface PadariaCardProps {
    id: number,
    name: string,
    rating: number,
}

const PadariaCard = ( padaria : PadariaCardProps ) => {
    return <div id="padaria-card">

        <img className="logo"></img>

        <div className="information-container">
            <h3 className="padaria-name">{padaria.name}</h3>
            <div className="rating">
                <FaStar className="star"/>
                <p className="number">{padaria.rating}</p>
            </div>
        </div>


    </div>;
}
 
export default PadariaCard;