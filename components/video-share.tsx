import { Send } from "lucide-react";

const Share = () => {
	return (
		<div className="flex flex-col items-center gap-[3px]">
			<button className="border-0 outline-none rounded-full w-[46px] h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
				<Send className="h-6 w-6 dark:text-light_white text-light_gray" />
			</button>
			<span className="text-sm dark:text-light_white text-light_gray">0</span>
		</div>
	);
};

export default Share;
