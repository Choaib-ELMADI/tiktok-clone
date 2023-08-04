import Video from "@/components/video-component";
import { prisma } from "@/lib/db/prisma";

export default async function Home() {
	const videos = await prisma.video.findMany({
		orderBy: { id: "desc" },
	});

	return (
		<div className="flex flex-col items-center gap-8 p-4 pb-0">
			{videos.length === 0 && <div>Skeleton</div>}
			{videos.map((video) => (
				<Video key={video.id} video={video} />
			))}
		</div>
	);
}
