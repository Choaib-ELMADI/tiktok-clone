"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<main className="pt-[60px] flex flex-col bg-white text-black">
			<div className="w-full flex flex-col justify-center items-center min-h-[400px]">
				<h1 className="text-2xl font-semibold">An error occured</h1>
				<p className="text-xl font-medium text-red-500 w-full max-w-[500px] text-center mb-8">
					{error.message}
				</p>
				<div className="flex gap-4">
					<Button variant="outline" size="lg" onClick={() => reset()}>
						Try again
					</Button>
					<Button
						variant="default"
						size="lg"
						className="text-white hover:text-black"
					>
						<Link href="/">ForYou Page</Link>
					</Button>
				</div>
			</div>
			<Footer />
		</main>
	);
}
