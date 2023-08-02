import { prisma } from "@/lib/db/prisma";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: "http://localhost:3000";

export const uploadVideo = async (videoPath: string) => {
	"use server";

	try {
		const response = await fetch(`${serverUrl}/api/upload`, {
			method: "POST",
			body: JSON.stringify({ path: videoPath }),
		});

		return response.json();
	} catch (error) {
		throw error;
	}
};

export const publishVideo = async (
	video: string,
	{ caption, hashtags }: { caption: string; hashtags: string },
	userEmailId: string
) => {
	"use server";

	const videoDataSource = await uploadVideo(video);

	if (!videoDataSource || !userEmailId) {
		throw Error("Missing required data");
	}

	await prisma.video.create({
		data: {
			caption,
			hashtags,
			likes: 0,
			saves: 0,
			owner: userEmailId,
			source: videoDataSource?.secure_url,
		},
	});
};
