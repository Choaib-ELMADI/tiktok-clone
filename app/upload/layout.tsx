import { Metadata } from "next";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
	title: "Upload - TikLok",
};

export default function UploadLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="pt-[60px] h-screen flex flex-col">
			<Navbar />
			{children}
			<Footer />
		</main>
	);
}
