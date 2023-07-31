const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

import Providers from "./providers";
import "./globals.css";

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
		<html lang="en" className="dark" style={{ colorScheme: "dark" }}>
			<ClerkProvider>
				<body className={montserrat.className}>
					<Providers>{children}</Providers>
				</body>
			</ClerkProvider>
		</html>
	);
}
