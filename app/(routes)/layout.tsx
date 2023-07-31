import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function RoutesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="pl-[80px] md:pl-[250px] pt-[70px]">
			<Navbar />
			<Sidebar />
			<div className="bg-red-500">{children}</div>
		</main>
	);
}
