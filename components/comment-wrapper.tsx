import { useRouter } from "next/navigation";
import { Comment } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";

const CommentWrapper = ({
	comment,
	deleteComment,
}: {
	comment: Comment;
	deleteComment: (id: string) => void;
}) => {
	const { user } = useUser();
	const router = useRouter();

	const handleDeleteComment = () => {
		try {
			deleteComment(comment.id);
		} catch (err) {
			toast.error("Error occured during comment deletion");
		} finally {
			router.refresh();
		}
	};

	return (
		<div className="group flex gap-4">
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
			<div className="flex flex-col gap-[2px] flex-1">
				<Link
					href={`/@${comment.userLink}`}
					className="hover:underline text-[.9rem] font-semibold tracking-wider"
				>
					{comment.userName}
				</Link>
				<p className="leading-[1.2rem] font-medium">{comment.comment}</p>
				<p>
					{new Date(comment.createdAt).getMonth() + 1}
					{" - "}
					{new Date(comment.createdAt).getDate()}
				</p>
			</div>
			{user?.emailAddresses[0].emailAddress
				.split("@")[0]
				.replaceAll(".", "") === comment.userLink && (
				<span
					className="opacity-0 invisible group-hover:opacity-100 group-hover:visible  ml-auto w-5 h-5 mr-2 cursor-pointer hover:text-red-500 transition-colors"
					onClick={handleDeleteComment}
				>
					<Trash2 className="w-full h-full" />
				</span>
			)}
		</div>
	);
};

export default CommentWrapper;
