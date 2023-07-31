import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import FollowingAccounts from "./following-accounts";
import SidebarFooter from "./sidebar-footer";
import SidebarLinks from "./sidebar-links";
import { Button } from "./ui/button";

const Sidebar = async () => {
	const user = await currentUser();

	return (
		<div className="fixed top-[60px] left-0 md:w-[240px] h-full overflow-auto show-scrollbar py-4 px-2 pr-0 pb-[80px]">
			<SidebarLinks />
			{user ? (
				<FollowingAccounts />
			) : (
				<div className="pr-1 border-t border-border my-4 pt-4 hidden md:block">
					<h1 className="text-[.9rem] dark:text-light_white mb-4">
						Sign up to follow creators, like videos, and view comments.
					</h1>
					<Link href="sign-up">
						<Button variant="outline" size="lg" className="w-full py-6">
							Sign Up
						</Button>
					</Link>
				</div>
			)}
			<SidebarFooter />
		</div>
	);
};

export default Sidebar;
