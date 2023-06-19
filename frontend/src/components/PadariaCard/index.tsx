import { Link } from "react-router-dom";
import "./styles.scss"
import { FaStar } from 'react-icons/fa';
import CheckIcon from '@mui/icons-material/Check';

interface PadariaCardProps {
    padaria : {
        id: number,
        nome_fantasia: string,
        rating?: number,
    }
    isSubscribedToPadaria?: boolean
}

const PadariaCard = ( {padaria, isSubscribedToPadaria=false} : PadariaCardProps ) => {
    return <Link to={`/padarias/${padaria.id}`} id="padaria-card">
        <img className="logo"></img>

        <div className="information-container">
            <h3 className="padaria-name">{padaria.nome_fantasia}</h3>
            <div className="rating">
                <FaStar className="star"/>
                <p className="number">{padaria.rating? padaria.rating : 0}</p>
                {
                    isSubscribedToPadaria && 
                    <div className='subscription-status'>
                        <CheckIcon/>
                        Assinante
                    </div>
                }
            </div>
        </div>
    </Link>


    
}
 
export default PadariaCard;