import { currentUser } from "@clerk/nextjs";
import { Play } from "lucide-react";
import Link from "next/link";

import VideoHeader from "@/components/video-header";
import Comment from "@/components/video-comment";
import { Button } from "@/components/ui/button";
import LikeVideo from "@/components/video-like";
import Share from "@/components/video-share";
import GoBack from "@/components/back-link";
import Save from "@/components/video-save";
import { prisma } from "@/lib/db/prisma";

const VideoPage = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();

	const video = await prisma.video.findUnique({
		where: { id: params.id },
	});
	if (!video) {
		return (
			<div className="flex flex-col justify-center items-center gap-1 py-32 px-4">
				<Play className="w-[80px] h-[80px] text-light_gray dark:text-light_white mb-3" />
				<h1 className="text-2xl font-bold text-black dark:text-white">
					Video not found
				</h1>
				<p className="text-lg font-semibold text-light_gray dark:text-light_white">
					Please check the splilling and try again
				</p>
				<Button
					variant="outline"
					size="lg"
					className="mt-3 px-12 text-[1.1rem]"
				>
					<Link href="/">Home</Link>
				</Button>
			</div>
		);
	}

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
		<div className="fixed top-0 left-0 w-full h-screen bg-white dark:bg-black z-50 overflow-auto">
			<div className="grid grid-cols-1 lg:grid-cols-[auto_500px]">
				<div className="flex justify-center bg-light_white dark:bg-light_gray">
					<GoBack className="fixed top-4 left-4" />
					<video className="h-[540px] lg:h-screen hide-controls" controls loop>
						<source src={video.source} />
					</video>
				</div>
				<div className="h-max lg:h-screen lg:overflow-auto p-6">
					<VideoHeader video={video} />
					<div className="flex items-center gap-4 my-2">
						<LikeVideo
							video={video}
							likeVideo={likeVideo}
							likeState={likeState}
							user={user}
							className="flex-row scale-[.8]"
							text="text-[1.1rem]"
						/>
						<Comment className="flex-row scale-[.8]" text="text-[1.1rem]" />
						<Save className="flex-row scale-[.8]" text="text-[1.1rem]" />
						<Share
							className="flex-row-reverse scale-[.8] ml-auto"
							text="text-[1.1rem]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoPage;
