"use client";
import useStore from "@/store/useStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from 'lucide-react';



const SearchBar: React.FC = () => {
    const searchQuery = useStore((state) => state.searchQuery);
    const setSearchQuery = useStore((state) => state.setSearchQuery);

    return (
        <div className="flex items-center gap-2">
            <Input
                type="text"
                placeholder="Search"
                value={searchQuery} // Directly using Zustand state
                onChange={(e) => setSearchQuery(e.target.value)} // Updating Zustand state
            />
            <Button
                variant="outline"
            >
                <Search />
            </Button>
        </div>
    );
};

export default SearchBar;
