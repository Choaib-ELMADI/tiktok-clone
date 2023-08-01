import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function RoutesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="pl-0 xs:pl-[80px] md:pl-[245px] pt-[60px] xs:mr-4">
			<Navbar />
			<Sidebar />
			<div className="pb-[67px] xs:pb-0">{children}</div>
		</main>
	);
}
