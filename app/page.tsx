import { SignOutButton, currentUser } from "@clerk/nextjs";

import Navbar from "@/components/navbar";

export default async function Home() {
	const user = await currentUser();

	return (
		<main>
			<Navbar />
			{user && (
				<div className="text-3xl text-brand_1">
					<SignOutButton />
				</div>
			)}
		</main>
	);
}
