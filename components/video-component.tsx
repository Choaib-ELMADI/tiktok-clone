import { currentUser } from "@clerk/nextjs";
import { Video } from "@prisma/client";
import { Music } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import Comment from "./video-comment";
import LikeVideo from "./video-like";
import Share from "./video-share";
import Save from "./video-save";

interface VideoProps {
	video: Video;
}

const Video = async ({ video }: VideoProps) => {
	const user = await currentUser();

	const likeState = async () => {
		"use server";

		if (!user) return null;

		return await prisma.like.findUnique({
			where: {
				userLink: user?.emailAddresses[0].emailAddress
					.split("@")[0]
					.replaceAll(".", ""),
				videoId: video.id,
			},
		});
	};

	const likeVideo = async () => {
		"use server";

		if (!user) return null;

		const userLikeState = await prisma.like.findUnique({
			where: {
				userLink: user?.emailAddresses?.[0].emailAddress
					.split("@")[0]
					.replaceAll(".", ""),
				videoId: video.id,
			},
		});

		if (userLikeState) {
			await prisma.like.delete({
				where: {
					userLink: user?.emailAddresses?.[0].emailAddress
						.split("@")[0]
						.replaceAll(".", ""),
					videoId: video.id,
				},
			});
			await prisma.video.update({
				where: {
					id: video.id,
				},
				data: { likes: video.likes <= 1 ? 0 : video.likes - 1 },
			});
		} else {
			await prisma.like.create({
				data: {
					userLink: user?.emailAddresses?.[0].emailAddress
						.split("@")[0]
						.replaceAll(".", ""),
					videoId: video.id,
				},
			});
			await prisma.video.update({
				where: {
					id: video.id,
				},
				data: { likes: video.likes + 1 },
			});
		}
	};

	return (
		<div className="pb-4 border-b border-border max-w-[700px] w-full">
			<div className="flex gap-2">
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
						className="hover:underline font-semibold text-[1rem] tracking-wider truncate w-[140px] xxs:w-max"
					>
						{video.userLink}
					</Link>
					<h3 className="text-[.8rem] w-max rounded-full py-[2px] px-[6px] bg-light_white text-light_gray dark:text-light_white dark:bg-light_gray">
						{video.userName}
					</h3>
				</div>
				{user?.emailAddresses[0].emailAddress
					.split("@")[0]
					.replaceAll(".", "") !== video.userLink && (
					<Button variant="outline" size="lg" className="ml-auto">
						Follow
					</Button>
				)}
			</div>
			<div className="mt-2 xs:mt-0 xd:ml-[60px] mb-2">
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
				<div className="flex items-center text-sm gap-[4px]">
					<Music className="w-[14px] h-[14px]" />
					<span>original sound - </span>
					<span className="text-[.8rem]">{video.userName}</span>
				</div>
			</div>
			<div className="flex items-end gap-4 relative">
				<Link href={`/@${video.userLink}/video/${video.id}`} className="w-max">
					<video
						controls
						disablePictureInPicture
						loop
						controlsList="nodownload noplaybackrate"
						className="w-screen xm:w-[340px] xd:ml-[60px] h-[540px] object-cover rounded-md hide-all-controls hide-controls bg-light_white dark:bg-light_gray"
					>
						<source src={video.source} />
					</video>
				</Link>
				<div className="absolute bottom-12 right-1 py-1 px-2 rounded-full backdrop-blur-xl xm:p-0 xm:static xm:rounded-none xm:backdrop-blur-0 xm:bg-transparent flex flex-col gap-[3px]">
					<LikeVideo
						video={video}
						likeVideo={likeVideo}
						likeState={likeState}
						user={user}
						className="flex-col"
					/>
					<Comment className="flex-col" />
					<Save className="flex-col" />
					<Share className="flex-col" />
				</div>
			</div>
		</div>
	);
};

export default Video;
