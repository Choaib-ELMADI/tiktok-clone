import { SaveIcon } from "lucide-react";

const Save = () => {
	return (
		<div className="flex flex-col items-center gap-[3px]">
			<button className="border-0 outline-none rounded-full w-[36px] h-[36px] xm:w-[46px] xm:h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
				<SaveIcon className="h-5 w-5 xm:w-6 xm:h-6 dark:text-light_white text-light_gray" />
			</button>
			<span className="text-sm dark:text-light_white text-light_gray">0</span>
		</div>
	);
};

export default Save;
