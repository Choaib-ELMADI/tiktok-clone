"use client";

import { Compass, Home, Users, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const links = [
	{
		label: "For You",
		href: "/",
		icon: Home,
	},
	{
		label: "Following",
		href: "/following",
		icon: Users,
	},
	{
		label: "Explore",
		href: "/explore",
		icon: Compass,
	},
	{
		label: "Live",
		href: "/live",
		icon: Video,
	},
];

const SidebarLinks = () => {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => (
				<Link
					href={link.href}
					key={link.label}
					className={cn(
						"flex items-center gap-4 px-4 py-3 hover:bg-light_white dark:hover:bg-dark_gray rounded-[4px] transition",
						pathname === link.href ? "text-brand_1" : ""
					)}
				>
					<link.icon />
					<h1 className="hidden text-[1rem] md:block relative">{link.label}</h1>
					{link.label.toLowerCase() === "explore" && (
						<>
							<Badge
								variant="outline"
								className="border-brand_1 bg-brand_1 text-white hidden md:block"
							>
								New
							</Badge>
							<span className="block md:hidden w-[.35rem] h-[.35rem] rounded-full bg-brand_1 absolute translate-x-7 -translate-y-3" />
						</>
					)}
				</Link>
			))}
		</>
	);
};

export default SidebarLinks;
