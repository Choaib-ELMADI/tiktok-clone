"use client";

import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const SignOutButton = () => {
	const { signOut } = useClerk();
	const router = useRouter();

	return (
		<Button
			onClick={() => {
				signOut();
				router.push("/");
				router.refresh();
			}}
			className="w-full bg-transparent border-0 whitespace-nowrap"
		>
			Sign out
		</Button>
	);
};

export default SignOutButton;
