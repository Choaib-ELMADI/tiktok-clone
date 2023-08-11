"use client";

import { useRouter } from "next/navigation";
import { Following } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FollowBtn = ({
	className,
	newUserLink,
	followUser,
	followingState,
}: {
	className?: string;
	newUserLink: string;
	followUser: (u: string, n: string) => void;
	followingState: Following;
}) => {
	const { user } = useUser();
	const router = useRouter();

	const handleFollowUser = () => {
		try {
			followUser(
				user?.emailAddresses[0].emailAddress.split("@")[0].replaceAll(".", "")!,
				newUserLink
			);
		} catch (error) {
			toast.error("An error occured while following this user", {
				duration: 4000,
				className: "text-[.9rem] text-center",
			});
		} finally {
			router.refresh();
		}
	};

	return (
		<Button
			variant={
				followingState && followingState.following.includes(newUserLink)
					? "default"
					: "outline"
			}
			size="lg"
			className={cn(
				className,
				followingState && followingState.following.includes(newUserLink)
					? "text-white hover:text-black dark:hover:text-white"
					: ""
			)}
			onClick={handleFollowUser}
		>
			{followingState && followingState.following.includes(newUserLink)
				? "Following"
				: "Follow"}
		</Button>
	);
};

export default FollowBtn;
