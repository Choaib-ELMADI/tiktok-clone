import { currentUser } from "@clerk/nextjs";
import { Video } from "@prisma/client";
import { Music } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/db/prisma";
import Comment from "./video-comment";
import LikeVideo from "./video-like";
import FollowBtn from "./follow-btn";
import Share from "./video-share";
import { cn } from "@/lib/utils";
import Save from "./video-save";
import { followUser } from "@/lib/actions";

interface VideoProps {
	video: Video;
}

const Video = async ({ video }: VideoProps) => {
	const user = await currentUser();

	const likeState = async () => {
		"use server";

		if (!user) return null;

		return await prisma.like.findFirst({
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

		const userLikeState = await prisma.like.findFirst({
			where: {
				userLink: user?.emailAddresses?.[0].emailAddress
					.split("@")[0]
					.replaceAll(".", ""),
				videoId: video.id,
			},
		});

		if (userLikeState) {
			await prisma.like.deleteMany({
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

	const comments = await prisma.comment.findMany({
		where: { videoId: video.id },
	});

	const saveState = async () => {
		"use server";

		if (!user) return null;

		return await prisma.save.findFirst({
			where: {
				userLink: user?.emailAddresses[0].emailAddress
					.split("@")[0]
					.replaceAll(".", ""),
				videoId: video.id,
			},
		});
	};

	const saveVideo = async () => {
		"use server";

		if (!user) return null;

		const userSaveState = await prisma.save.findFirst({
			where: {
				userLink: user?.emailAddresses?.[0].emailAddress
					.split("@")[0]
					.replaceAll(".", ""),
				videoId: video.id,
			},
		});

		if (userSaveState) {
			await prisma.save.deleteMany({
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
				data: { saves: video.saves <= 1 ? 0 : video.saves - 1 },
			});
		} else {
			await prisma.save.create({
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
				data: { saves: video.saves + 1 },
			});
		}
	};

	const followingState = await prisma.following.findFirst({
		where: {
			userLink: user?.emailAddresses[0].emailAddress
				.split("@")[0]
				.replaceAll(".", ""),
		},
	});

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
				<div className="flex flex-col w-full truncate">
					<Link
						href={`@${video.userLink}`}
						className="hover:underline font-semibold text-[1rem] tracking-wider w-full truncate whitespace-nowrap"
					>
						{video.userLink}
					</Link>
					<h3 className="text-[.8rem] rounded-full py-[2px] px-[6px] bg-light_white text-light_gray dark:text-light_white dark:bg-light_gray w-full truncate whitespace-nowrap max-w-max">
						{video.userName}
					</h3>
				</div>
				{user?.emailAddresses[0].emailAddress
					.split("@")[0]
					.replaceAll(".", "") !== video.userLink && (
					<FollowBtn
						className="ml-auto"
						newUserLink={video.userLink}
						followUser={followUser}
						followingState={followingState!}
					/>
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
						className={cn(
							"w-screen xm:w-[340px] xd:ml-[60px] h-[540px] object-cover rounded-md hide-controls bg-light_white dark:bg-light_gray",
							video.showtimeline ? "" : "hide-all-controls"
						)}
					>
						<source src={video.source} />
					</video>
				</Link>
				<div
					className={cn(
						"absolute right-1 p-1 xm:p-0 xm:static flex flex-col gap-[3px]",
						video.showtimeline ? "bottom-16" : "bottom-12"
					)}
				>
					<LikeVideo
						video={video}
						likeVideo={likeVideo}
						likeState={likeState}
						user={user}
						className="flex-col"
					/>
					<Comment video={video} className="flex-col" comments={comments} />
					<Save
						video={video}
						className="flex-col"
						saveState={saveState}
						saveVideo={saveVideo}
						user={user}
					/>
					<Share className="flex-col" />
				</div>
			</div>
		</div>
	);
};

export default Video;
