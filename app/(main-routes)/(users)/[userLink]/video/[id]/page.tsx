import { Play } from "lucide-react";
import Link from "next/link";

import VideoHeader from "@/components/video-header";
import { Button } from "@/components/ui/button";
import GoBack from "@/components/back-link";
import { prisma } from "@/lib/db/prisma";

const VideoPage = async ({ params }: { params: { id: string } }) => {
	const video = await prisma.video.findUnique({
		where: { id: params.id },
	});
	if (!video) {
		return (
			<div className="flex flex-col justify-center items-center gap-1 py-32 px-4">
				<Play className="w-[80px] h-[80px] text-light_gray dark:text-light_white mb-3" />
				<h1 className="text-2xl font-bold text-black dark:text-white">
					Video not found
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
		);
	}

	return (
		<div className="fixed top-0 left-0 w-full h-screen bg-white dark:bg-black z-50 overflow-auto">
			<div className="grid grid-cols-1 lg:grid-cols-[auto_500px]">
				<div className="flex justify-center bg-light_white dark:bg-light_gray">
					<GoBack className="fixed top-4 left-4" />
					<video className="h-[540px] lg:h-screen hide-controls" controls loop>
						<source src={video.source} />
					</video>
				</div>
				<div className="h-max lg:h-screen lg:overflow-auto p-6">
					<VideoHeader video={video} />
					<div className="h-[2000px]"></div>
				</div>
			</div>
		</div>
	);
};

export default VideoPage;
