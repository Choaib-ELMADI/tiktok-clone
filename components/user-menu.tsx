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
			<Link href="/upload">
				<Button variant="secondary" className="bg-[#86878d] dark:bg-light_gray">
					<Image
						src="/add.svg"
						alt="Upload"
						draggable="false"
						width={20}
						height={20}
					/>
					<p className="text-[.9rem] ml-2 text-white">Upload</p>
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
						<Button variant="outline" size="lg">
							Sign Up
						</Button>
					</Link>
				</>
			)}
		</div>
	);
};

export default UserMenu;
