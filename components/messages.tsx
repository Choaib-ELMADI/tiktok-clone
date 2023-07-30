"use cient";

import { useState } from "react";
import Image from "next/image";

const Messages = () => {
	return (
		<div>
			<Image
				src="/message.svg"
				alt="Messages"
				draggable="false"
				width={26}
				height={26}
			/>
		</div>
	);
};

export default Messages;
