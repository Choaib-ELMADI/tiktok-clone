import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import UserProfile from "./user-profile";
import Messages from "./messages";
import Inbox from "./inbox";

const UserMenu = async () => {
	const user = await currentUser();

	return (
		<div className="flex items-center gap-5">
			<Link href="/">
				<Button variant="secondary">
					<Image
						src="/add.svg"
						alt="Upload"
						draggable="false"
						width={20}
						height={20}
					/>
					<p className="text-[.9rem] ml-2">Upload</p>
				</Button>
			</Link>
			{user ? (
				<>
					<Messages />
					<Inbox />
					<UserProfile />
				</>
			) : (
				<>
					<Link href="/sign-up">
						<Button variant="outline">Sign Up</Button>
					</Link>
				</>
			)}
		</div>
	);
};

export default UserMenu;
