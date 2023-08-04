"use client";

import { ChangeEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import BeforeUpload from "./upload-before";
import AfterUpload from "./upload-after";
import { UserProps } from "@/lib/utils";

export default function UploadComponent({
	publishVideo,
}: {
	publishVideo: (
		video: string,
		videoData: { caption: string; hashtags: string },
		user: UserProps
	) => {};
}) {
	const [videoData, setVideoData] = useState({ caption: "", hashtags: "" });
	const [video, setVideo] = useState<File | null>(null);
	const [videoUrl, setVideoUrl] = useState<string>();
	const [approved, setApproved] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useUser();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (loading) return;

		const file = e.target.files?.[0];

		if (!file) return;
		if (!file.type.includes("video")) {
			return alert("Please select a video");
		}

		setVideo(file);
	};

	const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setVideoData({ ...videoData, [name]: value });
	};

	const handleAddVideo = () => {
		setLoading(true);

		if (!videoUrl) {
			toast.error("Video url is missing", { duration: 4000 });
			setLoading(false);
			return;
		}

		if (!user) {
			toast.error("Unauthorized action", { duration: 4000 });
			setLoading(false);
			return;
		}

		publishVideo(videoUrl, videoData, {
			userEmailAddress: user?.emailAddresses[0].emailAddress,
			userId: user?.id,
			userFirstName: user?.firstName,
			userLastName: user?.lastName,
			userProfileImageUrl: user?.profileImageUrl,
			userLink: user?.emailAddresses[0].emailAddress.split("@")[0],
		});

		toast.success("Video published", { duration: 4000 });
		setLoading(false);
		setApproved(false);
		setVideoData({ caption: "", hashtags: "" });
		setVideo(null);
	};

	return (
		<div className="my-8">
			<BeforeUpload
				loading={loading}
				setVideo={setVideo}
				handleChange={handleChange}
			/>
			<AfterUpload
				loading={loading}
				video={video}
				videoData={videoData}
				handleDataChange={handleDataChange}
				handleAddVideo={handleAddVideo}
				setVideoUrl={setVideoUrl}
				approved={approved}
				setApproved={setApproved}
			/>
		</div>
	);
}
