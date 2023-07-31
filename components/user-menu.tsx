import { Moon, MoreVertical } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SwitchTheme from "./switch-theme";
import UserProfile from "./user-profile";
import Messages from "./messages";
import Inbox from "./inbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = async () => {
	const user = await currentUser();

	return (
		<div className="flex items-center gap-5">
			<Link href="/upload">
				<Button
					variant="secondary"
					className="bg-[#86878d] dark:bg-light_gray hover:bg-[#86878d] dark:hover:bg-light_gray"
				>
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
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="cursor-pointer">
							<MoreVertical />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-60 mt-[12px] -translate-x-4">
							<DropdownMenuItem>
								<div className="flex items-center py-1 w-full">
									<Moon className="mr-3 h-5 w-5" />
									<span className="text-[.95rem]">Dark mode</span>
									<SwitchTheme />
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)}
		</div>
	);
};

export default UserMenu;
