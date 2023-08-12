"use client";

import { Lock, TriangleIcon, User } from "lucide-react";
import { Video } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
const filterButtons = [
	{ label: "Videos" },
	{ label: "Liked" },
	{ label: "Favorites" },
];

const CurrentUserBody = ({
	videos,
	likedVideos,
	savedVideos,
}: {
	videos: Video[];
	likedVideos: Video[];
	savedVideos: Video[];
}) => {
	const [selectedBtn, setSelectedBtn] = useState("Videos");

	return (
		<div>
			<div className="border-b border-border mb-4 grid grid-cols-3 md:flex">
				{filterButtons.map((btn) => (
					<button
						key={btn.label}
						className={cn(
							"font-bold text-light_gray dark:text-light_white outline-none border-b-[3px] border-transparent md:px-8 pb-1 text-[1rem] hover:text-black dark:hover:text-white transition",
							btn.label === selectedBtn
								? "text-black dark:text-white border-black dark:border-white"
								: "",
							"flex items-center justify-center gap-2"
						)}
						onClick={() => setSelectedBtn(btn.label)}
					>
						{btn.label !== "Videos" && <Lock className="h-5 w-5" />}
						{btn.label}
					</button>
				))}
			</div>

			<>
				{selectedBtn === "Videos" ? (
					videos.length > 0 ? (
						<div className="grid xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{videos.map((video) => (
								<div key={video.id}>
									<Link
										href={`/@${video.userLink}/video/${video.id}`}
										className="relative"
									>
										<video className="w-full aspect-[1/1.25] bg-light_white dark:bg-light_gray rounded-sm object-cover">
											<source src={video.source} />
										</video>
										<TriangleIcon className="w-4 h-4 absolute left-3 bottom-3 text-white rotate-90" />
									</Link>
									<p className="truncate mt-1">
										{video.hashtags
											.split("#")
											.filter((i) => i !== "")
											.map((hash: string) => (
												<Link
													key={hash}
													href={`/tags/${hash}`}
													className="text-blue-500 dark:text-brand_2 hover:underline"
												>
													#{hash}
												</Link>
											))}{" "}
										{video.caption}
									</p>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col justify-center items-center gap-1 px-4 py-32">
							<User className="w-[80px] h-[80px] text-light_gray dark:text-light_white mb-3" />
							<h1 className="font-bold text-xl text-dark dark:text-white">
								Upload your first video
							</h1>
							<p className="text-[1rem] text-light_gray dark:text-light_white font-semibold">
								Upload your first video
							</p>
						</div>
					)
				) : selectedBtn === "Liked" ? (
					likedVideos.length === 0 ? (
						<div className="flex flex-col justify-center items-center gap-1 px-4 py-32">
							<Lock className="w-[80px] h-[80px] text-light_gray dark:text-light_white mb-3" />
							<h1 className="font-bold text-xl text-dark dark:text-white">
								You&apos;re liked videos will be shown here
							</h1>
						</div>
					) : (
						<div className="grid xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{likedVideos.map((video) => (
								<div key={video.id}>
									<Link
										href={`/@${video.userLink}/video/${video.id}`}
										className="relative"
									>
										<video className="w-full aspect-[1/1.25] bg-light_white dark:bg-light_gray rounded-sm object-cover">
											<source src={video.source} />
										</video>
										<TriangleIcon className="w-4 h-4 absolute left-3 bottom-3 text-white rotate-90" />
									</Link>
									<p className="truncate mt-1">
										{video.hashtags
											.split("#")
											.filter((i) => i !== "")
											.map((hash: string) => (
												<Link
													key={hash}
													href={`/tags/${hash}`}
													className="text-blue-500 dark:text-brand_2 hover:underline"
												>
													#{hash}
												</Link>
											))}{" "}
										{video.caption}
									</p>
								</div>
							))}
						</div>
					)
				) : savedVideos.length === 0 ? (
					<div className="flex flex-col justify-center items-center gap-1 px-4 py-32">
						<Lock className="w-[80px] h-[80px] text-light_gray dark:text-light_white mb-3" />
						<h1 className="font-bold text-xl text-dark dark:text-white">
							You&apos;re favorite videos will be shown here
						</h1>
					</div>
				) : (
					<div className="grid xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
						{savedVideos.map((video) => (
							<div key={video.id}>
								<Link
									href={`/@${video.userLink}/video/${video.id}`}
									className="relative"
								>
									<video className="w-full aspect-[1/1.25] bg-light_white dark:bg-light_gray rounded-sm object-cover">
										<source src={video.source} />
									</video>
									<TriangleIcon className="w-4 h-4 absolute left-3 bottom-3 text-white rotate-90" />
								</Link>
								<p className="truncate mt-1">
									{video.hashtags
										.split("#")
										.filter((i) => i !== "")
										.map((hash: string) => (
											<Link
												key={hash}
												href={`/tags/${hash}`}
												className="text-blue-500 dark:text-brand_2 hover:underline"
											>
												#{hash}
											</Link>
										))}{" "}
									{video.caption}
								</p>
							</div>
						))}
					</div>
				)}
			</>
		</div>
	);
};

export default CurrentUserBody;
