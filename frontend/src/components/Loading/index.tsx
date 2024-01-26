import { Box, CircularProgress  } from "@mui/material";
import logo from '../../assets/logo.png'
import './styles.scss'

const Loading = () => {
  return (
    <div id="loading-screen">
      <img src={logo} className='logo' alt="logo padaflix" />
      <CircularProgress className='circular-progress' size={'4rem'}/>
    </div>
  );
}
 
export default Loading;