"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function UploadPage() {
	const [video, setVideo] = useState();
	const [videoData, setVideoData] = useState({ caption: "", hashtags: "" });

	const handleChange = (e: any) => {
		if (!e.currentTarget.files[0]) return;

		setVideo(e.currentTarget.files[0]);
	};

	const handleDataChange = (e: any) => {
		const { name, value } = e.target;
		setVideoData({ ...videoData, [name]: value });
	};

	return (
		<div className="my-8">
			<div className="py-12 px-4 md:px-12 text-center">
				<div className="bg-[#fff] shadow-xl p-2 xs:p-6 md:p-12 w-full rounded-lg">
					<label
						htmlFor="video"
						className="flex flex-col items-center gap-2 p-4 md:p-8 border-2 border-dashed border-light_white w-full rounded-lg cursor-pointer hover:bg-white_trs transition"
					>
						<UploadCloud className="w-10 h-10 text-light_white mb-4" />
						<h1 className="text-xl font-extrabold">Select video to upload</h1>
						<p className="mb-2 text-dark_gray text-sm font-extralight">
							Long videos can be split into multiple parts to get more exposure
						</p>
						<p className="text-sm text-gray font-extralight">
							Accept mp4 video format only
						</p>
						<p className="text-sm text-gray font-extralight">
							Up to 600 seconds
						</p>
						<p className="text-sm text-gray font-extralight">Less than 2 GB</p>
						<p className="text-sm text-gray font-extralight">
							Less than 30 videos
						</p>
						<Button
							variant="destructive"
							size="lg"
							className="w-[260px] md:w-[360px] mt-4 text-white pointer-events-none"
						>
							Select files
						</Button>
					</label>
					<input
						type="file"
						name="video"
						id="video"
						hidden
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="pb-12 px-4 md:px-12">
				<div className="bg-[#fff] shadow-xl p-2 xs:p-6 md:p-12 w-full rounded-lg">
					<h1 className="text-[1.5rem] font-extrabold">Upload video</h1>
					<p className="text-gray">Post a video to your account</p>
					<div className="flex flex-col md:flex-row gap-4 mt-4">
						<div className="w-full xxs:w-[280px] h-[500px] bg-gray_trs rounded-md overflow-hidden flex flex-col items-center justify-center">
							{video ? (
								<Image
									src={URL.createObjectURL(video)}
									alt="Image"
									width={300}
									height={500}
									className="w-full"
								/>
							) : (
								<>
									<p className="text-gray">Preview Here</p>
									<p className="text-gray text-sm text-center">
										Select a video to show
									</p>
								</>
							)}
						</div>
						<div className="flex flex-col gap-4 flex-grow">
							<div className="flex flex-col w-full">
								<div className="flex items-center justify-between">
									<label htmlFor="caption">Caption</label>
									<span className="text-gray">
										{videoData.caption.length}/2200
									</span>
								</div>
								<input
									type="text"
									name="caption"
									id="caption"
									value={videoData.caption}
									onChange={handleDataChange}
									className="bg-transparent border border-gray outline-none p-2 w-full rounded-sm"
								/>
							</div>
							<div className="flex flex-col w-full">
								<label htmlFor="hashtags">Hashtags</label>
								<input
									type="text"
									name="hashtags"
									id="hashtags"
									value={videoData.hashtags}
									onChange={handleDataChange}
									className="bg-transparent border border-gray outline-none p-2 w-full rounded-sm"
								/>
							</div>
							<div className="grid grid-cols-2 xs:flex gap-2 mt-auto">
								<Button variant="outline" size="lg" className="py-6 px-12">
									Discard
								</Button>
								<Button
									variant="destructive"
									size="lg"
									className="py-6 px-12 text-white"
								>
									Publish
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
