import { Heart, MessageCircle, Save, Send } from "lucide-react";
import { Video } from "@prisma/client";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface VideoProps {
	video: Video;
}

const Video = ({ video }: VideoProps) => {
	return (
		<div className="pb-4 border-b border-border max-w-[700px] w-full">
			<div className="flex gap-2 mb-3">
				<Link href="/">
					<Avatar className="bg-text text-background w-[52px] h-[52px]">
						<AvatarImage />
						<AvatarFallback>CE</AvatarFallback>
					</Avatar>
				</Link>
				<div className="flex flex-col">
					<Link href="/" className="hover:underline">
						{video.id}
					</Link>
					<h3 className="text-sm text-light_gray mb-1">{video.owner}</h3>
					<p className="text-sm">
						{video.caption}{" "}
						{video.hashtags
							.split("#")
							.filter((i) => i !== "")
							.map((hash, i) => (
								<Link
									href="/"
									key={`hash-${i}`}
									className="text-brand_2 hover:underline ml-[4px]"
								>
									#{hash}
								</Link>
							))}
					</p>
				</div>
				<Button variant="outline" size="lg" className="ml-auto">
					Follow
				</Button>
			</div>
			<div className="flex items-end gap-4">
				<video controls className="h-[460px] xs:h-[540px] ml-[60px] rounded-md">
					<source src={video.source} />
				</video>
				<div className="flex flex-col gap-[3px]">
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[50px] h-[50px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<Heart className="h-6 w-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[50px] h-[50px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<MessageCircle className="h-6 w-6 dark:fill-light_white fill-light_gray dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[50px] h-[50px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<Save className="h-6 w-6 dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
					<div className="flex flex-col items-center gap-[3px]">
						<button className="border-0 outline-none rounded-full w-[50px] h-[50px] p-2 bg-light_white text-black dark:bg-light_gray dark:text-white cursor-pointer flex items-center justify-center">
							<Send className="h-6 w-6 dark:text-light_white text-light_gray" />
						</button>
						<span className="text-sm dark:text-light_white text-light_gray">
							0
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Video;
