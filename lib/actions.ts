import { prisma } from "@/lib/db/prisma";
import { UserProps } from "./utils";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: "http://localhost:3000";

const uploadVideo = async (videoPath: string) => {
	try {
		console.log("___START__");

		const response = await fetch(`http://localhost:3000/api/upload`, {
			method: "POST",
			body: JSON.stringify({ path: videoPath }),
		});

		console.log(response);
		console.log("___END__");
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const publishVideo = async (
	video: string,
	{ caption, hashtags }: { caption: string; hashtags: string },
	user: UserProps
) => {
	"use server";

	const videoDataSource = await uploadVideo(video);

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

	if (!videoDataSource) {
		throw Error("Messing required data");
	}

	await prisma.video.create({
		data: {
			caption,
			hashtags,
			likes: 0,
			saves: 0,
			source: videoDataSource?.secure_url,
			userName: `${userFirstName} ${userLastName}`,
			userId,
			userEmailAddress,
			userProfileImageUrl,
			userLink,
		},
	});
};
