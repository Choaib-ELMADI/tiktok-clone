import { LogOut, Moon, Plus, Star, Store, User } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutButton from "@/components/sign-out-button";
import SwitchTheme from "./switch-theme";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
					<AvatarFallback className="bg-light_gray text-white">
						{user.firstName?.charAt(0).toUpperCase()}
						{user.lastName?.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60 mt-[12px] -translate-x-4">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link
							href={`/@${user.emailAddresses[0].emailAddress
								.split("@")[0]
								.replaceAll(".", "")}`}
							className="flex items-center py-1 w-full"
						>
							<User className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">View Profile</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem className="block xs:hidden">
						<Link href="/upload" className="flex items-center py-[.35rem]">
							<Plus className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">Upload</span>
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
						<div className="flex items-center py-1 w-full">
							<Moon className="mr-3 h-5 w-5" />
							<span className="text-[.95rem]">Dark mode</span>
							<SwitchTheme />
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator className="bg-text mx-2" />

				<DropdownMenuItem className="py-2">
					<AlertDialog>
						<AlertDialogTrigger className="flex items-center py-1 w-full">
							<LogOut className="mr-3 h-5 w-5" />
							<span className="text-[.95rem] cursor-pointer">Sign out</span>
						</AlertDialogTrigger>

						<AlertDialogContent className="w-[calc(100%-2rem)] rounded-lg">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-xl lg:text-2xl text-center">
									Are you sure you want to sign out?
								</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter className="grid grid-cols-2 gap-2 md:gap-0">
								<AlertDialogCancel className="text-white">
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction>
									<SignOutButton />
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfile;
