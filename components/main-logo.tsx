"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface MainLogoProps {
	mode?: string;
}

const MainLogo = ({ mode }: MainLogoProps) => {
	const { resolvedTheme } = useTheme();

	return (
		<Link href="/" className="flex items-center">
			<Image
				src={
					mode
						? "/main-logo-white.svg"
						: resolvedTheme === "dark"
						? "/main-logo-white.svg"
						: "/main-logo-black.svg"
				}
				alt="TikLok Logo"
				draggable="false"
				width={118}
				height={43}
				className="w-[118px] h-[43px]"
			/>
		</Link>
	);
};

export default MainLogo;
