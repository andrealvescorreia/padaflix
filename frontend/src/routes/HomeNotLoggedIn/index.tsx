import React from 'react'
import styles from './HomeNotLoggedIn.module.scss'
import MainImg from './img/giving-food-delivery.png'
import SecondaryImg from './img/delivery-girl.png'
import Bakery from './img/bakery.png'
import Rating from './img/rating-render.png'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from "react-router-dom";
import Footer from '../../components/Footer'

const ActionBttn = ({ children, linkTo }: { children: React.ReactNode, linkTo: string }) => {
  return <Link to={linkTo} className={styles.actionBttn}>{children}</Link>
}

const HomeNotLoggedIn = () => {
  return <div className={styles.home}>

    <div id={styles.mainContainer}>
      <h1>Produtos de padaria entregues na sua casa de forma simples.</h1>
      <p>
        Com o sistema de assinatura do Padaflix, veja como fica fácil receber refeições diárias.
      </p>
      <ActionBttn linkTo='/choose-profile'>Comece Agora<MdOutlineKeyboardArrowRight /></ActionBttn>
      <img src={MainImg} alt='Entregador entregando pacote de comida a cliente.' />
    </div>


    <div id={styles.secondaryContainer}>
      <h2>
        "Por que devo assinar o Padaflix?"
      </h2>
      <div className={styles.content}>
        <div className={styles.description}>
          <p>
            O Padaflix é uma plataforma de assinatura que conecta facilmente clientes a padarias, oferecendo entregas diárias de itens de panificadora para aqueles que valorizam a conveniência de receber em casa, evitando deslocar-se até o estabelecimento e esperar em filas.
          </p>
          <ActionBttn linkTo='/register-user'>Registrar-me</ActionBttn>
        </div>
        <img src={SecondaryImg} alt='Mulher entregadora com pacote na mão' />
      </div>
    </div>


    <div className={styles.container}>
      <img src={Bakery} alt="Dona de padaria organizando seus produtos" />
      <div>
        <h2>
          Mais controle nas vendas.
        </h2>
        <p>
          Com o sistema de assinaturas, sua padaria terá uma previsão mais precisa da quantidade e variedade de alimentos a serem fabricados diariamente, assim evitando desperdícios e custos extras, além de otimizar o gerenciamento do seu estabelecimento.
        </p>
        <ActionBttn linkTo='/register/user-padaria'>Registrar minha padaria</ActionBttn>
      </div>
    </div>


    <div className={styles.container}>
      <div>
        <h2>
          Encontre as melhores padarias.
        </h2>
        <p>
          Descubra novas padarias na sua cidade, com as melhores avaliações e os melhores produtos.
        </p>
        <ActionBttn linkTo='/padarias'>Ver Padarias</ActionBttn>
      </div>
      <img src={Rating} alt="Imagem ilustrativa de um balão com cinco estrelas" />
    </div>


    <div id={styles.callToActionContainer}>
      <h2>Comece agora gratuitamente</h2>
      <ActionBttn linkTo='/choose-profile'>Comece Agora<MdOutlineKeyboardArrowRight /></ActionBttn>
    </div>

    <Footer />

  </div>;
}

export default HomeNotLoggedIn;
