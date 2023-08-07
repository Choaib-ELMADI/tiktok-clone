"use client";

import { Video } from "@prisma/client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const VideoComments = ({
	video,
	postComment,
}: {
	video: Video;
	postComment: (c: string) => void;
}) => {
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState("");

	const handlePostComment = () => {
		setLoading(true);

		postComment(comment);

		setLoading(false);
		setComment("");
		toast.success("Comment posted");
	};

	return (
		<div className="mt-2 flex flex-col">
			<h1 className="py-2 border-b-2 border-border font-semibold mx-6">
				Comments ({video.likes})
			</h1>
			<div className="h-max min-h-[200px] lg:h-[calc(100vh-385px)] overflow-scroll show-scrollbar mx-6">
				<div className="h-[500px]">comments here</div>
			</div>
			<div className="mt-auto flex items-center justify-between border-t-2 border-border px-6 py-4">
				<textarea
					placeholder="Add comment..."
					rows={2}
					maxLength={86}
					value={comment}
					className="resize-none outline-none border-0 w-full p-2 rounded-md"
					onChange={(e) => setComment(e.target.value)}
				/>
				<button
					disabled={comment === "" || loading}
					className="p-2 font-semibold disabled:text-light_white disabled:opacity-80 text-brand_1 whitespace-nowrap"
					onClick={handlePostComment}
				>
					Post{" "}
					<span
						className={cn(
							"text-light_white",
							comment.length >= 86 ? "text-brand_1" : ""
						)}
					>
						({comment.length})
					</span>
				</button>
			</div>
		</div>
	);
};

export default VideoComments;
