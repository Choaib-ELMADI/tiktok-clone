import { MoreHorizontal, Share2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const CurrentUserHeader = ({ user, likes }: { user: any; likes: number }) => {
	return (
		<div className="py-4">
			<div className="flex gap-4 max-w-[600px] overflow-hidden mb-4">
				<Avatar className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] bg-light_gray text-light_white">
					<AvatarImage src={user?.profileImageUrl} />
					<AvatarFallback>
						{user?.firstName.charAt(0).toUpperCase()}
						{user?.lastName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col justify-between">
					<h1 className="font-extrabold text-[1.1rem] xs:text-[1.25rem]">
						{user?.emailAddresses[0].emailAddress
							.split("@")[0]
							.replaceAll(".", "")}
					</h1>
					<h1 className="font-bold text-[1rem] xs:text-xl">
						{user?.firstName} {user?.lastName}
					</h1>
					<Button
						variant="secondary"
						size="lg"
						className="text-[.85rem] uppercase border-2 border-light_gray bg-light_gray hover:bg-transparent text-white hover:text-black dark:hover:text-light_white"
					>
						Edit profile
					</Button>
				</div>
				<div className="ml-auto flex flex-col md:flex-row gap-4">
					<Share2 className="cursor-pointer" />
					<MoreHorizontal className="cursor-pointer" />
				</div>
			</div>
			<div className="flex gap-4">
				<p className="text-[1rem] text-light_gray dark:text-light_white">
					<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
						0
					</span>{" "}
					Following
				</p>
				<p className="text-[1rem] text-light_gray dark:text-light_white">
					<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
						0
					</span>{" "}
					Followers
				</p>
				<p className="text-[1rem] text-light_gray dark:text-light_white">
					<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
						{likes}
					</span>{" "}
					{likes > 1 ? "Likes" : "Like"}
				</p>
			</div>
			<p className="">description or bio</p>
		</div>
	);
};

export default CurrentUserHeader;
