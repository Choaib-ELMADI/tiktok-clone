import { Comment, Video } from "@prisma/client";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentWrapper = ({
	comment,
	video,
}: {
	comment: Comment;
	video: Video;
}) => {
	return (
		<div className="flex gap-4">
			<Link href={`/@${video.userLink}`}>
				<Avatar>
					<AvatarImage
						src={video.userProfileImageUrl}
						className="bg-light_gray text-light_white dark:bg-light_white dark:text-light_gray"
					/>
					<AvatarFallback>
						{video.userName.split(" ")[0].charAt(0).toUpperCase()}
						{video.userName.split(" ")[1].charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</Link>
			<div className="flex flex-col gap-[2px]">
				<Link
					href={`/@${video.userLink}`}
					className="hover:underline text-[.9rem] font-semibold tracking-wider"
				>
					{video.userName}
				</Link>
				<p>{comment.comment}</p>
				<p>
					{new Date(comment.createdAt).getMonth() + 1}
					{" - "}
					{new Date(comment.createdAt).getDate()}
				</p>
			</div>
		</div>
	);
};

export default CommentWrapper;
