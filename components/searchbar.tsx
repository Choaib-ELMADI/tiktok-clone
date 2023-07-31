"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
	const [query, setQuery] = useState("");

	return (
		<div className="group hidden overflow-hidden md:flex items-center bg-secondary w-full max-w-[510px] rounded-full border border-transparent hover:border-gray focus-within:border-gray transition">
			<input
				type="text"
				name="search"
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="bg-transparent px-4 py-[.6rem] border-0 outline-none w-full text-light_gray dark:text-white placeholder:text-[#86878d] caret-brand_1 tracking-tighter"
			/>
			<button
				className="px-4 h-[43px] group-hover:bg-gray_trs relative before:absolute before:content-[''] before:w-[1px] before:h-[24px] before:left-0 before:top-[50%] before:translate-y-[-50%] before:bg-gray"
				onClick={() => console.log(query)}
				disabled={query === ""}
			>
				<Search className="w-5 h-5 text-light_gray dark:text-[#86878d] dark:group-hover:text-white" />
			</button>
		</div>
	);
};

export default SearchBar;
