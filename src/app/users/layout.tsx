import {ReactNode} from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function UsersLayout({children}: { children: ReactNode }) {
	return (
		<Sidebar>
			<div className="h-full">
				{children}
			</div>
		</Sidebar>
	);
}