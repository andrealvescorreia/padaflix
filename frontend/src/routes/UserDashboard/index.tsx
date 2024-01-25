import { useEffect, useState } from "react";
import { User } from "../../types/User";
import axiosInstance from "../../axios";
import { AssinaturaUser } from "../../types/Assinatura";
import { enqueueSnackbar } from "notistack";
import PadariaCard from "../../components/PadariaCard";
import { LinearProgress } from "@mui/material";
import './styles.scss'

interface UserDashboardProps {
	user: User
}

interface Padaria{
	id: number,
  nome_fantasia: string,
}

const UserDashboard = ({user} : UserDashboardProps) => {
	const [assinaturasUser, setAssinaturasUser] = useState<AssinaturaUser[]>([]);
	const [doneFetchingAssinaturas, setDoneFetchingAssinaturas] = useState(false)
	const [padariasAssinadas, setPadariasAssinadas] = useState<Padaria[]>([])

	const fetchAssinaturasUser = async () => {
		setDoneFetchingAssinaturas(false)
		axiosInstance.get('/assinaturas/usuario/'+user.id)
		.then((response) => {
			setAssinaturasUser(response.data);
		})
		.catch((err) => {
			enqueueSnackbar('Ocorreu um erro', { variant: 'error'})
			console.log(err.response.data)
		})
		.finally(()=> setDoneFetchingAssinaturas(true))
	}
	
	function updatePadariasAssinadas(){
		let auxPadarias : Padaria[] = []
		assinaturasUser.forEach(assinatura => {
			const padaria:Padaria = {id: assinatura.id_padaria, nome_fantasia: assinatura.nome_padaria}
			const index = auxPadarias.findIndex(obj => obj.id === padaria.id);
			if (index === -1) auxPadarias.push(padaria)// evita repetir a mesma padaria caso assinado mais de um plano dela
		})
		setPadariasAssinadas(auxPadarias)
	}

	useEffect(() => {
		fetchAssinaturasUser()
	}, [])

	useEffect(() => {
		updatePadariasAssinadas()
	}, [assinaturasUser])

	return <div id="user-dashboard">
		{ 
      !doneFetchingAssinaturas &&
      <LinearProgress className="circular-progress" /> 
    }
		{ padariasAssinadas.length == 0 && doneFetchingAssinaturas && 
		<h4 style={{margin: '2rem', marginRight: 'auto'}}>
			Pareçe que você ainda não é assinante. Acesse o nosso catálogo de padarias para começar.
		</h4>}
		
		{ padariasAssinadas.length > 0 && 
		<>
			<h2>Assinaturas</h2>
			<div className="subscriptions-grid">
				{
					padariasAssinadas.map(padaria => {
						return <PadariaCard padaria={padaria} isSubscribedToPadaria={true} key={padaria.id}/>
					})
				}	
			</div>
		</>}
	</div>
}
 
export default UserDashboard;