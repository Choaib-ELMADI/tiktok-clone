"use client";

import { toast } from "react-hot-toast";

const VideoLink = () => {
	const handleCopyText = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("Video link copied", { duration: 2000 });
		} catch (err) {
			toast.error("An error occured", { duration: 2000 });
		}
	};

	return (
		<div className="text-[.9rem] flex items-center justify-between bg-light_gray text-light_white dark:bg-light_white dark:text-light_gray rounded-sm overflow-hidden mx-6">
			<p className="font-semibold truncate pl-3">{window.location.href}</p>
			<button
				className="cursor-pointer px-6 py-1 dark:bg-light_gray dark:text-light_white bg-light_white text-light_gray font-bold whitespace-nowrap"
				onClick={handleCopyText}
			>
				Copy link
			</button>
		</div>
	);
};

export default VideoLink;
