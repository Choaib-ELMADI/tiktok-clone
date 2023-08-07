import { SaveIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Save = ({ className, text }: { className: string; text?: string }) => {
	return (
		<div className={cn("flex items-center gap-[3px]", className)}>
			<button className="border-0 outline-none rounded-full w-[36px] h-[36px] xm:w-[46px] xm:h-[46px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
				<SaveIcon className="h-5 w-5 xm:w-6 xm:h-6 dark:text-light_white text-light_gray" />
			</button>
			<span
				className={cn(
					"text-[.9rem] dark:text-light_white text-light_gray font-semibold",
					text
				)}
			>
				{0 > 1000 ? `${0 / 1000}K` : 0}
			</span>
		</div>
	);
};

export default Save;
