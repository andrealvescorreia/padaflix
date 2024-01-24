import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import axiosInstance from '../../axios';
import { AssinaturaUser } from '../../types/Assinatura';
import { enqueueSnackbar } from 'notistack';
import PadariaCard from '../../components/PadariaCard';
import './styles.scss';
import EmptyMessage from '../../components/EmptyMessage';
import { Link } from 'react-router-dom';

interface UserDashboardProps {
	user: User;
}

interface Padaria {
	id: number;
	nome_fantasia: string;
}

const UserDashboard = ({ user }: UserDashboardProps) => {
	const [assinaturasUser, setAssinaturasUser] = useState<AssinaturaUser[]>([]);
	const [doneFetchingAssinaturas, setDoneFetchingAssinaturas] = useState(false);
	const [padariasAssinadas, setPadariasAssinadas] = useState<Padaria[]>([]);

	const fetchAssinaturasUser = async () => {
		setDoneFetchingAssinaturas(false);
		axiosInstance
			.get('/assinaturas/usuario/' + user.id)
			.then((response) => {
				setAssinaturasUser(response.data);
			})
			.catch((err) => {
				enqueueSnackbar('Ocorreu um erro', { variant: 'error' });
				console.log(err.response.data);
			})
			.finally(() => setDoneFetchingAssinaturas(true));
	};

	function updatePadariasAssinadas() {
		let auxPadarias: Padaria[] = [];
		assinaturasUser.forEach((assinatura) => {
			const padaria: Padaria = {
				id: assinatura.id_padaria,
				nome_fantasia: assinatura.nome_padaria,
			};
			const index = auxPadarias.findIndex((obj) => obj.id === padaria.id);
			if (index === -1) auxPadarias.push(padaria); // evita repetir a mesma padaria caso assinado mais de um plano dela
		});
		setPadariasAssinadas(auxPadarias);
	}

	useEffect(() => {
		fetchAssinaturasUser();
	}, []);

	useEffect(() => {
		updatePadariasAssinadas();
	}, [assinaturasUser]);

	return (
		<div id='user-dashboard'>
			{padariasAssinadas.length == 0 && doneFetchingAssinaturas && (
				<EmptyMessage>
					<h2>Sem assinaturas</h2>
					<p>
						O que está esperando?
						<br /> Acesse o catalogo de padarias na sua região,
						<br /> escolha um plano e aproveite entregas diárias!
					</p>
					<Link to='/padarias'> Padarias </Link>
				</EmptyMessage>
			)}

			{padariasAssinadas.length > 0 && (
				<>
					<h2 className='subscriptions-title'>Assinaturas</h2>
					<div className='subscriptions-grid'>
						{padariasAssinadas.map((padaria) => {
							return (
								<PadariaCard padaria={padaria} isSubscribedToPadaria={true} />
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default UserDashboard;
