"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Messages = () => {
	const { resolvedTheme } = useTheme();

	return (
		<Link href="/">
			<Image
				src={resolvedTheme === "dark" ? "/message.svg" : "/message-black.svg"}
				alt="Messages"
				draggable="false"
				width={26}
				height={26}
			/>
		</Link>
	);
};

export default Messages;
