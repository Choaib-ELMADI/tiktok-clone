import { ChangeEvent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BeforeUploadProps {
	loading: boolean;
	setVideo: (result: File) => void;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BeforeUpload = ({
	loading,
	setVideo,
	handleChange,
}: BeforeUploadProps) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (loading) return;

		const file = acceptedFiles?.[0];

		if (!file) return;
		if (!file.type.includes("video")) {
			return alert("Please select a video");
		}

		setVideo(file);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="py-12 px-4 md:px-12 text-center max-w-[1600px] mx-auto">
			<div className="bg-[#fff] shadow-xl p-2 xs:p-6 md:p-12 w-full rounded-lg">
				<span
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
					<p className="text-sm text-gray font-extralight">Up to 600 seconds</p>
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
				</span>
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
	);
};

export default BeforeUpload;
