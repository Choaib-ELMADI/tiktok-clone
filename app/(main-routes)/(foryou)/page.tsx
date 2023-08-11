import Video from "@/components/video-component";
import { prisma } from "@/lib/db/prisma";

export default async function Home() {
	const videos = await prisma.video.findMany({
		orderBy: { id: "desc" },
	});

	return (
		<div className="flex flex-col items-center gap-8 p-4 pb-0">
			{videos.length === 0 && (
				<div className="w-full max-w-[700px]">
					<div className="flex gap-2">
						<div className="bg-light_white dark:bg-light_gray w-[52px] h-[52px] rounded-full" />
						<div className="flex flex-col gap-2">
							<div className="w-[140px] bg-light_white dark:bg-light_gray h-5 rounded-lg" />
							<div className="w-[200px] bg-light_white dark:bg-light_gray h-5 rounded-lg" />
						</div>
					</div>
				</div>
			)}
			{videos.map((video) => (
				<Video key={video.id} video={video} />
			))}
		</div>
	);
}
