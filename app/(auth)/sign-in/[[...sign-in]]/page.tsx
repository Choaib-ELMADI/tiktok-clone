import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen px-4 py-8">
			<SignIn />
		</div>
	);
}
