import Navbar from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Upload | TikLok",
};

export default function UploadLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<Navbar />
			{children}
			<h1>Footer</h1>
		</main>
	);
}
