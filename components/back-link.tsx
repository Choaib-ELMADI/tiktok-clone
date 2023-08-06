"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface GoBackProps {
	className?: string;
}

const GoBack = ({ className }: GoBackProps) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.back()}
			className={cn(
				"bg-gray w-8 h-8 flex justify-center items-center rounded-full text-white cursor-pointer z-50",
				className
			)}
		>
			<X className="w-5 h-5" />
		</div>
	);
};

export default GoBack;
