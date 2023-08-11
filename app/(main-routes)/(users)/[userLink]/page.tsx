import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import Link from "next/link";

import CurrentUserHeader from "@/components/user-profile-header-current";
import CurrentUserBody from "@/components/user-profile-body-current";
import ProfileHeader from "@/components/user-profile-header";
import ProfileBody from "@/components/user-profile-body";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";

export default async function UserPage({
	params,
}: {
	params: { userLink: string };
}) {
	const user = await currentUser();

	const videoForCurrentUser = await prisma.video.findFirst({
		where: {
			userLink: user?.emailAddresses[0].emailAddress
				.split("@")[0]
				.replaceAll(".", ""),
		},
	});

	const video = await prisma.video.findFirst({
		where: { userLink: params.userLink.replaceAll("%40", "") },
	});
	if (!user && !video) {
		redirect("/not-found");
	}

	let likes: number = 0;
	const allUserVideos = await prisma.video.findMany({
		where: { userLink: params.userLink.replaceAll("%40", "") },
	});
	allUserVideos.forEach((video) => {
		likes += video.likes;
	});

	let currentUserLikes: number = 0;
	const allCurrentUserVideos = await prisma.video.findMany({
		where: {
			userLink: user?.emailAddresses?.[0].emailAddress
				.split("@")[0]
				.replaceAll(".", ""),
		},
	});
	allCurrentUserVideos.forEach((video) => {
		currentUserLikes += video.likes;
	});

	const likedVideosLinks = await prisma.like.findMany({
		where: {
			userLink: user?.emailAddresses[0].emailAddress
				.split("@")[0]
				.replaceAll(".", ""),
		},
	});
	const likedVideosPromiseArray = likedVideosLinks.map(
		async (likedVideoLink) => {
			return prisma.video.findUnique({
				where: {
					id: likedVideoLink.videoId,
				},
			});
		}
	);
	const likedVideos = await Promise.all(likedVideosPromiseArray);

	const savedVideosLinks = await prisma.save.findMany({
		where: {
			userLink: user?.emailAddresses[0].emailAddress
				.split("@")[0]
				.replaceAll(".", ""),
		},
	});
	const savedVideosPromiseArray = savedVideosLinks.map(
		async (savedVideoLink) => {
			return prisma.video.findUnique({
				where: {
					id: savedVideoLink.videoId,
				},
			});
		}
	);
	const savedVideos = await Promise.all(savedVideosPromiseArray);

	const updateUser = async (
		userLink: string,
		userName: string,
		userBio: string
	) => {
		"use server";

		await prisma.video.updateMany({
			where: {
				userLink,
			},
			data: { userName, userBio },
		});
	};

	return (
		<div className="p-2 xs:p-4">
			{(!video &&
				user &&
				user.emailAddresses[0].emailAddress
					.split("@")[0]
					.replaceAll(".", "") === params.userLink.replaceAll("%40", "")) ||
			(video &&
				user &&
				video.userLink ===
					user?.emailAddresses[0].emailAddress
						.split("@")[0]
						.replaceAll(".", "")) ? (
				<>
					<CurrentUserHeader
						video={videoForCurrentUser!}
						user={user}
						likes={currentUserLikes}
						updateUser={updateUser}
					/>
					<CurrentUserBody
						videos={allCurrentUserVideos}
						//@ts-ignore
						likedVideos={likedVideos}
						//@ts-ignore
						savedVideos={savedVideos}
					/>
				</>
			) : video ? (
				<>
					<ProfileHeader video={video} likes={likes} />
					<ProfileBody videos={allUserVideos} />
				</>
			) : (
				<div className="flex flex-col justify-center items-center gap-1 py-32 px-4">
					<User className="w-[80px] h-[80px] text-light_gray dark:text-light_white mb-3" />
					<h1 className="text-2xl font-bold text-black dark:text-white">
						User not found
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
			)}
		</div>
	);
}
