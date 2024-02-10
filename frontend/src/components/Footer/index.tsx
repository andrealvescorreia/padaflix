import './styles.scss';
import githubLogo from '../../assets/github-logo-white.svg'

const Footer = () => {
  return (
    <footer id="padaflix-footer">
      <p>UEPB - Engenharia de Software II, Gerenciamento de Projetos, Interface Homem Computador</p>
      <p>© 2024 - <a href="https://github.com/andrealvescorreia/padaflix/" target="_blank">Padaflix</a> </p>
      
      <p className='github-links'>
        <img src={githubLogo} alt="github logo"/>
        <a href="https://github.com/andrealvescorreia" target="_blank">André Alves</a>
        , &nbsp;
        <a href="https://github.com/ArthurMedeiros29" target="_blank">Arthur Medeiros</a>
        , &nbsp;
        <a href="https://github.com/Artur906" target="_blank">Artur Dantas</a>
        , &nbsp;
        <a href="https://github.com/meljael" target="_blank">Meljael Daniel</a>
        , &nbsp;
        <a href="https://github.com/welly555" target="_blank">Wellyngton Targino</a>
      </p>
    </footer>
  );
}
 
export default Footer;