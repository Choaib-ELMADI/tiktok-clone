import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import FollowingAccounts from "./following-accounts";
import SidebarFooter from "./sidebar-footer";
import SidebarLinks from "./sidebar-links";
import { Button } from "./ui/button";

const Sidebar = async () => {
	const user = await currentUser();

	return (
		<div className="fixed bottom-0 z-50 top-[calc(100% - 100px)] flex justify-between flex-row xs:flex-col xs:justify-start xs:top-[60px] left-0 w-full xs:w-max md:w-[240px] h-max xs:h-full overflow-auto show-scrollbar p-0 xs:py-4 xs:px-2 xs:pr-0 xs:pb-[80px] bg-light_white dark:bg-dark_gray xs:bg-transparent xs:dark:bg-transparent">
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
