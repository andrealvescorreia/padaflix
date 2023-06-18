import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import "./styles.scss";
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../../assets/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import FeedIcon from '@mui/icons-material/Feed';
import { PadariaUser } from '../../types/User';


interface SideBarPadariaProps {
    padaria: PadariaUser,
    logout: () => void,
}
  

const SideBarPadaria = ({logout, padaria} : SideBarPadariaProps) => {
    return (
        <Sidebar id="sidebar-padaria">
            <Menu
                menuItemStyles={{
                    button: {
                      // the active class will be added automatically by react router
                      // so we can use it to style the active menu item
                      [`&.active`]: {
                        backgroundColor: '#00000',
                        color: '#b6c8d9',
                      },
                    },
                  }}
            >
                <div className='header'>
                    <img src={Logo} className='logo' alt="logo padaflix"/>
                    <h2 className='padaria-name' >{padaria.nome_fantasia}</h2>
                </div>
                
                <MenuItem 
                    component={<Link to="/" />}
                    icon = {<HomeIcon />}
                >
                    Inicio
                </MenuItem>

                <MenuItem component={<Link to="/padaria-planos" />} icon={<FeedIcon/>}> 
                    Planos
                </MenuItem>

                <MenuItem component={<Link to="/padaria-assinantes" />} icon={<GroupIcon/>}> 
                    Assinantes
                </MenuItem>
                
                {/*
                
                <MenuItem component={<Link to="/padaria-avaliacoes" />} icon={<StarBorderIcon/>}> 
                    Avaliações
                </MenuItem>

                <MenuItem component={<Link to="/padaria-horarios" />} icon={<AccessTimeIcon/>}> 
                    Horários
                </MenuItem>
                
                <MenuItem component={<Link to="/padaria-endereco" />} icon={<LocationOnIcon/>}> 
                    Endereco
                </MenuItem>

                <MenuItem component={<Link to="/padaria-perfil" />} icon={<StoreIcon/>}> 
                    Perfil
                </MenuItem>
                */}


                <MenuItem component={<Link to="/login" onClick={logout} />}  className='last-child' 
                    icon={<LogoutIcon/>}> 
                    Sair
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}
 
export default SideBarPadaria;