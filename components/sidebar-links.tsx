"use client";

const montserrat = Montserrat({ weight: "700", subsets: ["latin"] });
import { Compass, Home, User, Users, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { useUser } from "@clerk/nextjs";
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
	const { user } = useUser();

	return (
		<>
			{links.map((link) => (
				<Link
					href={link.href}
					key={link.label}
					className={cn(
						"flex flex-col xs:flex-row items-center gap-1 xs:gap-4 px-4 py-3 hover:bg-light_white dark:hover:bg-dark_gray rounded-[4px] transition",
						montserrat.className,
						pathname === link.href ? "text-brand_1" : "",
						link.href === "/live" ? "uppercase" : ""
					)}
				>
					<link.icon />
					<h1 className="block xs:hidden text-[.65rem] xs:text-[1rem] md:block relative text-center whitespace-nowrap">
						{link.label}
					</h1>
					{pathname !== "/explore" &&
						link.label.toLowerCase() === "explore" && (
							<>
								<Badge
									variant="outline"
									className="border-brand_1 bg-brand_1 text-white hidden md:block"
								>
									New
								</Badge>
								<span className="hidden xs:block md:hidden w-[.35rem] h-[.35rem] rounded-full bg-brand_1 absolute translate-x-7 -translate-y-3" />
							</>
						)}
				</Link>
			))}
			{user && (
				<Link
					href={`/@${user?.emailAddresses[0].emailAddress
						.split("@")[0]
						.replaceAll(".", "")}`}
					className={cn(
						"flex flex-col xs:hidden items-center gap-1 xs:gap-4 px-4 py-3 hover:bg-light_white dark:hover:bg-dark_gray rounded-[4px] transition",
						pathname ===
							`/@${user?.emailAddresses[0].emailAddress
								.split("@")[0]
								.replaceAll(".", "")}`
							? "text-brand_1"
							: "",
						montserrat.className
					)}
				>
					<User />
					<h1 className="block xs:hidden text-[.65rem] xs:text-[1rem] md:block relative text-center whitespace-nowrap">
						Profile
					</h1>
				</Link>
			)}
		</>
	);
};

export default SidebarLinks;
