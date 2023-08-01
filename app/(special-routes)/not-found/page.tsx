import Link from "next/link";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFoundPage() {
	return (
		<div className="py-16 px-2 bg-gradient-to-br from-brand_2_trs via-white to-brand_1_trs flex flex-col items-center">
			<div className="flex items-center">
				<span className="text-[6rem] md:text-[12rem]">4</span>
				<Image
					src="/zero.png"
					alt="Zero Png"
					draggable="false"
					width={60}
					height={60}
					className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
				/>
				<span className="text-[6rem] md:text-[12rem]">4</span>
			</div>
			<p className="text-light_gray opacity-70">Couldn't find this page</p>
			<h1 className="text-xl font-extrabold my-4">
				Check out more trending videos on TikTok
			</h1>
			<Link href="/">
				<Button
					variant="outline"
					size="lg"
					className="py-6 w-[260px] md:w-[360px] font-extrabold text-[1rem]"
				>
					Watch now
				</Button>
			</Link>
		</div>
	);
}
