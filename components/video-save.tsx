"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Video } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";

const Save = ({
	video,
	className,
	text,
	user,
	saveVideo,
	saveState,
}: {
	video: Video;
	className: string;
	text?: string;
	user: any;
	saveVideo: () => any;
	saveState: () => any;
}) => {
	const [disabled, setDisabled] = useState(false);
	const [state, setState] = useState();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const videoSaveState = await saveState();
			setState(videoSaveState);
		})();
	}, [user]);

	const handleSaveVideo = async () => {
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

		try {
			await saveVideo();
			const videoSaveState = await saveState();
			setState(videoSaveState);
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
				onClick={handleSaveVideo}
				disabled={disabled}
			>
				<Image
					src={state ? "/saved.svg" : "/not-saved.svg"}
					alt="Save Icon"
					width={20}
					height={20}
					draggable="false"
					className="group-active:scale-[1.4] transition h-5 w-5 xm:w-6 xm:h-6"
				/>
			</button>
			<span
				className={cn(
					"text-[.9rem] dark:text-light_white text-light_gray font-semibold",
					text
				)}
			>
				{video.saves > 1000 ? `${video.saves / 1000}K` : video.saves}
			</span>
		</div>
	);
};

export default Save;
