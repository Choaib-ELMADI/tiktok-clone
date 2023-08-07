import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ChangeEvent, useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { storage } from "@/lib/db/firebase";
import { cn } from "@/lib/utils";
const CAPTION_MAX_LENGTH = 300;
const MAX_HASHTAGS = 20;

interface AfterUploadProps {
	loading: boolean;
	video: File | null;
	videoData: { caption: string; hashtags: string };
	handleDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddVideo: () => void;
	setVideoUrl: (url: string | null) => void;
	videoUrl: string | null;
	approved: boolean;
	setApproved: (s: boolean) => void;
}

const AfterUpload = ({
	loading,
	video,
	videoData,
	handleDataChange,
	handleAddVideo,
	setVideoUrl,
	videoUrl,
	approved,
	setApproved,
}: AfterUploadProps) => {
	const videoWrapperRef = useRef<HTMLDivElement>(null);
	const [approving, setApproving] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!videoWrapperRef.current) return;

		if (video) {
			videoWrapperRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [video]);

	const handleApproveVideo = () => {
		if (!video) return;

		setApproving(true);

		const storageRef = ref(
			storage,
			`videos/${video?.name}__${new Date().getTime()}`
		);

		const uploadTask = uploadBytesResumable(storageRef, video!);

		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				setApproving(false);
				setApproved(false);
				toast.error("An error occured", { duration: 4000 });
				return;
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setApproved(true);
					setApproving(false);
					setVideoUrl(downloadURL);
				});
			}
		);

		let timeoutId = setTimeout(() => {
			toast.error("Action took too long. Please try again later", {
				duration: 4000,
				className: "text-center text-[.9rem]",
			});
			setApproved(false);
			setApproving(false);
			setVideoUrl(null);
		}, 4 * 60 * 1000);

		if (videoUrl) {
			clearTimeout(timeoutId);
		}
	};

	return (
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
							<div className="relative w-full h-full flex items-center justify-center">
								<div className="p-3 backdrop-blur-md bg-light_gray text-white z-20 absolute top-0 left-0 w-full flex items-center justify-between rounded-md">
									<p>{video.name}</p>
									<button
										disabled={approved || approving}
										onClick={handleApproveVideo}
										className="bg-brand_1 py-1 px-4 rounded-sm text-sm disabled:opacity-60"
									>
										{approved
											? "Approved"
											: approving
											? "Approving..."
											: "Approve"}
									</button>
								</div>
								<video
									className="w-full hide-controls video-preview"
									disablePictureInPicture
									controlsList="nodownload noplaybackrate"
									controls
									muted
								>
									<source src={URL.createObjectURL(video)} />
								</video>
							</div>
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
									!videoData.hashtags ||
									!approved
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
	);
};

export default AfterUpload;
