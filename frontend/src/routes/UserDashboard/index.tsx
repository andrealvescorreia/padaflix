import { User } from "../../types/User";

interface UserDashboardProps {
	user: User
}

const UserDashboard = ({user} : UserDashboardProps) => {
	return <div>
		{ user.assinatura.length == 0 && <>sem assinaturas</>}
		{ user.assinatura.length > 0 && <>dashboard</>}
	</div>
	
}
 
export default UserDashboard;