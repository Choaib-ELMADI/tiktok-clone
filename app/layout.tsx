import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TikLok - Make Your Day",
	description: "TikToK Clone App",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={montserrat.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
