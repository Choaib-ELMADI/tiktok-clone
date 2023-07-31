"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const Inbox = () => {
	const { resolvedTheme } = useTheme();

	return (
		<div>
			<Image
				src={
					resolvedTheme === "dark"
						? "/notification.svg"
						: "/notification-black.svg"
				}
				alt="Notification"
				draggable="false"
				width={32}
				height={32}
			/>
		</div>
	);
};

export default Inbox;
