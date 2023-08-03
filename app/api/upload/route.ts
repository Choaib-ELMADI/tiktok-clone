import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
	console.log("PATH...");

	const { path } = await req.json();

	if (!path) {
		return NextResponse.json(
			{ message: "Video path is required" },
			{ status: 400 }
		);
	}

	console.log("PATH EXISTS...");

	try {
		console.log("SET OPTIONS...");

		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			transformation: [{ width: 360, height: 700, crop: "scale" }],
		};

		console.log("RESULT...");

		const result = await cloudinary.uploader.upload(path, {
			resource_type: "video",
			timeout: 200_000,
			...options,
		});

		console.log("RETURN...DONE");

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.log("_____ERROR_____");

		return NextResponse.json(
			{ message: "ERROR UPLOADING: ", error },
			{ status: 500 }
		);
	}
}
