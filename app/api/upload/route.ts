import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req: Request) {
	const { path } = await req.json();

	if (!path) {
		return NextResponse.json(
			{ message: "Video path is required" },
			{ status: 400 }
		);
	}

	try {
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			transformation: [{ width: 360, height: 700, crop: "scale" }],
		};

		const result = await cloudinary.uploader.upload(path, {
			resource_type: "video",
			timeout: 200_000,
			...options,
		});

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "ERROR UPLOADING: ", error },
			{ status: 500 }
		);
	}
}
