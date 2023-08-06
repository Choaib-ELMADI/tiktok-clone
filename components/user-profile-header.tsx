import { MoreHorizontal, Share2 } from "lucide-react";
import { Video } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProfileHeader = ({ video, likes }: { video: Video; likes: number }) => {
	return (
		<div className="py-4">
			<div className="flex gap-4 max-w-[600px] overflow-hidden mb-4">
				<Avatar className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] bg-light_gray text-light_white">
					<AvatarImage src={video.userProfileImageUrl} />
					<AvatarFallback>
						{video.userName.split(" ")[0].charAt(0).toUpperCase()}
						{video.userName.split(" ")[1].charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col justify-between">
					<h1 className="font-extrabold text-xl xs:text-2xl">
						{video.userLink}
					</h1>
					<h1 className="font-bold text-lg xs:text-xl">{video.userName}</h1>
					<Button
						variant="destructive"
						size="lg"
						className="text-[.8rem] xs:text-[.9rem] uppercase"
					>
						Follow
					</Button>
				</div>
				<div className="ml-auto flex flex-col md:flex-row gap-4">
					<Share2 className="cursor-pointer" />
					<MoreHorizontal className="cursor-pointer" />
				</div>
			</div>
			<div className="flex gap-4">
				<p className="text-[1.1rem] text-light_gray dark:text-light_white">
					<span className="text-xl font-extrabold text-black dark:text-white">
						0
					</span>{" "}
					Following
				</p>
				<p className="text-[1.1rem] text-light_gray dark:text-light_white">
					<span className="text-xl font-extrabold text-black dark:text-white">
						0
					</span>{" "}
					Followers
				</p>
				<p className="text-[1.1rem] text-light_gray dark:text-light_white">
					<span className="text-xl font-extrabold text-black dark:text-white">
						{likes}
					</span>{" "}
					{likes > 1 ? "Likes" : "Like"}
				</p>
			</div>
			<p className="mb-4">description or bio</p>
		</div>
	);
};

export default ProfileHeader;
