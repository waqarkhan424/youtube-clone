interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded-md flex-grow"
                value={value}
                onChange={onChange}
            />
            <button
                onClick={onSearch}
                className="px-4 py-2 bg-gray-200 rounded-full flex items-center justify-center"
            >
                🔍
            </button>
        </div>
    );
};

export default SearchBar;
