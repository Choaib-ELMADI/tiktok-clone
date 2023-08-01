import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function UploadLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="pt-[60px] flex flex-col bg-white text-black">
			<Navbar />
			{children}
			<Footer />
		</main>
	);
}
