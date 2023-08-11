import { prisma } from "@/lib/db/prisma";
import { UserProps } from "./utils";

export const publishVideo = async (
	video: string,
	{ caption, hashtags }: { caption: string; hashtags: string },
	user: UserProps,
	showtimeline: boolean
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
			userBio: "Description or bio",
			userId,
			userEmailAddress,
			userProfileImageUrl,
			userLink,
			showtimeline,
		},
	});
};

export const followUser = async (userLink: string, newUserLink: string) => {
	"use server";

	const followingState = await prisma.following.findFirst({
		where: { userLink },
	});

	if (followingState) {
		if (followingState.following.includes(newUserLink)) {
			await prisma.following.updateMany({
				where: {
					userLink,
				},
				data: {
					following: [
						...followingState.following.filter((user) => user !== newUserLink),
					],
				},
			});
		} else {
			await prisma.following.updateMany({
				where: {
					userLink,
				},
				data: {
					following: [...followingState.following, newUserLink],
				},
			});
		}
	} else {
		await prisma.following.create({
			data: {
				userLink,
				following: [newUserLink],
			},
		});
	}
};
