"use client";
import useStore from "@/store/useStore";


const SearchBar: React.FC = () => {
    const searchQuery = useStore((state) => state.searchQuery);
    const setSearchQuery = useStore((state) => state.setSearchQuery);

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded-md flex-grow"
                value={searchQuery} // Directly using Zustand state
                onChange={(e) => setSearchQuery(e.target.value)} // Updating Zustand state
            />
            <button
                className="px-4 py-2 bg-gray-200 rounded-full flex items-center justify-center"
            >
                🔍
            </button>
        </div>
    );
};

export default SearchBar;
