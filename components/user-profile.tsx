// "use client";

import { currentUser } from "@clerk/nextjs";
// import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = async () => {
	// const { isSignedIn, user } = useUser();
	const user = await currentUser();

	if (!user) return null;

	return (
		<div>
			<Avatar className="w-[32px] h-[32px] cursor-pointer">
				<AvatarImage src={user.profileImageUrl} />
				<AvatarFallback className="bg-dark_gray text-white_clr">
					{user.firstName?.charAt(0).toUpperCase()}
					{user.lastName?.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default UserProfile;
