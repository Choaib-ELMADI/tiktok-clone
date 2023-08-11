import { MoreHorizontal, Share2 } from "lucide-react";
import { Following, Video } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { followUser } from "@/lib/actions";
import FollowBtn from "./follow-btn";

const ProfileHeader = ({
	video,
	likes,
	followingState,
	userFollowingState,
}: {
	video: Video;
	likes: number;
	followingState: Following;
	userFollowingState: Following;
}) => {
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
					<h1 className="font-extrabold text-[1.1rem] xs:text-[1.25rem]">
						{video.userLink}
					</h1>
					<h1 className="font-bold text-[1rem] xs:text-xl">{video.userName}</h1>
					<FollowBtn
						newUserLink={video.userLink}
						followUser={followUser}
						followingState={followingState}
					/>
				</div>
				<div className="ml-auto flex flex-col md:flex-row gap-4">
					<Share2 className="cursor-pointer" />
					<MoreHorizontal className="cursor-pointer" />
				</div>
			</div>
			<div className="flex gap-4">
				<p className="text-[1rem] text-light_gray dark:text-light_white">
					<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
						{userFollowingState?.following.length || 0}
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
			<p className="text-[1rem] mt-2 font-semibold">{video.userBio}</p>
		</div>
	);
};

export default ProfileHeader;
