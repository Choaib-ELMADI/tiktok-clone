import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/db/prisma";

const FollowingAccounts = async () => {
	const followingAccounts = await prisma.video.findMany();
	if (followingAccounts.length === 0) return null;

	function removeDuplicatesByProperty(array: any[], property: string) {
		const uniqueValues = new Set();
		const newArray = [];

		for (const item of array) {
			if (!uniqueValues.has(item[property])) {
				uniqueValues.add(item[property]);
				newArray.push(item);
			}
		}

		return newArray;
	}

	return (
		<div className="hidden xs:flex flex-col items-center md:items-start mt-4 pt-4 border-t border-border">
			<h1 className="text-[.85rem] dark:text-light_white mb-4 hidden md:block">
				Others accounts
			</h1>
			{removeDuplicatesByProperty(followingAccounts, "userLink").map(
				(account) => (
					<Link
						href={account.userLink}
						key={account.userLink}
						className="flex items-center gap-2 p-2 w-max md:w-full md:px-2 md:py-1 hover:bg-light_white dark:hover:bg-dark_gray rounded-[4px] transition"
					>
						<Avatar className="w-[35px] h-[35px]">
							<AvatarImage src={account.userProfileImageUrl} />
							<AvatarFallback className="bg-dark_gray text-white">
								{account.userName.split(" ")[0].charAt(0).toUpperCase()}
								{account.userName.split(" ")[1].charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="hidden md:flex flex-col">
							<h1 className="w-[175px] text-sm overflow-hidden truncate">
								{account.userName}
							</h1>
							<h1 className="w-[175px] text-[.8rem] dark:text-light_white opacity-80 overflow-hidden truncate">
								@{account.userLink}
							</h1>
						</div>
					</Link>
				)
			)}
		</div>
	);
};

export default FollowingAccounts;
