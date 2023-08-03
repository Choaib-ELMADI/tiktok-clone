import Video from "@/components/video-component";
import { prisma } from "@/lib/db/prisma";

export default async function Home() {
	const videos = await prisma.video.findMany({
		orderBy: { id: "desc" },
	});

	return (
		<div className="flex flex-col items-center gap-8 pt-4">
			{videos.map((video) => (
				<Video key={video.id} video={video} />
			))}
		</div>
	);
}
