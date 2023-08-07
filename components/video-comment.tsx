"use client";

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Comment, Video } from "@prisma/client";
import { cn } from "@/lib/utils";

const Comment = ({
	video,
	className,
	text,
	comments,
}: {
	video?: Video;
	className: string;
	text?: string;
	comments: Comment[];
}) => {
	const router = useRouter();
	const { user } = useUser();

	const handleClick = () => {
		if (!video) return;

		if (!user) router.push("/sign-up");

		router.push(`/@${video.userLink}/video/${video.id}`);
	};

	return (
		<div className={cn("flex items-center gap-[3px]", className)}>
			<button
				className="border-0 outline-none rounded-full w-[36px] h-[36px] xm:w-[46px] xm:h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center"
				onClick={handleClick}
			>
				<MessageCircle className="w-5 h-5 xm:h-6 xm:w-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray" />
			</button>
			<span
				className={cn(
					"text-[.9rem] dark:text-light_white text-light_gray font-semibold",
					text
				)}
			>
				{comments.length > 1000
					? `${comments.length / 1000}K`
					: comments.length}
			</span>
		</div>
	);
};

export default Comment;
