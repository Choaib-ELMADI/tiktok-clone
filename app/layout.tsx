const inter = Inter({ weight: "500", subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
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
				<body className={inter.className}>
					<Providers>{children}</Providers>
				</body>
			</ClerkProvider>
		</html>
	);
}
