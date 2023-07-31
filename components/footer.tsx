import Link from "next/link";

import { Button } from "@/components/ui/button";
import MainLogo from "@/components/main-logo";

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

const Footer = () => {
	return (
		<div className="bg-black text-white mt-auto">
			<div className="w-full max-w-[1100px] mx-auto p-8 lg:p-4 lg:pt-8">
				<div className="mb-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start justify-items-center lg:justify-items-start">
					<MainLogo mode="light" />
					{links.map((item) => (
						<div key={item.title} className="flex flex-col gap-2">
							<p className="text-center lg:text-start text-[#fff]">
								{item.title}
							</p>
							{item.links.map((l) => (
								<Link
									href={l.link}
									key={l.name}
									className="text-sm text-light_white text-center lg:text-start hover:underline underline-offset-4 decoration-2"
								>
									{l.name}
								</Link>
							))}
						</div>
					))}
				</div>
				<div className="flex flex-col items-center justify-between lg:flex-row gap-4">
					<Button variant="outline">Language</Button>
					<p className="text-sm">&copy; {new Date().getFullYear()} TikLok</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
