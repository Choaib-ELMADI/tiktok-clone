"use client";

import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

const SwitchTheme = () => {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<div className="ml-auto">
			<Switch
				id="dark-light-mode"
				checked={resolvedTheme === "dark"}
				onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			/>
		</div>
	);
};

export default SwitchTheme;
