"use client";

import { ChangeEvent, useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const CAPTION_MAX_LENGTH = 300;
const MAX_HASHTAGS = 20;

export default function UploadComponent({
	publishVideo,
}: {
	publishVideo: (
		video: string,
		videoData: { caption: string; hashtags: string },
		userEmailId: string
	) => {};
}) {
	const onDrop = useCallback((acceptedFiles: any) => {
		if (loading) return;

		const file = acceptedFiles?.[0];

		if (!file) return;

		if (!file.type.includes("video")) {
			return alert("Please select a video");
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const result = reader.result as string;
			setVideo(result);
		};
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	const [videoData, setVideoData] = useState({ caption: "", hashtags: "" });
	const videoWrapperRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [video, setVideo] = useState<string>();
	const router = useRouter();
	const { user } = useUser();

	useEffect(() => {
		if (!videoWrapperRef.current) return;

		if (video) {
			videoWrapperRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [video]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (loading) return;

		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.includes("video")) {
			return alert("Please select a video");
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const result = reader.result as string;
			setVideo(result);
		};
	};

	const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setVideoData({ ...videoData, [name]: value });
	};

	const handleAddVideo = async () => {
		setLoading(true);

		if (!video || !user?.primaryEmailAddressId) {
			setLoading(false);
			return;
		}

		await publishVideo(video, videoData, user.primaryEmailAddressId);

		setLoading(false);
		setVideoData({ caption: "", hashtags: "" });
		setVideo("");
	};

	return (
		<div className="my-8">
			<div className="py-12 px-4 md:px-12 text-center max-w-[1600px] mx-auto">
				<div className="bg-[#fff] shadow-xl p-2 xs:p-6 md:p-12 w-full rounded-lg">
					<label
						htmlFor="video"
						className="flex flex-col items-center gap-2 p-4 md:p-8 border-2 border-dashed border-light_white w-full rounded-lg cursor-pointer hover:bg-white_trs transition"
						{...getRootProps()}
					>
						<UploadCloud className="w-10 h-10 text-light_white mb-4" />
						<h1 className="text-xl font-extrabold">Select video to upload</h1>
						<p className="text-dark_gray text-sm font-extralight">
							{isDragActive ? "Drop, it's hot" : "Drag and drop files"}
						</p>
						<p className="mb-2 text-dark_gray text-sm font-extralight">
							Long videos can be split into multiple parts to get more exposure
						</p>
						<p className="text-sm text-gray font-extralight">
							Support mp4, avi, webm, and mov video formats
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
							className="w-full xs:w-[260px] md:w-[360px] mt-4 text-white pointer-events-none"
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
						accept="video/*"
						{...getInputProps()}
					/>
				</div>
			</div>

			<div
				className="pb-12 px-4 md:px-12 scroll-m-[35px] max-w-[1600px] mx-auto"
				ref={videoWrapperRef}
			>
				<div className="bg-[#fff] shadow-xl p-2 xs:p-6 md:p-12 w-full rounded-lg">
					<h1 className="text-[1.5rem] font-extrabold">Upload video</h1>
					<p className="text-gray">Post a video to your account</p>
					<div className="flex flex-col md:flex-row gap-4 mt-4">
						<div className="w-full xxs:w-[280px] h-[500px] bg-gray_trs rounded-md overflow-hidden flex flex-col items-center justify-center">
							{video ? (
								<video className="w-full" controls muted>
									<source src={video} />
								</video>
							) : (
								<>
									<p className="text-gray">Selected Video</p>
									<p className="text-gray text-sm text-center">
										Select a video to show preview
									</p>
								</>
							)}
						</div>
						<div className="flex flex-col gap-4 flex-grow">
							<div className="flex flex-col w-full">
								<div className="flex items-center justify-between">
									<label htmlFor="caption">Caption</label>
									<span className="text-brand_2">
										{videoData.caption.length}/{CAPTION_MAX_LENGTH}
									</span>
								</div>
								<input
									type="text"
									name="caption"
									id="caption"
									value={videoData.caption}
									onChange={handleDataChange}
									maxLength={CAPTION_MAX_LENGTH}
									className={cn(
										"bg-transparent border border-gray outline-none p-2 w-full rounded-sm",
										videoData.caption.length >= CAPTION_MAX_LENGTH
											? "text-brand_1"
											: ""
									)}
								/>
							</div>
							<div className="flex flex-col w-full">
								<div className="flex items-center justify-between">
									<label htmlFor="hashtags">
										Hashtags <span className="text-brand_1">(#)</span>
									</label>
									<span className="text-brand_2">
										{videoData.hashtags.split("#").length - 1}/{MAX_HASHTAGS}
									</span>
								</div>
								<input
									type="text"
									name="hashtags"
									id="hashtags"
									value={videoData.hashtags}
									onChange={handleDataChange}
									className={cn(
										"bg-transparent border border-gray outline-none p-2 w-full rounded-sm",
										videoData.hashtags.split("#").length - 1 >= MAX_HASHTAGS
											? "text-brand_1"
											: ""
									)}
								/>
							</div>
							<div className="grid grid-cols-1 xxs:grid-cols-2 xs:flex gap-2 mt-auto">
								<Button
									variant="outline"
									size="lg"
									className="py-6 px-12"
									disabled={loading}
									onClick={() => router.push("/")}
								>
									Discard
								</Button>
								<Button
									variant="destructive"
									size="lg"
									className="py-6 px-12 text-white"
									disabled={
										loading ||
										!video ||
										!videoData.caption ||
										!videoData.hashtags
									}
									onClick={handleAddVideo}
								>
									{loading ? "Publishing..." : "Publish"}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
