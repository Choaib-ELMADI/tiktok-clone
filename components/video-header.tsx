import { currentUser } from "@clerk/nextjs";
import { Video } from "@prisma/client";
import { Music } from "lucide-react";
import Link from "next/link";
import moment from "moment";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const VideoHeader = async ({ video }: { video: Video }) => {
	const user = await currentUser();

	return (
		<div className="bg-light_white dark:bg-light_gray rounded-lg p-2 mx-6">
			<div className="flex gap-2 items-center">
				<Link href={`/@${video.userLink}`}>
					<Avatar className="w-12 h-12 bg-light_gray text-light_white dark:bg-light_white dark:text-light_gray">
						<AvatarImage src={video.userProfileImageUrl} />
						<AvatarFallback>
							{video.userName.split(" ")[0].charAt(0).toUpperCase()}
							{video.userName.split(" ")[1].charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Link>
				<div>
					<Link
						href={`/@${video.userLink}`}
						className="text-[1.1rem] font-bold hover:underline"
					>
						{video.userLink}
					</Link>
					<p className="text-[.8rem] flex items-center gap-1">
						<span>{video.userName}</span>
						<span className="w-1 h-1 rounded-full bg-black dark:bg-white"></span>
						<span>
							{Date.now() - new Date(video.createdAt).getTime() <
							1000 * 60 * 60 * 24 * 3
								? moment(video.createdAt).fromNow()
								: `${new Date(video.createdAt).getMonth() + 1}-${new Date(
										video.createdAt
								  ).getDay()}`}
						</span>
					</p>
				</div>
				{user?.emailAddresses[0].emailAddress
					.split("@")[0]
					.replaceAll(".", "") !== video.userLink && (
					<Button variant="outline" size="lg" className="ml-auto">
						Follow
					</Button>
				)}
			</div>
			<p className="text-[1rem] my-[3px]">
				{video.caption}{" "}
				{video.hashtags
					.split("#")
					.filter((i) => i !== "")
					.map((hash, i) => (
						<Link
							href={`/tags/${hash}`}
							key={`hash-${i}`}
							className="text-blue-500 dark:text-brand_2 hover:underline ml-[4px] font-semibold"
						>
							#{hash}
						</Link>
					))}
			</p>
			<div className="flex items-center text-[.95rem] gap-[4px]">
				<Music className="w-4 h-4" />
				<span>original sound - {video.userName}</span>
			</div>
		</div>
	);
};

export default VideoHeader;