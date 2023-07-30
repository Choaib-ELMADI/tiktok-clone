import Image from "next/image";

const Inbox = () => {
	return (
		<div>
			<Image
				src="/notification.svg"
				alt="Notification"
				draggable="false"
				width={32}
				height={32}
			/>
		</div>
	);
};

export default Inbox;
