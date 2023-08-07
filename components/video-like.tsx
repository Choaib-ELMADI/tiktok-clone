"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Video } from "@prisma/client";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
interface LikeVideoProps {
	video: Video;
	likeVideo: () => any;
	likeState: () => any;
	user: any;
	className: string;
	text?: string;
}

const LikeVideo = ({
	video,
	likeVideo,
	likeState,
	user,
	className,
	text,
}: LikeVideoProps) => {
	const [disabled, setDisabled] = useState(false);
	const [liked, setLiked] = useState(false);
	const [state, setState] = useState();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const videoLikeState = await likeState();
			setState(videoLikeState);
		})();
	}, [user]);

	const handleLikeVideo = async () => {
		setDisabled(true);

		if (!user) {
			toast.error(
				"Sign up to follow creators, like videos, and view comments.",
				{
					duration: 3000,
					className: "text-center text-sm",
				}
			);
			router.push("/sign-up");
			return;
		}

		setLiked(!liked);

		try {
			await likeVideo();
			const videoLikeState = await likeState();
			setState(videoLikeState);
		} catch (err) {
			console.log("Error liking video: ", err);
		} finally {
			router.refresh();
			setDisabled(false);
		}
	};

	return (
		<div className={cn("flex items-center gap-[3px]", className)}>
			<button
				className="group border-0 outline-none rounded-full w-[36px] h-[36px] xm:w-[46px] xm:h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center"
				onClick={handleLikeVideo}
				disabled={disabled}
			>
				<Heart
					className={cn(
						"h-5 w-5 xm:w-6 xm:h-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray group-active:scale-[1.4] transition",
						state || liked
							? "dark:fill-red-600 fill-red-600 dark:text-red-600 text-red-600"
							: ""
					)}
				/>
			</button>
			<span
				className={cn(
					"text-[.9rem] dark:text-light_white text-light_gray font-semibold",
					text
				)}
			>
				{video.likes > 1000 ? `${video.likes / 1000}K` : video.likes}
			</span>
		</div>
	);
};

export default LikeVideo;
