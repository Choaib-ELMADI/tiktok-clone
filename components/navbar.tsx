import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/searchbar";
import UserMenu from "@/components/user-menu";

export default function Navbar() {
	return (
		<nav className="px-4 py-2 border-b border-light_gray flex justify-between items-center">
			<Link href="/" className="flex items-center gap-1">
				<Image
					src="/main-logo-white.svg"
					alt="TikLok Logo"
					draggable="false"
					width={118}
					height={43}
				/>
			</Link>
			<SearchBar />
			<UserMenu />
		</nav>
	);
}
