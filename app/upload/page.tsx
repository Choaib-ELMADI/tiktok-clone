import UploadComponent from "@/components/upload";
import { publishVideo } from "@/lib/actions";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function UploadPage() {
	return (
		<main className="pt-[60px] flex flex-col bg-white text-black">
			<Navbar />
			<UploadComponent publishVideo={publishVideo} />
			<Footer />
		</main>
	);
}
