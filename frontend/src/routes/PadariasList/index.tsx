import PadariaCard from "../../components/PadariaCard";
import "./styles.scss"
import { usePadarias } from './usePadarias'

const PadariasList = () => {

   const { padarias } = usePadarias();


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