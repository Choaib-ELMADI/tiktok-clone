import { Heart, MessageCircle, Music, Save, Send } from "lucide-react";
import { Video } from "@prisma/client";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface VideoProps {
	video: Video;
}

const Video = ({ video }: VideoProps) => {
	return (
		<div className="pb-4 border-b border-border max-w-[700px] w-full">
			<div className="flex gap-2 mb-3">
				<Link href={`@${video.userLink}`}>
					<Avatar className="bg-text text-background w-[52px] h-[52px]">
						<AvatarImage src={video.userProfileImageUrl} />
						<AvatarFallback>
							{video.userName.split(" ")[0].charAt(0).toUpperCase()}
							{video.userName.split(" ")[1].charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Link>
				<div className="flex flex-col">
					<Link
						href={`@${video.userLink}`}
						className="hover:underline font-semibold"
					>
						{video.userLink}
					</Link>
					<h3 className="text-sm w-max rounded-full py-[2px] px-[6px] bg-light_white text-light_gray dark:text-light_white dark:bg-light_gray">
						{video.userName}
					</h3>
					<p className="text-sm my-[3px]">
						{video.caption}{" "}
						{video.hashtags
							.split("#")
							.filter((i) => i !== "")
							.map((hash, i) => (
								<Link
									href="/"
									key={`hash-${i}`}
									className="text-blue-500 dark:text-brand_2 hover:underline ml-[4px] font-semibold"
								>
									#{hash}
								</Link>
							))}
					</p>
					<div className="flex items-center text-sm gap-[4px]">
						<Music className="w-4 h-4" />
						<span>Original sound - </span>
						<span>{video.userLink}</span>
					</div>
				</div>
				<Button variant="outline" size="lg" className="ml-auto">
					Follow
				</Button>
			</div>
			<div className="flex items-end gap-4">
				<video
					controls
					disablePictureInPicture
					controlsList="nodownload noplaybackrate"
					className="h-[460px] xs:h-[540px] ml-[60px] rounded-md hide-controls"
				>
					<source src={video.source} />
				</video>
				<div className="flex flex-col gap-[3px]">
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[46px] h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<Heart className="h-6 w-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[46px] h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<MessageCircle className="h-6 w-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[46px] h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<Save className="h-6 w-6 dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[46px] h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<Send className="h-6 w-6 dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Video;