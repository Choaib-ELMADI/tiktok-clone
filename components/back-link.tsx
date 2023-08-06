"use client";

import { useRouter } from "next/navigation";

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
				"bg-gray w-8 h-8 flex justify-center items-center rounded-full text-white cursor-pointer font-bold text-xl z-50",
				className
			)}
		>
			<h1>X</h1>
		</div>
	);
};

export default GoBack;
