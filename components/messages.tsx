import Image from "next/image";
import Link from "next/link";

const Messages = () => {
	return (
		<Link href="/">
			<Image
				src="/message.svg"
				alt="Messages"
				draggable="false"
				width={26}
				height={26}
			/>
		</Link>
	);
};

export default Messages;
