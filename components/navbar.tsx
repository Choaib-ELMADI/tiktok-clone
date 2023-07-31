import SearchBar from "@/components/searchbar";
import UserMenu from "@/components/user-menu";
import MainLogo from "./main-logo";

export default function Navbar() {
	return (
		<nav className="fixed top-0 left-0 w-full z-50 px-4 py-2 border-b border-border flex justify-between items-center">
			<MainLogo />
			<SearchBar />
			<UserMenu />
		</nav>
	);
}
