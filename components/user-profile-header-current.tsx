"use client";

import { Edit, MoreHorizontal, Share2, X } from "lucide-react";
import { Following, Video } from "@prisma/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CurrentUserHeader = ({
	video,
	user,
	likes,
	updateUser,
	followingState,
	followersState,
}: {
	video: Video;
	user: any;
	likes: number;
	updateUser: (l: string, n: string, b: string) => void;
	followingState: Following;
	followersState: Following[];
}) => {
	const [viewEditProfile, setViewEditProfile] = useState(false);
	const [userName, setUserName] = useState(
		video ? video.userName : `${user?.firstName} ${user?.lastName}`
	);
	const [userBio, setUserBio] = useState(
		video ? video.userBio : "Description or bio"
	);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (viewEditProfile) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [viewEditProfile]);

	const handleUpdateUser = () => {
		setLoading(true);

		try {
			updateUser(
				user?.emailAddresses[0].emailAddress.split("@")[0].replaceAll(".", ""),
				userName,
				userBio
			);
			toast.success("User updated successfully", {
				duration: 4000,
				className: "text-[.9rem], text-center",
			});
			setViewEditProfile(false);
		} catch (err) {
			toast.error("An error occured while updating the user", {
				duration: 4000,
				className: "text-[.9rem], text-center",
			});
			setLoading(false);
		} finally {
			router.refresh();
			setLoading(false);
		}
	};

	return (
		<>
			<div className="py-4">
				<div className="flex gap-4 max-w-[600px] overflow-hidden mb-4">
					<Avatar className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] bg-light_gray text-light_white">
						<AvatarImage src={user?.profileImageUrl} />
						<AvatarFallback>
							{user?.firstName.charAt(0).toUpperCase()}
							{user?.lastName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col justify-between">
						<h1 className="font-extrabold text-[1.1rem] xs:text-[1.25rem]">
							{user?.emailAddresses[0].emailAddress
								.split("@")[0]
								.replaceAll(".", "")}
						</h1>
						<h1 className="font-bold text-[1rem] xs:text-xl">{userName}</h1>
						<Button
							variant="secondary"
							size="lg"
							className="text-[.85rem] uppercase border-2 border-light_gray bg-light_gray text-white flex items-center
						hover:bg-transparent hover:border-black hover:text-black  dark:hover:border-light_white dark:hover:text-light_white"
							onClick={() => setViewEditProfile(true)}
						>
							<Edit className="w-5 h-5 mr-3" /> Edit profile
						</Button>
					</div>
					<div className="ml-auto flex flex-col md:flex-row gap-4">
						<Share2 className="cursor-pointer" />
						<MoreHorizontal className="cursor-pointer" />
					</div>
				</div>
				<div className="flex gap-4">
					<p className="text-[1rem] text-light_gray dark:text-light_white">
						<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
							{followingState?.following.length || 0}
						</span>{" "}
						Following
					</p>
					<p className="text-[1rem] text-light_gray dark:text-light_white">
						<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
							{followersState?.length || 0}
						</span>{" "}
						Followers
					</p>
					<p className="text-[1rem] text-light_gray dark:text-light_white">
						<span className="text-[1.1rem] font-extrabold text-black dark:text-white">
							{likes}
						</span>{" "}
						{likes > 1 ? "Likes" : "Like"}
					</p>
				</div>
				<p className="text-[1rem] mt-2 font-semibold">{userBio}</p>
			</div>
			{viewEditProfile && (
				<div className="fixed top-0 left-0 z-50 w-full min-h-screen overflow-scroll bg-[rgba(0,_0,_0,_0.4)] flex items-center justify-center px-4">
					<div className="bg-white text-black dark:bg-black dark:text-white w-full max-w-[700px] p-4 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] rounded-md">
						<div className="flex items-center justify-between pb-3 border-b border-border">
							<h1 className="text-xl font-semibold">Edit profile</h1>
							<X
								className="cursor-pointer"
								onClick={() => setViewEditProfile(false)}
							/>
						</div>
						<div className="flex gap-24 py-4 border-b border-border">
							<p>Name</p>
							<div className="flex-1">
								<input
									type="text"
									name="userName"
									className="w-full max-w-[400px] border border-light_white dark:border-light_gray bg-light_white text-black dark:bg-light_gray dark:text-white outline-none px-3 py-1 rounded-sm"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
								<p className="text-[.8rem] text-light_gray dark:text-light_white mt-2">
									Your nickname can only be changed once every 7 days.
								</p>
							</div>
						</div>
						<div className="flex gap-[118px] py-4 border-b border-border">
							<p>Bio</p>
							<div className="flex-1">
								<textarea
									rows={3}
									name="userBio"
									className="w-full max-w-[400px] border border-light_white dark:border-light_gray bg-light_white text-black dark:bg-light_gray dark:text-white outline-none px-3 py-1 rounded-sm resize-none"
									maxLength={80}
									value={userBio}
									onChange={(e) => setUserBio(e.target.value)}
								/>
								<p
									className={cn(
										"text-[.8rem] text-light_gray dark:text-light_white mt-2",
										userBio.length >= 80 ? "text-red-500" : ""
									)}
								>
									{userBio.length}/80
								</p>
							</div>
						</div>
						<div className="pt-4 flex justify-end gap-4">
							<Button
								className="text-white hover:text-black dark:hover:text-white"
								onClick={() => setViewEditProfile(false)}
							>
								Cancel
							</Button>
							<Button
								variant="outline"
								size="lg"
								onClick={handleUpdateUser}
								disabled={loading}
							>
								Save
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CurrentUserHeader;
