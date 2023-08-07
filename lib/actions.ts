import { Video } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { UserProps } from "./utils";

export const publishVideo = async (
	video: string,
	{ caption, hashtags }: { caption: string; hashtags: string },
	user: UserProps
) => {
	"use server";

	const {
		userEmailAddress,
		userFirstName,
		userLastName,
		userId,
		userProfileImageUrl,
		userLink,
	} = user;

	if (!user) {
		throw Error("Unauthorized action");
	}

	if (!video) {
		throw Error("Messing required data");
	}

	await prisma.video.create({
		data: {
			caption,
			hashtags,
			likes: 0,
			saves: 0,
			source: video,
			userName: `${userFirstName} ${userLastName}`,
			userId,
			userEmailAddress,
			userProfileImageUrl,
			userLink,
		},
	});
};

export const likeState = async (video: Video, user: any) => {
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

export const likeVideo = async (video: Video, user: any) => {
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
