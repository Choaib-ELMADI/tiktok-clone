"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const MainLogo = () => {
	const { resolvedTheme } = useTheme();

	return (
		<Link href="/" className="flex items-center">
			<Image
				src={
					resolvedTheme === "dark"
						? "/main-logo-white.svg"
						: "/main-logo-black.svg"
				}
				alt="TikLok Logo"
				draggable="false"
				width={118}
				height={43}
			/>
		</Link>
	);
};

export default MainLogo;
