import VideoSearch from "@/components/video-search-component";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function TagPage({ params }: { params: { tag: string } }) {
	const tagResult = await prisma.video.findMany({
		where: {
			OR: [
				{ caption: { contains: params.tag, mode: "insensitive" } },
				{ hashtags: { contains: params.tag, mode: "insensitive" } },
			],
		},
	});

	if (tagResult.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center px-4 py-32">
				<h1 className="text-[1.5rem] font-semibold">No result for</h1>
				<h1 className="text-[1.2rem] font-semibold text-brand_1 tracking-wider">
					#{params.tag}
				</h1>
				<Link href="/" className="mt-6">
					<Button variant="outline" size="lg">
						Home
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-[900px] mx-auto mt-4 px-4">
			<h1 className="mb-2 font-semibold text-[1.1rem]">
				Tag Page:{" "}
				<span className="text-brand_1 tracking-wider">#{params.tag}</span>
			</h1>
			<div className="grid grid-cols-1 xm:grid-cols-2 lg:grid-cols-3 gap-4">
				{tagResult.map((item) => (
					<VideoSearch video={item} key={item.id} />
				))}
			</div>
		</div>
	);
}
