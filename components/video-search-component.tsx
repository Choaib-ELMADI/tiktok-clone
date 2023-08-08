import { Video } from "@prisma/client";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VideoSearch = ({ video }: { video: Video }) => {
	return (
		<div>
			<Link href={`/@${video.userLink}/video/${video.id}`} className="relative">
				<video className="hide-controls hide-all-controls w-full aspect-[1/1.2] object-cover rounded-md">
					<source src={video.source} />
				</video>
				<p className="absolute left-2 bottom-2 text-white text-[1rem] font-semibold">
					{new Date(video.createdAt).getMonth() + 1}
					{" - "}
					{new Date(video.createdAt).getDate()}
				</p>
			</Link>
			<p className="text-[1rem] font-semibold py-1 tracking-wide whitespace-nowrap truncate">
				{video.caption}
			</p>
			<Link
				href={`/@${video.userLink}`}
				className="group flex items-center gap-2"
			>
				<Avatar className="w-7 h-7">
					<AvatarImage src={video.userProfileImageUrl} />
					<AvatarFallback>
						{video.userName.split(" ")[0].charAt(0).toUpperCase()}
						{video.userName.split(" ")[1].charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<p className="group-hover:underline text-[1rem] font-semibold whitespace-nowrap truncate">
					{video.userLink}
				</p>
			</Link>
		</div>
	);
};

export default VideoSearch;
