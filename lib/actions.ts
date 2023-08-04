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
