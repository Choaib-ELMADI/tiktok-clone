import { LogOut, Moon, Star, Store, User } from "lucide-react";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserProfile = async () => {
	const user = await currentUser();

	if (!user) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="w-[32px] h-[32px] cursor-pointer">
					<AvatarImage src={user.profileImageUrl} />
					<AvatarFallback className="bg-dark_gray text-white_clr">
						{user.firstName?.charAt(0).toUpperCase()}
						{user.lastName?.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60 mt-[10px] -translate-x-4">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href="/" className="flex items-center py-1 w-full">
							<User className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">View Profile</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<Link href="/" className="flex items-center py-1 w-full">
							<Star className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">Favorites</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<Link href="/" className="flex items-center py-1 w-full">
							<Store className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">Business suite</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<Link href="/" className="flex items-center py-1 w-full">
							<Moon className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">Dark mode</span>
							<div className="ml-auto">
								<Switch id="dark-light-mode" />
							</div>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<LogOut className="mr-3 h-5 w-5" />
					<span className="text-[.95rem] cursor-pointer">
						<SignOutButton />
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfile;
