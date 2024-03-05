import {ReactNode} from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList";

export default async function UsersLayout({children}: { children: ReactNode }) {
	const users = await getUsers();
	
	return (
		<Sidebar>
			<div className="h-full">
				<UserList users={users}/>
				{children}
			</div>
		</Sidebar>
	);
}