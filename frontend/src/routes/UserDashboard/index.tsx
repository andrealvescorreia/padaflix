import { useEffect, useState } from "react";
import { User } from "../../types/User";
import axiosInstance from "../../axios";
import { AssinaturaUser } from "../../types/Assinatura";
import { enqueueSnackbar } from "notistack";
import PadariaCard from "../../components/PadariaCard";
import './styles.scss'

interface UserDashboardProps {
	user: User
}

interface Padaria{
	id: number,
    nome_fantasia: string,
}

const UserDashboard = ({user} : UserDashboardProps) => {
	const [assinaturasUser, setAssinaturasUser] = useState<AssinaturaUser[]>();
	const [isFetchingAssinaturas, setIsFetchingAssinaturas] = useState(false)
	const [padariasAssinadas, setPadariasAssinadas] = useState<Padaria[]>([{id: 1, nome_fantasia: 'aaaa'}])
	const fetchAssinaturasUser = async () => {
		setIsFetchingAssinaturas(true)
		axiosInstance.get('/assinaturas/usuario/'+user.id)
		.then((response) => {
			setAssinaturasUser(response.data);
		})
		.catch((err) => {
			enqueueSnackbar('Ocorreu um erro', { variant: 'error'})
			console.log(err.response.data)
		})
		.finally(()=> setIsFetchingAssinaturas(false))
	}
	
	function updatePadariasAssinadas(){
		let auxPadarias : Padaria[] = []
		assinaturasUser?.forEach(assinatura => {
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
		{ padariasAssinadas.length == 0 && !isFetchingAssinaturas && 
		<>
			sem assinatura, acesse o nosso catálogo de padarias para começar
		</>}
		
		{ padariasAssinadas.length > 0 && 
		<>
			<h2>Assinaturas</h2>
			<div className="subscriptions-grid">
				{
					padariasAssinadas.map(padaria => {
						return <PadariaCard padaria={padaria} isSubscribedToPadaria={true}/>
					})
				}	
			</div>
		</>}
	</div>
}
 
export default UserDashboard;