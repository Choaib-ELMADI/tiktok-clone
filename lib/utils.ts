export interface UserProps {
	userEmailAddress: string;
	userFirstName: string | null;
	userId: string;
	userLastName: string | null;
	userProfileImageUrl: string;
	userLink: string;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
