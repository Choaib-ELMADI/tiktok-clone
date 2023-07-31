import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex items-center justify-center h-full py-8">
			<SignUp />
		</div>
	);
}
