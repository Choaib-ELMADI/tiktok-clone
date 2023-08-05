import { MessageCircle } from "lucide-react";

const Comment = () => {
	return (
		<div className="flex flex-col items-center gap-[3px]">
			<button className="border-0 outline-none rounded-full w-[46px] h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
				<MessageCircle className="h-6 w-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray" />
			</button>
			<span className="text-sm dark:text-light_white text-light_gray">0</span>
		</div>
	);
};

export default Comment;
