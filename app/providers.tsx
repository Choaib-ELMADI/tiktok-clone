"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Providers;
