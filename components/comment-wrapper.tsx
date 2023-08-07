import { Comment } from "@prisma/client";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentWrapper = ({ comment }: { comment: Comment }) => {
	return (
		<div className="flex gap-4">
			<Link href={`/@${comment.userLink}`}>
				<Avatar>
					<AvatarImage
						src={comment.userProfileImageUrl}
						className="bg-light_gray text-light_white dark:bg-light_white dark:text-light_gray"
					/>
					<AvatarFallback>
						{comment.userName.split(" ")[0].charAt(0).toUpperCase()}
						{comment.userName.split(" ")[1].charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</Link>
			<div className="flex flex-col gap-[2px]">
				<Link
					href={`/@${comment.userLink}`}
					className="hover:underline text-[.9rem] font-semibold tracking-wider"
				>
					{comment.userName}
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
