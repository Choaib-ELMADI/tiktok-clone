"use client";

import { Comment, Video } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Bird } from "lucide-react";
import { useState } from "react";

import CommentWrapper from "./comment-wrapper";
import { cn } from "@/lib/utils";

const VideoComments = ({
	video,
	comments,
	postComment,
}: {
	video: Video;
	comments: Comment[];
	postComment: (c: string) => void;
}) => {
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState("");
	const router = useRouter();

	const handlePostComment = () => {
		setLoading(true);

		try {
			postComment(comment);
		} catch (err) {
			toast.error("An error occured");
		} finally {
			setLoading(false);
			setComment("");
			toast.success("Comment posted");
			router.refresh();
		}
	};

	return (
		<div className="mt-2 flex flex-col">
			<h1 className="py-2 border-b-2 border-border font-semibold mx-2 xs:mx-6">
				Comments ({comments.length})
			</h1>
			<div className="h-max min-h-[200px] lg:h-[calc(100vh-400px)] overflow-scroll show-scrollbar mx-2 xs:mx-6">
				{comments.length === 0 ? (
					<div className="flex flex-col justify-center items-center h-full py-10 lg:py-0">
						<Bird className="w-[80px] h-[80px] mb-2" />
						<p>No comments</p>
					</div>
				) : (
					<div className="flex flex-col gap-6 mt-4 mb-4 lg:mb-0">
						{comments.map((comment) => (
							<CommentWrapper
								comment={comment}
								video={video}
								key={comment.id}
							/>
						))}
					</div>
				)}
			</div>
			<div className="mt-auto flex items-center justify-between border-t-2 border-border px-2 xs:px-6 py-4">
				<textarea
					placeholder="Add comment..."
					rows={2}
					maxLength={86}
					value={comment}
					className="resize-none outline-none border-0 w-full p-2 rounded-md text-light_gray dark:text-light_white placeholder:text-light_gray dark:placeholder:text-light_white"
					onChange={(e) => setComment(e.target.value)}
				/>
				<button
					disabled={comment === "" || loading}
					className="p-2 font-semibold disabled:text-light_gray dark:disabled:text-light_white disabled:opacity-80 text-brand_1 whitespace-nowrap"
					onClick={handlePostComment}
				>
					Post{" "}
					<span
						className={cn(
							"text-light_gray dark:text-light_white",
							comment.length >= 86 ? "text-brand_1 dark:text-brand_1" : ""
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
