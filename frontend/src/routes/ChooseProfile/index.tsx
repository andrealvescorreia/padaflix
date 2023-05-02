import {FaUser} from 'react-icons/fa'
import {FaBreadSlice} from 'react-icons/fa'
import styles from './ChooseProfile.module.scss'
import { Link } from 'react-router-dom';

import EatingBread from './imgs/eating-bread.png'
import Baker from './imgs/baker.png'

const ChooseProfile = () => {
  return <div id={styles.choose_profile}>
    <h1>Qual o seu perfil?</h1>
    
    <div className={styles.profiles}>
      <div className={styles.profile_container}  id={styles.client_profile} >
        
        <Link to='/register/user' className={styles.profile_card} >
          <div className={styles.description} >
            <h2>Cliente</h2>
            <p>Quero usar o Padaflix para encontrar padarias das quais posso assinar e receber produtos em casa.</p>
          </div>
          <FaUser />
        </Link>
        <img className={styles.bgImage} src={EatingBread}/>
      </div>

      <div className={styles.profile_container}  id={styles.baker_profile} >
        <Link to='/register/user-padaria' className={styles.profile_card}>
          <FaBreadSlice />
          <div className={styles.description} >
            <h2>Padaria</h2>
            <p>Quero usar o Padaflix para prover planos dos quais clientes podem assinar, e expandir o meu negócio.</p>
          </div>
        </Link>
        <img className={styles.bgImage} src={Baker}/>
      </div>
    </div>

  </div>;
}
 
export default ChooseProfile;