"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Video } from "@prisma/client";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface LikeVideoProps {
	video: Video;
	likeVideo: () => any;
	likeState: () => any;
	user: any;
}

const LikeVideo = ({ video, likeVideo, likeState, user }: LikeVideoProps) => {
	const [state, setState] = useState();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const videoLikeState = await likeState();
			setState(videoLikeState);
		})();
	}, [user]);

	const handleLikeVideo = async () => {
		if (!user) {
			toast.error(
				"Sign up to follow creators, like videos, and view comments.",
				{
					duration: 3000,
					className: "text-center text-sm",
				}
			);
			// router.push("/sign-up");
		}

		try {
			await likeVideo();
			const videoLikeState = await likeState();
			setState(videoLikeState);
		} catch (err) {
			console.log("Error liking video: ", err);
		} finally {
			router.refresh();
		}
	};

	return (
		<div className="flex flex-col items-center gap-[3px]">
			<button
				className="border-0 outline-none rounded-full w-[36px] h-[36px] xm:w-[46px] xm:h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center"
				onClick={handleLikeVideo}
			>
				<Heart
					className={cn(
						"h-5 w-5 xm:w-6 xm:h-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray",
						state
							? "dark:fill-red-600 fill-red-600 dark:text-red-600 text-red-600"
							: ""
					)}
				/>
			</button>
			<span className="text-sm dark:text-light_white text-light_gray">
				{video.likes}
			</span>
		</div>
	);
};

export default LikeVideo;
