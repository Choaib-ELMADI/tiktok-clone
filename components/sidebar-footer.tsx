import Link from "next/link";

const links = [
	{
		title: "Company",
		links: [
			{ name: "About", link: "/" },
			{ name: "Newsroom", link: "/" },
			{ name: "Contact", link: "/" },
			{ name: "Careers", link: "/" },
			{ name: "ByteDance", link: "/" },
		],
	},
	{
		title: "Programs",
		links: [
			{ name: "TikLok for Good", link: "/" },
			{ name: "Advertise", link: "/" },
			{ name: "Developers", link: "/" },
			{ name: "TikLok Rewards", link: "/" },
			{ name: "TikLok Embeds", link: "/" },
		],
	},
	{
		title: "Support",
		links: [
			{ name: "Help Center", link: "/" },
			{ name: "Safety Center", link: "/" },
			{ name: "Creator Portal", link: "/" },
			{ name: "Community Guidelines", link: "/" },
			{ name: "Transparency", link: "/" },
			{ name: "Accessibility", link: "/" },
		],
	},
	{
		title: "Legal",
		links: [
			{ name: "Terms of Use", link: "/" },
			{ name: "Privacy Policy", link: "/" },
		],
	},
];

const SidebarFooter = () => {
	return (
		<div className="hidden md:flex flex-col gap-4 mt-4 pt-4 pl-1 border-t border-border">
			{links.map((item) => (
				<div key={item.title} className="flex flex-wrap gap-2">
					{item.links.map((link) => (
						<Link
							href={link.link}
							key={link.name}
							className="text-[.75rem] text-light_gray dark:text-light_white leading-4 hover:underline"
						>
							{link.name}
						</Link>
					))}
				</div>
			))}
			<p className="text-[.85rem] text-light_gray dark:text-light_white">
				&copy; {new Date().getFullYear()} TikLok
			</p>
		</div>
	);
};

export default SidebarFooter;
