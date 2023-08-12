import { Video } from "lucide-react";

export default function LivePage() {
	return (
		<div className="p-4">
			<div className="w-full aspect-[1/.5] min-h-[300px] bg-light_white dark:bg-light_gray flex flex-col justify-center items-center rounded-md mb-4 p-4">
				<Video className="w-[2.5rem] xs:w-12 lg:w-16 h-[2.5rem] xs:h-12 lg:h-16" />
				<h1 className="text-xl md:text-2xl font-bold">Server error</h1>
				<p className="text-[.9rem] md:text-[1rem] font-semibold tracking-wider w-full max-w-[450px] text-center mt-2">
					Something is wrong on our end. We apologize for any inconvenience and
					should be back soon.
				</p>
			</div>
			<div className="w-full aspect-[1/.5] min-h-[300px] bg-light_white dark:bg-light_gray flex flex-col justify-center items-center rounded-md p-4">
				<Video className="w-[2.5rem] xs:w-12 lg:w-16 h-[2.5rem] xs:h-12 lg:h-16" />
				<h1 className="text-xl md:text-2xl font-bold">Server error</h1>
				<p className="text-[.9rem] md:text-[1rem] font-semibold tracking-wider w-full max-w-[450px] text-center mt-2">
					Something is wrong on our end. We apologize for any inconvenience and
					should be back soon.
				</p>
			</div>
		</div>
	);
}
