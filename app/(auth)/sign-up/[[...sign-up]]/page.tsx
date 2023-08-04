import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-screen px-4 py-8">
			<SignUp />
		</div>
	);
}
