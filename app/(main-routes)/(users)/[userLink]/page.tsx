import ProfileHeader from "@/components/profile-header";
import ProfileBody from "@/components/profile-body";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export default async function UserPage({
	params,
}: {
	params: { userLink: string };
}) {
	const user = await currentUser();

	const video = await prisma.video.findFirst({
		where: { userLink: params.userLink.replaceAll("%40", "") },
	});
	if (!video && !user) {
		redirect("/not-found");
	}

	let likes: number = 0;
	const allUserVideos = await prisma.video.findMany({
		where: { userLink: params.userLink.replaceAll("%40", "") },
	});
	allUserVideos.forEach((video) => {
		likes += video.likes;
	});

	return (
		<div className="p-2 xs:p-4">
			{!video ? (
				<div>Admin current user header</div>
			) : (
				<ProfileHeader video={video} likes={likes} />
			)}
			<ProfileBody videos={allUserVideos} />
		</div>
	);
}
