import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const followingAccounts = [
	{ name: "choaibelmadi" },
	{ name: "elmadichoaib" },
	{ name: "choaib_elmadi" },
	{ name: "git_code" },
	{ name: "dot_algo" },
];

const FollowingAccounts = async () => {
	const user = await currentUser();

	return (
		<div className="flex flex-col items-center md:items-start mt-4 pt-4 border-t border-border">
			<h1 className="text-[.85rem] dark:text-light_white mb-4 hidden md:block">
				Following accounts
			</h1>
			{followingAccounts.map((account) => (
				<Link
					href="/"
					key={account.name}
					className="flex items-center gap-2 p-2 w-max md:w-full md:px-2 md:py-1 hover:bg-light_white dark:hover:bg-dark_gray rounded-[4px] transition"
				>
					<Avatar className="w-[35px] h-[35px]">
						<AvatarImage src={user?.profileImageUrl} />
						<AvatarFallback className="bg-dark_gray text-white">
							{user?.firstName?.charAt(0).toUpperCase()}
							{user?.lastName?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="hidden md:flex flex-col">
						<h1 className="text-sm">{account.name}</h1>
						<h1 className="text-[.8rem] dark:text-light_white opacity-80">
							{account.name}
						</h1>
					</div>
				</Link>
			))}
		</div>
	);
};

export default FollowingAccounts;
