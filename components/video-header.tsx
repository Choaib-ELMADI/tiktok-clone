import { Video } from "@prisma/client";
import { Music } from "lucide-react";
import Link from "next/link";
import moment from "moment";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const VideoHeader = ({ video }: { video: Video }) => {
	return (
		<div className="bg-light_white dark:bg-light_gray rounded-lg p-2">
			<div className="flex gap-4 items-center">
				<Link href={`/@${video.userLink}`}>
					<Avatar className="w-12 h-12">
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
						className="text-lg font-bold hover:underline"
					>
						{video.userLink}
					</Link>
					<p className="text-[.9rem] flex items-center gap-1">
						<span>{video.userName}</span>
						<span className="w-1 h-1 rounded-full bg-black dark:bg-white"></span>
						<span>{moment(video.createdAt).fromNow()}</span>
					</p>
				</div>
				<Button variant="destructive" size="lg" className="ml-auto uppercase">
					Follow
				</Button>
			</div>
			<p className="my-1 text-[1rem]">description or bio</p>
			<div className="flex items-center text-[.95rem] gap-[4px]">
				<Music className="w-4 h-4" />
				<span>original sound - {video.userName}</span>
			</div>
		</div>
	);
};

export default VideoHeader;
